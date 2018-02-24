var datas = window.location.href;
datas = datas.split("?");
var user = datas[datas.length-6];
var name = decodeURI(datas[datas.length-5]);
var gender = decodeURI(datas[datas.length-4]);
var constellations = decodeURI(datas[datas.length-3]);
var city = decodeURI(datas[datas.length-2]);
var user_img = datas[datas.length-1];
var avatar = "";

function str(){ //本地保存信息赋值
    if(gender == "woman"){
        avatar = "images/my/icon_girl.png";
    }else if(gender == "man"){
        avatar = "images/my/icon_boy.png";
    }
    var str =`
    <div class="user_img">
        <img src="`+ url_file+user_img +`" alt="">
        <img src="`+ avatar +`" alt="">
    </div>
    <div class="information">
        <p>`+ name +`</p>
        <p>
            <span>`+ city +`</span>
            &nbsp;&nbsp;&nbsp;
            <span>`+ constellations +`</span>
        </p>
    </div>
    `;
    document.querySelector(".bgimg").insertAdjacentHTML('afterbegin',str);
}



window.onload = function(){
    header();///页面加载顶部信息
    my_data(); ///顶部信息登陆判断
    str();////本地保存信息赋值
    creat(1,user);
    window.addEventListener('scroll',img_load);
}