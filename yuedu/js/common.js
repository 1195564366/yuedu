var url="https://dev.apis.sh/93cO0IMf@/"; //定义所有调用接口url
var url_file="https://dev.apis.sh/93cO0IMf@/static/"//获取接口上传服务器上的文件url
//定义个人设置封装函数
function city(type,url,cb){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.status==200&&xhr.readyState==4){
            var data=JSON.parse(xhr.responseText);
            cb(data);
        }
    }
    xhr.open(type,url);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}
function city1(type,url,cb){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.status==200&&xhr.readyState==4){
            var data=JSON.parse(xhr.responseText);
            cb(data);
        }
    }
    xhr.open(type,url);
    xhr.withCredentials=true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}
// //封装账户信息提交数据请求
function smb(type,url,cb,abc){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.status==200 && xhr.readyState==4){
            var data=JSON.parse(xhr.responseText);
                cb(data);
        }
    }
    xhr.open(type,url,true);
    xhr.withCredentials=true;
    xhr.send(abc);
}

function ajax(type,url,cb,abc){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.status==200&&xhr.readyState==4){
            var data = JSON.parse(xhr.responseText); // 将JSON字符串转化为JSON对象
            cb(data);
        }
    }
    xhr.open(type,url);
    xhr.withCredentials=true;
    // xhr.responseText="json";
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(abc);
}


// 封装顶部个人信息方法
function my_data(){
    if(localStorage.token != ""){
        document.querySelector(".land").style.display="none";
        document.querySelector(".register").style.display="none";
        document.querySelector(".user-images").style.display="inline-block";
        document.querySelector(".name").style.display="inline-block";
        document.querySelector(".drop-down").style.display="inline-block";
        document.querySelector(".write").style.top=0;
        document.querySelector(".record").style.top="3px";
        document.querySelector(".name").innerHTML=localStorage.name;
        document.querySelector(".user-images").src=url_file+localStorage.userimg;
    }else{
        document.querySelector(".drop-down").style.display="none";
    } 
}

// 页面加载执行 加载头部尾部
function header(){
    console.log("顶部信息加载正常");
    var str=`
    <header>
        <a href="list_article.html">
            <span>APIS</span>
            <span></span>
            <span>悦读项目</span>
        </a>
        <div class="personal" style="display: inline-block;float:right;">
            <img src="images/list/userimg.png" alt="" class="user-images" style="display:none">
            <span class="name" style="display:none">`+ localStorage.name +`</span>
            <div class="drop-down" style="display:inline-block;position: relative;">
                <img src="images/list/iconarrow_up.png" alt="" >
                <ul class="eject">
                    <li>
                        <a href="my.html?`+ localStorage._id +`?`
                                        + localStorage.name +`?`
                                        + localStorage.gender +`?`
                                        + localStorage.constellations +`?`
                                        + localStorage.city +`?`
                                        + localStorage.userimg +`">
                            <img src="images/list/icon_user.png" alt="">
                            <span>个人中心</span>
                        </a>
                    </li>
                    <li>
                        <a href="account_setting.html">
                            <img src="images/list/icon_setting.png" alt="">
                            <span>账户设置</span>
                        </a>
                    </li>
                    <li>
                        <a href="register.html">
                            <img src="images/list/icon_exit.png" alt="">
                            <span>退出登陆</span>
                        </a>
                    </li>
                    <div class="triangle"></div>
                </ul>
            </div>

            <span class="land"><a href="register.html">登陆</a></span>
            <span class="register"><a href="register.html">注册</a></span>
            <img src="images/list/icon_write.png" alt="" class="record" style="top:20px;">
            <a href="write_an_article_none.html">
                <span class="write">写文章</span>
            </a>
        </div>
        
    </header>
    `
    document.querySelector("body").insertAdjacentHTML('afterbegin',str);
}


function tfm_city(){        //城市id数组转化为城市名
    var city1 = localStorage.city1;
    city1 = city1.split(",");
    var ProID = parseInt(city1[0]);
    var CityID = parseInt(city1[1]);
    var Id = parseInt(city1[2]);
    var url1 = url+"city/province?ProID="+ProID;
    var url2 = url+"city/city?CityID="+CityID;
    var url3 = url+"city/area?Id="+Id;
    city("GET",url1,function(data){
        console.log(data);
        localStorage.city = data.data.province;
    });
    city("GET",url2,function(data){
        console.log(data);
        localStorage.city += data.data.city;
    });
    city("GET",url3,function(data){
        console.log(data);
        localStorage.city += data.data.area;
    });
}



function creat(page,user){  //封装 
    var url1 = "";
    if(user == undefined){
        url1 = url+"posts/list?page="+ page +"&limit="+5;
    }else{
        url1 = url +"posts/list?page="+ page +"&limit="+ 5 +"&user="+ user;
    }
    city1("GET",url1,function(data){
        if(user != undefined){
            document.querySelector(".article .title>span").innerHTML = data.count;
        }
        console.log(data)
        if(data.code != "SUCCESS" || data.data.articles.length==0){
            document.querySelector(".loading").innerHTML = "没有更多文章了"
            return false;
        }
        var articles = data.data.articles;
        for(i=0;i<articles.length;i++){
            // var a=articles[i].abstract;
            // var b=articles[i].cover;
            // var c=articles[i].create_time;
            // var d=articles[i].look_sum;
            // var e=articles[i].praise_sum;
            // var f=articles[i].title;
            // var g=articles[i]._id;
            // var h=articles[i].author.avatar;
            // var o=articles[i].author.city;
            // var j=articles[i].author.constellations;
            // var k=articles[i].author.gender;
            // var l=articles[i].author.name;
            // var m=articles[i].author._id;
            // var n=articles[i].author;
            // var p=""
            // if(a === undefined || b === undefined || c === undefined || d === undefined || e === undefined || f === undefined || g === undefined || h === undefined || o === undefined || j === undefined || k === undefined || l === undefined || m === undefined || n === undefined ){
            //     console.log(i);
            //     p=i;     
            // }
            // if(i == p){
            //     continue;
            // }
            if(articles[i].praise_sum == undefined){
                articles[i].praise_sum = 0;
            }
            
            var str=`
                <div class="main">
                    <div class="img">
                        <a href="details.html?`+ articles[i]._id +`"> 
                            <img class="cover" alt="" src="images/default.jpg" data-src="`+ url_file + articles[i].cover +`">
                        </a>
                    </div>
                    <div class="container">
                        <a href="details.html?`+ articles[i]._id +`">
                            <p class="title">`+ articles[i].title +`</p>
                        </a>
                        <p class="container-text">
                           `+ articles[i].abstract +`
                        </p>
                        <p class="time-user">
                            <a href="my.html?`
                                + articles[i].author._id + `?` 
                                + articles[i].author.name +`?`
                                + articles[i].author.gender + `?`
                                + articles[i].author.constellations + `?`
                                + articles[i].author.city + `?`
                                + articles[i].author.avatar +`
                                ">
                                <img src="`+ url_file+articles[i].author.avatar +`" alt="" class="userimages"> 
                                <span class="username">`+ articles[i].author.name +`</span>
                            </a> 
                            <span class="usertime">`
                            + moment(articles[i].create_time).format('YYYY-MM-DD HH:mm:ss') +`</span> 
                            <span class="support">
                                <img src="images/list/icon_thumb_up_like.png" alt="" width="15px"height="16px">
                                <span>`+ articles[i].praise_sum +`</span>
                                <img src="images/list/icon_saw.png" alt="" width="18px"height="11px">
                                <span>`+ articles[i].look_sum +`</span>
                            </span>   
                        </p>
                    </div>
                </div>    
                `
                document.getElementById("main").insertAdjacentHTML('beforeend',str);
                img_load();
            }           
        })
}


function lazyLoad(){ //滑动懒加载事件
    var page = 2;
    return function(){
        var loading = document.querySelector(".loading");
        if(loading.getBoundingClientRect().top + loading.offsetHeight < document.body.clientHeight){
            creat(page++);
        }
    }
}

//预加载图片
function preLoad_images(img){
    var temp_img = new Image();
    //预加载图片
    temp_img.src = img.dataset.src;
    //图片加载成功后，替换临时图片
    temp_img.onload = function(){
        img.src = img.dataset.src;
    }
    //加载失败
    temp_img.onerror = function(){
        img.src = 'images/default.jpg';
    }
}
/**
 * 验证图片是否需要懒加载
 */
function img_load(){
    // 图片懒加载
    var imgs = document.getElementsByClassName('cover');
    for (var i=0; i<imgs.length; i++){
        // 图片距离顶部的高度
        var imgHeight = imgs[i].offsetTop;
        if(imgHeight < document.body.clientHeight + document.body.scrollTop){
            //图片预加载
            preLoad_images(imgs[i]);
            imgs[i].className = imgs[i].className.replace('cover','');    
        }
    }
}





function scl(){ //封装返回顶部
    var btn = document.getElementById('scl');
    var timer = null;
    var isTop = true;//flase
    //获取页面可视区高度
    var clientHeight = document.documentElement.clientHeight;
     
    //滚动条滚动时触发
    window.onscroll = function() {
        //显示回到顶部按钮
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop >= clientHeight) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        };
        //回到顶部过程中用户滚动滚动条，停止定时器
        if (!isTop) {
            clearInterval(timer);
        };
        isTop = false;
   
    };
   
    btn.onclick = function() {
      //设置定时器
      timer = setInterval(function(){
        //获取滚动条距离顶部高度
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
       
        var ispeed = Math.floor(-osTop / 10);
         
        document.documentElement.scrollTop = document.body.scrollTop = osTop+ispeed;
        //到达顶部，清除定时器
        if (osTop == 0) {
          clearInterval(timer);
        };
        isTop = true;
         
      },30);
    };
};