// 城市
var city_name_all = {}; // 用来保存所有城市数据
$(".city_input").focus(function(){
    $(".city_data .title").children().removeClass("active");
    $(".city_data .title li")[0].className="active";
    city_name_hot( city_name_all );
    $(this).parent().find(".city_data").show();
})
.blur(function(){
    setTimeout(function(){
        $(".city_input").parent().find(".city_data").hide();
        $(".city_data").find(".city_name").remove();
    },100);
})
function city_request(){    //封装请求城市数据
    $.ajax({
        method: "GET",
        // url: url+"v1/city/list",
        url: "php/city.js",
        dataType: "json",
        async: true,
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if(data.code == "success"){
            city_name_all = data.data; //保存所有城市数据到定义的容器中
            console.log( city_name_all );
            triangle_position( city_name_all.hot ); //控制中间部分热门城市导航栏和三角的位置
        }
    })
}
function city_name_hot(data){    //动态追加热门城市到页面上
    $(".city_data").find(".city_name").remove();
    var str_hot = '<ul class="city_name" data-id="hot">'
    for(i=0;i<data.hot.length;i++){
        str_hot +='<li>'+ data.hot[i].cityName +'</li>';
    }
    $(".city_data").append( str_hot );
}

var city_title = [
                {name:"热门",id:"hot"},
                {name:"ABCDEF",id:"abcdef"},
                {name:"GHJK",id:"ghjk"},
                {name:"LMNPQ",id:"lmnpq"},
                {name:"RSTW",id:"rstw"},
                {name:"XYZ",id:"xyz"},
            ];
function city_title_generate(){ //动态生成城市拼音
    var str = ""
    for(i=0;i<city_title.length;i++){
        str += '<li data-id="'+ city_title[i].id +'">'+ city_title[i].name +'</li>';
    }
    $(".city_data .title").append(str);
    $(".city_data .title li")[0].className="active";
    $(".city_data .title li").width( $(".city_data").width() / city_title.length );
}
function city_title_switch(){    //城市拼音动态切换和动态设置每个宽度
    $(".city_data .title").on('mouseover','li',function(){
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
        var city_data_switch = [];
        var city_str = '<ul class="city_name" data-id="'+ $(this).attr("data-id") +'">';
        if( $(this).attr("data-id") == "hot"){
            for(i=0;i<city_name_all.hot.length;i++){
                city_str += '<li>'+ city_name_all.hot[i].cityName +'</li>';
            }
        }else{
            for (let i in city_name_all.cityList) {  
                if( $(this).attr("data-id").indexOf( city_name_all.cityList[i][0].cityFirstLetter )>=0 ){
                   city_data_switch.push( city_name_all.cityList[i] );
                }
            }  
            for(var i=0;i<city_data_switch.length;i++){
                for(var a=0;a<city_data_switch[i].length;a++){
                    city_str += '<li>'+ city_data_switch[i][a].cityName +'</li>';
                }
            }
        }
        city_str +='</ul>';
        $(".city_data").find(".city_name").remove();
        $(".city_data").append( city_str );
    });
}
$(".city_data").on("click",".city_name li",function(){  //选中城市显示在城市input输入框
    $(".city_input").val( $(this).html() );
})



// 日期
/**
 * @param  {} year  年份
 * @param  {} month 月份  
 * @param  {} day_one   当前日历显示天数的第一个li
 */
function getWeek(year,month,day_one){  //判断月份第一天是周几
    //1.根据年度和月份，创建日期
    //应该先对year,month进行整数及范围校验的。
        var margin_left = 32;
        var d = new Date();
        d.setYear(year);
        d.setMonth(month-1);
        d.setDate(1);
        d.getDay(); //判断月份第一天是周几 周天 返回 0
        day_one.css("margin-left", margin_left  * d.getDay()+"px" );
}     
/**
 * @param  {} year  年
 * @param  {} month 月
 * @param  {} day   日
 */
var time_stamp = ""; //用来保存时间戳
function Conversion_timestamp(year,month,day){ //转换指定时间时间戳
    // 获取某个时间格式的时间戳
    var stringTime = year+"-"+month+"-"+day;
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    time_stamp = timestamp2;
}

/**
 * @param  {} year  传入指定年份
 * @param  {} month 传入指定月份
 */
var days;   //保存指定月份天数
function judge_day_number(year,month){  //判读传入年月下的这个月的天数
    if( month == 2){
        days = year % 4 == 0 ? 29 : 28;
    }else if( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        days = 31;
    }else{
        days = 30;
    }
}

/**
 * @param  {} year  传入左边日历年份
 * @param  {} month 传入左边日历月份
 */
function last_btn(year,month){    //判断上年上月按钮是否显示
    if( year <= new Date().getFullYear() ){
        $(".last_year").css("display","none");
    }else{
        $(".last_year").css("display","block");
    }
    if( month<= new Date().getMonth()+1 && year <= new Date().getFullYear()){
        $(".last_month").css("display","none");
    }else{
        $(".last_month").css("display","block");
    }
}
/**
 * @param  {} left_year         左侧日历年
 * @param  {} left_month        左侧日历月
 * @param  {} now_day           当前日
 */
function Add_a_calendar( left_year , left_month , now_day){    //网页打开页面上动态添加 左边日历 和 右边日历
    $(".now_month .day ul li").remove();
    $(".next_month .day ul li").remove();
    var day = now_day; //当前日
    last_btn(left_year , left_month );
    var left_day_str = ""; //左侧日历天数动态数据
    var right_day_str = ""; //右侧日历天数动态数据
    var now_year =  left_year; //左侧日历年
    var now_month =  left_month; //左侧日历月
    $(".now_month .header .years .year").html( now_year );
    $(".now_month .header .years .month").html( now_month );
    judge_day_number( now_year , now_month);
    for( i=1;i<days+1;i++ ){
        Conversion_timestamp( now_year , now_month , i);
        if( i<day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li class="disable">'+ i +'</li>';
        }else if( i == day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li data-time="'+ time_stamp +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-day="今天">今天</li>';
            continue;
        }else{
            left_day_str += '<li data-time="'+ time_stamp +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-day="'+ i +'">'+ i +'</li>';
        } 
    }
    $(".now_month .day ul").append( left_day_str );
    getWeek( now_year , now_month , $(".now_month .day li:first-child") );

    var next_year; //右侧日历年
    var next_month; //右侧日历月
    if( now_month == 12){
        next_year = now_year+1;
        next_month = 1;
    }else{
        next_year = now_year;
        next_month = now_month + 1;
    }
    $(".next_month .header .years .year").html( next_year );
    $(".next_month .header .years .month").html( next_month );
    judge_day_number( next_year , next_month);
    for( i=1;i<days+1;i++ ){
        Conversion_timestamp( next_year , next_month , i);
        right_day_str += '<li data-time="'+ time_stamp +'" data-id="'+ next_year +'年'+ next_month+'月'+ i +'日" data-day="'+ i +'">'+ i +'</li>';
    }
    $(".next_month .day ul").append( right_day_str );
    getWeek( next_year , next_month , $(".next_month .day li:first-child") );
    Choice_hotel_time();
}

//日历四个按钮事件
$(".next_month .next_month").click(function(){  //上月按钮
    var year = Number( $(".now_month .years .year").html() );
    var month = Number( $(".now_month .years .month").html() );
    if( month == 12){
        year = year + 1;
        month = 1;
        Add_a_calendar( year , month , new Date().getDate() );
    }else{
        month++;
        Add_a_calendar( year , month , new Date().getDate() );
    }
}) 
$(".now_month .last_month").click(function(){ //下月按钮
    var year = Number( $(".now_month .years .year").html() );
    var month = Number( $(".now_month .years .month").html() );
    if( month == 1){
        year = year - 1;
        month = 12;
        Add_a_calendar( year , month , new Date().getDate() );
    }else{
        month--;
        Add_a_calendar( year , month , new Date().getDate() );
    }
})
$(".next_month .next_year").click(function(){  //下年按钮
    var year = Number( $(".now_month .years .year").html() );
    var month = Number( $(".now_month .years .month").html() );
    year++;
    Add_a_calendar( year , month , new Date().getDate() );
}) 
$(".now_month .last_year").click(function(){  //上年按钮
    var year = Number( $(".now_month .years .year").html() );
    var month = Number( $(".now_month .years .month").html() );
    year--;
    if( year <= new Date().getFullYear() ){
        year = new Date().getFullYear();
        month = new Date().getMonth()+1;
        Add_a_calendar( year , month , new Date().getDate() );
    }else{
        Add_a_calendar( year , month , new Date().getDate() );
    } 
}) 
function Choice_hotel_time(){       //选取住店和离店日期
    var Check_i = "";  //用来保存入住的li下标
    var leave_i = "";  //用来保存离开的li下标
    var time_li = $(".now_month .day ul li");   //用来保存左侧days天数的li;
    var right_li = $(".next_month .day ul li"); //用来保存右侧days天数的li;
    for(i=0;i<right_li.length;i++){ 
        time_li.push(  right_li[i] );   //右侧days天数的li push 进总的数组
    }
    for(i=0;i<time_li.length;i++){
        $( time_li[i] ).attr("data-subscript", i );
        $( time_li[i] ).click(function(){
            if( $(this).attr("class") != "disable"){
                if( $(this).attr("data-subscript") == Check_i){
                    $(this).html( $(this).attr("data-day") );
                    $(this).removeClass("the_hotel");
                    $(this).addClass("start");
                    Check_i = "";
                }else{
                    $(this).removeClass("start");
                    $(this).addClass("the_hotel");
                    $(this).html("入住");
                }
                if( Check_i != ""){
                    if($(this).attr("data-subscript") <= Check_i ){
                        alert("选取离开时间不能在入住时间之前");
                        for(i=0;i<time_li.length;i++){
                            $(time_li[i]).html( $(time_li[i]).attr("data-day") );
                            $(time_li[i]).removeClass("the_hotel");
                            $(time_li[i]).removeClass("leave");
                            Check_i = ""; 
                        }
                    }else{
                        $(this).removeClass("the_hotel");
                        $(this).addClass("leave");
                        $(this).html("离开");
                    }
                }
                for(i=0;i<time_li.length;i++){
                    if( $(time_li[i]).attr("class") == "the_hotel" ){
                        Check_i = i;
                    }
                    if( $(time_li[i]).attr("class") == "leave" ){
                        leave_i = i;
                    } 
                }
                if( Check_i != "" && leave_i != ""){
                    setTimeout(function(){
                        $(".date_time").hide();
                        var now_month = $(".now_month .day li");
                        for(i=0;i<now_month.length;i++){
                            $(now_month[i]).html( $(now_month[i]).attr("data-day") );
                            $(now_month[i]).removeClass("the_hotel");
                            $(now_month[i]).removeClass("leave");
                        }
                        var next_month = $(".next_month .day li");
                        for(i=0;i<next_month.length;i++){
                            $(next_month[i]).html( $(next_month[i]).attr("data-day") );
                            $(next_month[i]).removeClass("the_hotel");
                            $(next_month[i]).removeClass("leave");
                        }
                    },300);
                    console.log( "入住时间："+$(time_li[Check_i]).attr("data-id")+"离开时间"+$(time_li[leave_i]).attr("data-id"));
                    var timer =  $(time_li[Check_i]).attr("data-id") + "-" + $(time_li[leave_i]).attr("data-id");
                    var timer_stamp = $(time_li[Check_i]).attr("data-time")+","+$(time_li[leave_i]).attr("data-time");
                    $(".time_input").val( timer );
                    $(".time_input").attr( "data-time",timer_stamp);
                    Check_i = "";
                    leave_i = "";
                }
            }
        })
    }
}
$(document).click(function(){
    $(".time").find(".date_time").hide();
    Check_i = "";
    leave_i = "";
    var now_month = $(".now_month .day li");
    for(i=0;i<now_month.length;i++){
        $(now_month[i]).html( $(now_month[i]).attr("data-day") );
        $(now_month[i]).removeClass("the_hotel");
        $(now_month[i]).removeClass("leave");
    }
    var next_month = $(".next_month .day li");
    for(i=0;i<next_month.length;i++){
        $(next_month[i]).html( $(next_month[i]).attr("data-day") );
        $(next_month[i]).removeClass("the_hotel");
        $(next_month[i]).removeClass("leave");
    }
});
$(".time").click(function(event){
    event.stopPropagation();
    $(".date_time").show();
});

$("#search_btn").click(function(){
    if( $(".city_input").val().length == 0){
        alert("请先选择城市");
        return;
    }
    var cityName = $(".city_input").val();
    var checkTime = $(".time_input").attr("data-time");
    var hotelKeyword = $(".hotelKeyword").val();
    $.ajax({
        method:"GET",
        url: url + "v1/hotel/list",
        dataType: "json",
        async: true,
        data:{
            cityName:cityName,
            limit: 5,
            page:1,
            checkTime:checkTime,
            hotelKeyword:hotelKeyword
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data);
    })
})
/**
 * @param  {} data 城市名称数组
 */
function triangle_position(data){       //控制中间部分热门城市导航栏和三角的位置
    var hot_str = "";
    for( i=0 ; i<data.length; i++){
        hot_str += '<li>'+ data[i].cityName +'<div class="triangle"></div></li>'
    }
    $(".hot_hotel .hot_hotel_title .name").append( hot_str );
    $(".hot_hotel .hot_hotel_title .name li .triangle").css("left","2px");
    var triangle_all = $(".hot_hotel .hot_hotel_title .name li .triangle");
    for( i=0;i<triangle_all.length;i++){
        var left = ( $( triangle_all[i] ).parent().width() - 14 ) / 2;
        $( triangle_all[i] ).css("left",left);
    }
    $(".hot_hotel .hot_hotel_title .name li")[0].className = "active";
    var city_name_all = $(".hot_hotel .hot_hotel_title .name li");
    city_name_all = $( city_name_all[0] ).html().split("<");
    city_name_all = city_name_all[0];
    hot_city_data_request( city_name_all );
}
/**
 * @param  {} data 城市名称
 */
function hot_city_data_request( data ){    //请求热门城市数据并追加到页面上
    $.ajax({
        method: "GET",
        url:url+"v1/hotel/list",
        dataType: "json",
        async: true,
        data:{
            cityName:data,
            limit: 8,
            page:1,
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data);
        if(data.code == "success"){
            var city_data = data.data.hotelList;
            var str = "";
            for( i=0;i<city_data.length;i++ ){
                var style = ""
                if( city_data[i].price < 300){
                    style = "高档型"
                }else if( city_data[i].price>=300 ){
                    style = "豪华型"
                } 
                str += `
                    <li>
                        <a href="hotel_details.html?`+ city_data[i]._id +`">
                            <img src="php/images/jiudian.png" alt="">
                            <div class="mask">
                                <div class="name">
                                    <span class="hotel_name">`+ city_data[i].name +`</span>
                                    <span class="style">`+ style +`</span>
                                </div>
                                <div class="price">
                                    ¥`+ city_data[i].price +`
                                </div>
                            </div>
                        </a>
                    </li>
                `
            }
            $(".hot_hotel .hot_hotel_main .error").remove();
            $(".hot_hotel .hot_hotel_main ul li").remove();
            $(".hot_hotel .hot_hotel_main ul").append(str);
            return;
        }
        if(data.code == "hotel_not_found"){
            $(".hot_hotel .hot_hotel_main .error").remove();
            $(".hot_hotel .hot_hotel_main ul li").remove();
            $(".hot_hotel .hot_hotel_main").append('<div class="error">酒店数据不存在</div>');
        }
    })
}
$(".hot_hotel .hot_hotel_title .name").on('click','li',function(){ //中间热门城市控制数据切换和三角位置切换
    $(".hot_hotel .hot_hotel_title .name li").removeClass("active");
    $(this).addClass("active");
    var city_name = $(this).html();
    city_name = city_name.split("<");
    city_name = city_name[0];
    hot_city_data_request( city_name );
})
$(document).ready(function(){
    city_title_generate(); //动态生成城市拼音
    city_title_switch(); //城市拼音动态切换和动态设置每个宽度
    city_request(); //请求城市数据
    Add_a_calendar( new Date().getFullYear() , new Date().getMonth()+1 , new Date().getDate()); //页面打开加载左右日历
})









