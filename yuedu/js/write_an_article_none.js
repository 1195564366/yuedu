var write_img="";
var fileInput = document.getElementById('img_bg');
var previewImg = document.getElementById('write_article_images_none');
fileInput.addEventListener('change', function () {
var file = this.files[0];
var img=["image/jpg","image/png","image/jpeg"];
if(img.indexOf(file.type)==-1){
    console.log(file.type);
    alert("此图片格式不支持");
    return false;
}
// 获取文件读取对象
var reader = new FileReader();
// 文件读取完后的展示图片
reader.addEventListener('load', function () { //addEventListener事件监听 
previewImg.style.background = "url("+reader.result+")";
document.querySelector(".upload").style.display="none";
document.querySelector(".fengmian").style.display="none";
document.querySelector(".write_article_images_none .upload2").style.display="block";
}, false);
reader.readAsDataURL(file);
write_img=file;
}, false);


var fileInput = document.getElementById('img_bg1');
var previewImg = document.getElementById('write_article_images_none');
fileInput.addEventListener('change', function () {
var file = this.files[0];
var img=["image/jpg","image/png","image/jpeg"];
if(img.indexOf(file.type)==-1){
    console.log(file.type);
    alert("此图片格式不支持");
    return false;
}
// 获取文件读取对象
var reader = new FileReader();
// 文件读取完后的展示图片
reader.addEventListener('load', function () { //addEventListener事件监听 
previewImg.style.background = "url("+reader.result+")";
document.querySelector(".upload").style.display="none";
document.querySelector(".fengmian").style.display="none";
}, false);
reader.readAsDataURL(file);
write_img=file;
}, false);

window.onload=function(){
    header();
    my_data(); 
}
function fb(){
    var title=document.querySelector(".input_information input").value;
    var container=document.querySelector(".input_information textarea").value;
    if(localStorage.token==""){alert("你还没有登陆,请先登录");return false;}
    if(write_img==""){alert("你还未选择文章封面");return false;}
    if(title==""){alert("你还未输入文章标题");return false;}
    if(container==""){alert("你还未输入文章内容");return false;}
    else{
        var data=new FormData;
        data.append("token",localStorage.token);
        data.append("title",title);
        data.append("pic",write_img);
        data.append("body",container);
        var url1=url+"posts/add";
        smb("POST",url1,function(data){
            console.log(data)
            if(data.code=="SUCCESS"){alert("发表成功");return false;}
            if(data.code=="param_incomplete"){alert("你还有未输入内容");return false;}
            if(data.code=="article_has_exist"){alert("文章标题已存在");return false;}
            if(data.code=="account_token_invalid"){alert("身份已失效,请重新登陆");return false;}
        },data);
    }
}


