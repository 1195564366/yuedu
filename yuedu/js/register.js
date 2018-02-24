// 登录注册切换
function denglu(){
    document.querySelector(".center-line-register li:first-child").className="fc";
    document.querySelector(".center-line-register li:last-child").className="";
    document.querySelector(".line").style.marginLeft="185px";
    document.querySelector(".register1").style.display="none";
    document.querySelector(".register2").style.display="block";
};
function zhuce(){
    document.querySelector(".center-line-register li:first-child").className="";
    document.querySelector(".center-line-register li:last-child").className="fc";
    document.querySelector(".line").style.marginLeft="296px";
    document.querySelector(".register2").style.display="none";
    document.querySelector(".register1").style.display="block";
};

var yzm=""
document.getElementById("get_code").onclick=function(){ //短信验证码按钮发送请求事件
    var pn=document.getElementById("phone_number").value;//取到手机号码
    if(pn==""){
        alert("请输入手机号码！！！");
        return false;
    }else if(!(/^1[34578]\d{9}$/.test(pn))){
        alert("手机号码有误，请重填"); 
        return false;
    }else{
        var url1=url+"captcha?type=register&phone="+pn;
        ajax("GET",url1,function(data){
            yzm=data.captcha;
            if(data.code=="SUCCESS"){alert("验证码为"+data.captcha);return;}
            if(data.code=="param_incomplete"){alert("请输入用户名或者密码");return;}
            if(data.code=="account_has_registered"){alert("此手机号码已被注册");return;}
            if(data.code=="phone_format_error"){alert("手机号码格式不对");return;}
        })
    }
}

document.getElementById("register1").onclick=function(){ //注册按钮绑定验证发送请求事件
    var pn=document.getElementById("phone_number").value;//取到手机号码
    var vc=document.getElementById("verification_code").value;//取到短信验证码
    var pwd1=document.getElementById("user_pwd1").value;//取到第一次输入密码
    var pwd2=document.getElementById("user_pwd2").value;//取到第二次输入密码
    // alert(yzm)
    if(pn==""){alert("请先输入手机号码");return false;}
    if(vc==""){alert("请输入短信验证码");return false;}
    if(vc!=yzm){alert("验证码错误");return false;}
    if(pwd1==""){alert("密码不能为空");return false;}
    if(pwd1!=pwd2){alert("两次密码输入不一致");return false;
        }else{
            var abc="account="+pn+"&password="+pwd1+"&captcha="+vc;
            var url2=url+"account/register";
            ajax('POST',url2,function(data){
                if(data.code=="SUCCESS"){alert("注册成功,点击跳转登陆页面");
                    document.querySelector(".register1").style.display="block";
                    document.querySelector(".register2").style.display="none";
                ;}
                if(data.code=="param_incomplete"){alert("输入信息不完整,请仔细查看");return;}
                if(data.code=="phone_format_error"){alert("手机号码格式错误");return;}
                if(data.code=="account_has_registered"){alert("此手机号码已被注册");return;}
                if(data.code=="sms_captcha_fail"){alert("短信验证码错误");return;}
                if(data.code=="sms_captcha_overdue"){alert("短信验证码已过期,请重新获取");return;}
            },abc);
    }
}
// 登陆

document.getElementById("register2").onclick=function(){
    var pn=document.getElementById("denglu_phone_number").value;
    var pwd=document.getElementById("denglu_user_pwd").value;
    if(pn==""){
        alert("手机号不能为空");
        return false;
    }
    if(!(/^1[34578]\d{9}$/.test(pn))){
        alert("手机号码格式不正确");
        return false;
    }
    if(pwd==""){
        alert("密码为空,请输入密码");
        return false;
    }else{
        var url3=url+"account/login";
        var abc="account="+pn+"&password="+pwd;
        ajax("POST",url3,function(data){
            if(data.code=="SUCCESS"){
                console.log(data);
                localStorage.token = data.data.user.token;  //token
                localStorage.account = data.data.user.account; //账户
                localStorage.name = data.data.user.name;    //名称
                localStorage.gender = data.data.user.gender;    //性别
                localStorage.userimg=data.data.user.avatar; //头像
                localStorage.city1=data.data.user.city; //城市
                localStorage.background=data.data.user.background;  //
                localStorage.pwd=pwd;   
                localStorage._id=data.data.user._id;
                console.log(data.data.user.avatar)
                localStorage.constellations=data.data.user.constellations;
                console.log(data.data.user.constellations);
                tfm_city();
                alert("登陆成功,即将进入网站");
                window.location.href="list_article.html";
            }else{
                alert("账号或密码错误");
            }
        },abc);
    }
}





