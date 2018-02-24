window.onload=function(){
    header();
    my_data(); 
    // my_data();
    creat(1);
    scl();
    window.addEventListener('scroll',_.throttle(lazyLoad(),100));
    window.addEventListener('scroll',img_load);
}