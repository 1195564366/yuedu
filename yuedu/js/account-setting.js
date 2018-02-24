


// 方法二
var user_img = "";
var user_sex="";
var city2="";
var city3="";
var city4="";
var user_constellation="";

// //获取性别
document.querySelectorAll(".gender input")[0].onclick=function(){
    if(this.checked==true){
        user_sex=this.value;
    }
};
document.querySelectorAll(".gender input")[1].onclick=function(){
    if(this.checked==true){
        user_sex=this.value;
    }
};
document.querySelector(".constellation select").onchange = function(){
    user_constellation = this.selectedOptions[0].dataset.name;
    console.log(user_constellation);
}
// var kaiguan = 1;
// document.getElementById("province").onclick = function(){
//     if(kaiguan == 1){
//         city("GET",url+"city/province",function(data){
//             var str ="<option>——请选择——</option>";
//             var data_province = data.data.province;
//             for(i=0;i<data_province.length;i++){
//                 str +='<option data-id="'+ data_province[i].ProID +'">——'+ data_province[i].name +'——</option>';
//             }
//             console.log(str);
//             document.getElementById("province").options.length = 0;
//             document.getElementById("province").insertAdjacentHTML('afterbegin', str);
//             var a = document.querySelectorAll(".city .choice");
//             document.querySelector(".city").removeChild(a[1]);
//             document.querySelector(".city").removeChild(a[2]);
//             kaiguan = 0;
//         })
//     }
// }
document.getElementById("province").onchange = function(){
    var a = document.querySelectorAll(".city .choice");
    if(document.getElementById("city") != null){
        this.parentNode.parentNode.removeChild(a[1]);
    }
    if(document.getElementById("area") != null){
        this.parentNode.parentNode.removeChild(a[2]);
    }
    console.log(this.selectedOptions[0].dataset.id);
    var ProID = this.selectedOptions[0].dataset.id;
    city2 = this.selectedOptions[0].dataset.id;
    city1("GET",url+"city/city?ProID="+ProID,function(data){
        console.log(data);
        var data_city = data.data.city;
        console.log(data_city);
        var str =`
                <div class="choice">
                    <select id="city">
                        <option>——请选择——</option>
        `;
        for(i=0;i<data_city.length;i++){
            str += `
                    <option data-id="`+ data_city[i].CityID +`">——`+ data_city[i].name +`——</option>
            `
        }
        str +=`
            </select>
            <span>
                <img src="images/account_setting/icon_arrow_down.png" alt="">
            </span>
        </div>
        `
        document.querySelector(".city").insertAdjacentHTML('beforeend', str);
        document.getElementById("city").onchange = function(){
            var a = document.querySelectorAll(".city .choice");
            if(document.getElementById("area") != null){
                this.parentNode.parentNode.removeChild(a[2]);
            }
            var CityID = this.selectedOptions[0].dataset.id;
            city3 = this.selectedOptions[0].dataset.id;
            city1("GET",url+"city/area?CityID="+CityID,function(data){
                console.log(data);
                var data_area = data.data.area;
                var str = `
                <div class="choice">
                    <select id="area">
                        <option>——请选择——</option>
                `
                for(i=0;i<data_area.length;i++){
                    str += `
                    <option data-id="`+ data_area[i].Id +`">——`+ data_area[i].DisName +`——</option>
                    `
                }
                str +=`
                    </select>
                    <span>
                        <img src="images/account_setting/icon_arrow_down.png" alt="">
                    </span>
                </div>
                `
                document.querySelector(".city").insertAdjacentHTML('beforeend', str);
                document.getElementById("area").onchange = function(){
                    city4 = this.selectedOptions[0].dataset.id;
                }
            })
        }
    })
}

var fileInput = document.getElementById('img_bg');
var previewImg = document.querySelector('.head_portrait_upload');
fileInput.addEventListener('change', function () {
    var file = this.files[0];
    
    // 获取文件读取对象
    var reader = new FileReader();
    // 文件读取完后的展示图片
    reader.addEventListener('load',function(){ //addEventListener事件监听 
        if(file.size>3*1024*1024){
            alert("图片太大")
        }else{
            previewImg.style.background = "url("+reader.result+")";
        }
    }, false);
    user_img=file;
    reader.readAsDataURL(file);
}, false);



//判断用户是否登陆状态,如果登陆则显示信息
function Save(){
    if(localStorage.token != ""){   //如果用户token不为空则执行显示信息
        document.querySelector(".head_portrait_upload").style.backgroundImage = "url("+ url_file+localStorage.userimg +")";
        document.querySelector(".nickname input").value = localStorage.name;
        if(localStorage.gender == "man"){
            document.querySelectorAll(".gender input")[0].checked = true;
        }else if(localStorage.gender == "woman"){
            document.querySelectorAll(".gender input")[1].checked = true;
        }
        document.querySelector(".nickname input").value=localStorage.name;
        var city = localStorage.city1;
        city = city.split(",");
        var ProID = city[0];    //省id
        var CityID = city[1];   //市id
        var Id = city[2];   //区县id
        var city_province = "";
        var city_city ="";
        city1("GET",url + "city/province?ProID="+ProID,function(data){
            city_province = data.data.province;
        })
        city1("GET",url + "city/province",function(data){
            if (data.code !== 'SUCCESS') {
                document.getElementById("province").insertAdjacentHTML('afterbegin', '<option>无法加载信息<option>');
                return;
            }
            var data_province = data.data.province;
            var str = `<option data-id="`+ ProID +`">——`+ city_province +`——</option >`;
            for(i=0;i<data_province.length;i++){
                if(data_province[i].name == city_province){
                    console.log(data_province[i].name)
                    data_province.splice(i, 1);
                    for(i=0;i<data_province.length;i++){
                        str += `<option data-id="`+ data_province[i].ProID +`">——`+ data_province[i].name +`——</option >`;
                    }
                }
            }
            console.log(str);
            document.getElementById("province").insertAdjacentHTML('afterbegin', str);
            console.log(data);
        })
        city1("GET",url + "city/city?CityID=" + CityID,function(data){
            var str = `
            <div class="choice">
                <select id="city">
                <option>——`+ data.data.city +`——</option>
                </select>
                <span>
                    <img src="images/account_setting/icon_arrow_down.png" alt="">
                </span>
            </div>
            `
            document.querySelector(".city").insertAdjacentHTML('beforeend', str);
        })
        city1("GET",url + "city/area?Id=" + Id,function(data){
            var str = `
            <div class="choice">
                <select id="area">
                <option>——`+ data.data.area +`——</option>
                </select>
                <span>
                    <img src="images/account_setting/icon_arrow_down.png" alt="">
                </span>
            </div>
            `
            document.querySelector(".city").insertAdjacentHTML('beforeend', str);
        })
        //星座
        if(localStorage.constellations != "undefined"){
            console.log(123)
            city1("GET",url+"constellations/query",function(data){
                if (data.code !== 'SUCCESS') {
                    document.querySelector(".constellation select").insertAdjacentHTML('afterbegin', '<option>无法加载信息<option>');
                    return;
                }
                var str = `<option>——`+ localStorage.constellations +`——</option >`
                for(i=0;i<data.data.constellations.length;i++){
                    if(data.data.constellations[i] == localStorage.constellations){
                        data.data.constellations.splice(i, 1);
                        console.log(data.data.constellations);
                        for(i=0;i<data.data.constellations.length;i++){
                            str +=`<option data-name="`+ data.data.constellations[i] +`">——`+ data.data.constellations[i] +`——</option >`
                        }
                    }
                }
                document.querySelector(".constellation select").insertAdjacentHTML('afterbegin', str);
                console.log(data);
            })
        }else{
            city1("GET",url+"constellations/query",function(data){
                if (data.code !== 'SUCCESS') {
                    document.querySelector(".constellation select").insertAdjacentHTML('afterbegin', '<option>无法加载信息<option>');
                    return;
                }
                var str = `<option>——请选择——</option >`
                for(i=0;i<data.data.constellations.length;i++){
                    str +=`<option data-name="`+ data.data.constellations[i] +`">——`+ data.data.constellations[i] +`——</option >` 
                }
                document.querySelector(".constellation select").insertAdjacentHTML('afterbegin', str);
            })
        }
    }else{
        city1("GET",url+"city/province",function(data){
            var str ="<option>——请选择——</option>";
            var data_province = data.data.province;
            for(i=0;i<data_province.length;i++){
                str +='<option data-id="'+ data_province[i].ProID +'">——'+ data_province[i].name +'——</option>';
            }
            console.log(str);
            document.getElementById("province").insertAdjacentHTML('afterbegin', str);
        })
        city1("GET",url+"constellations/query",function(data){
            if (data.code !== 'SUCCESS') {
                document.querySelector(".constellation select").insertAdjacentHTML('afterbegin', '<option>无法加载信息<option>');
                return;
            }
            var str = `<option>——请选择——</option >`
            for(i=0;i<data.data.constellations.length;i++){
                str +=`<option data-name="`+ data.data.constellations[i] +`">——`+ data.data.constellations[i] +`——</option >` 
            }
            document.querySelector(".constellation select").insertAdjacentHTML('afterbegin', str);
        })

    }
    
}

// // // 发起提交数据
document.getElementById("tj").onclick=function(){
    var pwd=document.querySelector(".password input").value;
    if(localStorage.pwd!=pwd){
        alert("密码错误");
        return false;
    }else{
        var user_city=["["+city2,city3,city4+"]"];
        var abc1=new FormData();
        var user_name=document.querySelector(".nickname input").value;
        var user_pwd=document.querySelector(".password input").value;
        abc1.append('token',localStorage.token);
        abc1.append('avatar',user_img);
        // console.log(user_img);
        abc1.append('gender',user_sex);
        abc1.append('city',user_city);
        abc1.append('constellation',user_constellation);
        abc1.append('name',user_name);
        smb("POST",url+"account/profile",function(data){
            console.log(data);
            localStorage.userimg=data.data.user.avatar;
        },abc1);
    }
}







window.onload = function(){     //页面加载执行方法
    header();
    my_data(); 
    Save();
}

