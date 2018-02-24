var yzm="";
document.getElementById("get_code").onclick=function(){ //短信验证码按钮发送请求事件
    var pn=document.getElementById("phone_number").value;//取到手机号码
    if(pn==""){
        alert("请输入手机号码！！！");
        return false;
    }else if(!(/^1[34578]\d{9}$/.test(pn))){
        alert("手机号码有误，请重填"); 
        return false;
    }else{
        var url1=url+"captcha?type=reset&phone="+pn;
        ajax("GET",url1,function(data){
            yzm=data.captcha;
            if(data.code=="SUCCESS"){alert("验证码为"+data.captcha);console.log("验证码为"+data.captcha);return;}
            if(data.code=="param_incomplete"){alert("请输入用户名或者密码");return;}
            if(data.code=="account_has_registered"){alert("此手机号码已被注册");return;}
            if(data.code=="phone_format_error"){alert("手机号码格式不对");return;}
        })
    }
}
document.getElementById("confirm").onclick=function(){ //注册按钮绑定验证发送请求事件
    var pn=document.getElementById("phone_number").value;//取到手机号码
    var vc=document.getElementById("verification_code").value;//取到短信验证码
    var pwd1=document.getElementById("user_pwd1").value;//取到第一次输入密码
    var pwd2=document.getElementById("user_pwd2").value;//取到第二次输入密码
    // alert(yzm)
    if(pn==""){
        alert("请先输入手机号码");
        return false;
    }
    if(vc==""){
        alert("请输入短信验证码");
        return false;
    }
    if(vc!=yzm){
        alert("验证码错误");
        return false;
    }
    if(pwd1==""){
        alert("密码不能为空");
        return false;
    }
    if(pwd1!=pwd2){
        alert("两次密码输入不一致");
        return false;
    }else{
        var token=localStorage.token;
        var abc="password="+pwd1+"&token="+token+"&captcha="+yzm+"&phone="+pn;
        var url2=url+"account/reset";
        ajax('POST',url2,function(data){
            console.log(data);
            window.location.href="register.html";
        },abc); 
    }
}


