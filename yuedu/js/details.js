//动态创建文章详情内容
function details(details_d){
    if(details_d.praise_sum == undefined){
        details_d.praise_sum = 0;
    }
var str=`<p class="main-details-title"> 
            <span>`+ details_d.title +`</span> 
            <img src="images/detile/icon_share.png" alt=""> 
            <span> 分享 </span> 
        </p> 
        <p class="time-user"> 
            <img src="`+ url_file+details_d.author.avatar +`" alt="" class="userimages"> 
            <span class="username">`+ details_d.author.name +`</span> 
            <span class="usertime">`+ moment(details_d.create_time).format('YYYY-MM-DD HH:mm:ss') +`</span> 
            <img src="images/list/icon_thumb_up_like.png" alt="" width="15px"height="16px" class="support-img">
            <span>`+ details_d.praise_sum +`</span>
            <img src="images/list/icon_saw.png" alt="" width="18px"height="11px" class="support-img">
            <span>`+ details_d.look_sum +`</span>
        </p> 
        <div class="detailes-img"> 
            <img src="`+ url_file + details_d.pic +`" alt=""> 
        </div> 
        <div class="detailes-container">`+ details_d.body +`</div>`;
    document.querySelector(".main-1").insertAdjacentHTML('afterbegin',str);
}
// function details(details_d){
//     var str='<p class="main-details-title"> <span>'+ details_d.title +'</span> <img src="images/detile/icon_share.png" alt=""> <span> 分享 </span> </p> <p class="time-user"> <img src="'+ url_file+details_d.author.avatar +'" alt="" class="userimages"> <span class="username">'+ details_d.author.name +'</span> <span class="usertime">'+ details_d.create_time +'</span> <img src="images/list/icon_thumb_up_like.png" alt="" width="15px"height="16px" class="support-img"><span>'+ details_d.praise_sum +'</span><img src="images/list/icon_saw.png" alt="" width="18px"height="11px" class="support-img"><span>'+ details_d.look_sum +'</span></p> <div class="detailes-img"> <img src="'+ url_file+details_d.pic +'" alt=""> </div> <div class="detailes-container">'+ details_d.body +'</div>';
//     document.querySelector(".main-1").insertAdjacentHTML('afterbegin',str);
// }
//动态加载评论
function comment(abc){
    var str=`<div> 
                <hr> 
                <p class="time-user"> 
                    <img src="`+ url_file+abc[i].author.avatar +`" alt="" class="userimages"> 
                    <span class="username">`+ abc[i].author.name +`</span>  
                    <span class="usertime">`+ moment(abc[i].create_time).format('YYYY-MM-DD HH:mm:ss') +`</span> 
                    <img src="images/list/icon_thumb_up_like.png" alt="" width="15px"height="16px" class="support-img">
                    <span>`+ abc[i].praise_sum +`</span> 
                </p> 
                <p class="review-content">`+ abc[i].body +`</p> </div>`;
    document.querySelector(".recent-comments").insertAdjacentHTML('beforeend',str);
}
// function comment(abc){
//     var str='<div> <hr> <p class="time-user"> <img src="'+ url_file+abc[i].author.avatar +'" alt="" class="userimages"> <span class="username">'+ abc[i].author.name +'</span>  <span class="usertime">'+ abc[i].create_time +'</span> <img src="images/list/icon_thumb_up_like.png" alt="" width="15px"height="16px" class="support-img"><span>'+ abc[i].praise_sum +'</span> </p> <p class="review-content">'+ abc[i].body +'</p> </div>';
//     document.querySelector(".recent-comments").insertAdjacentHTML('beforeend',str);
// }


var page = 1;//定义评论页数
var limit = 5;//定义评论每页显示数量

window.onload = function(){
    header();
    my_data(); 
    //文章详情内容
    var id = window.location.href;
    id = id.split("?")[1];	
    var url1 = url + "posts/details?id=" + id;
    // var url1 = "php/details.js";
    city("GET",url1,function(data){
        console.log(data);
        var details_d=data.data.article;
        if(data.code=="SUCCESS"){
            details(details_d);
        }
    })
    //文章详情评论
    var article = localStorage.title_id; 
    var url1 = url + "comment/list?page=" + page + "&limit=" + limit + "&article=" + article;
    // var url1 = "php/commen.js";
    city("GET",url1,function(data){
        console.log(data);
        var abc=data.data.comments;
        if(data.code=="SUCCESS"){
            // comment(comment_a);
            for(i=0;i<abc.length;i++){
                comment(abc);
            }
        }
    })
}

function Publish(){ //发表评论
    var token = localStorage.token;
    console.log(token);
    var article = localStorage.title_id;
    console.log(article);
    var url1 = url + "comment/add";
    var body = document.querySelector(".comment-container").value;
    console.log(body);
    // var data = new FormData();
    // data.append("token",token);
    // data.append("body",body);
    // data.append("article",article);
    var data = "token=" + token + "&body=" + body + "&article=" + article;
    ajax("POST",url1,function(data){
        console.log(data);
    },data)
}
