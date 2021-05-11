$(window).on('load',function(){
  // 实现瀑布流
   waterFall();

   // 造数据
    var dataImg = {"data":[{"src":"0.jpg"},{"src":"4.jpg"},{"src":"7.jpg"},{"src":"10.jpg"}]};
  // 滚动的时候加载图片
 $(window).on('scroll', function(){
     if(checkWillScroll()){
         // 造数据
         var dataImg = {'img':[{'src':'0.jpg'},{'src':'3.jpg'},{'src':'5.jpg'},{'src':'7.jpg'},{'src':'10.jpg'}]};
         $.each(dataImg.img, function(index, value){
             // 创建一个新的盒子
            var newBox = $('<div>').addClass('box').appendTo($('#main'));
            var newPic = $('<div>').addClass('pic').appendTo($(newBox));
            $('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo($(newPic));
         });
         // 实现重新布局
         waterFall();
     }
 })
});


// 实现瀑布流
function waterFall(){
   // 让父标签居中
   // 拿到盒子的宽度
   var allBoxs = $('#main>div');
   var boxW = allBoxs.eq(0).outerWidth();
   // 拿到浏览器的宽度
   var screenW = $(window).width();
   // 求出列数
   var cols = Math.floor(screenW/boxW);
   // 设置父标签的宽度并居中
    $('#main').css({
        'width' : boxW * cols +'px',
        'margin': '0 auto'
    });
   // 盒子定位
    var heightArr = [];
    $.each(allBoxs,function(index, value){
        var boxHeight = allBoxs.eq(index).outerHeight();
       if(index < cols){// 第一行
           heightArr[index] = boxHeight;
       }else{// 第二行
           // 取出最矮的盒子
           var minBoxH = Math.min.apply(null, heightArr);
           // 取出最矮盒子对应的索引
           var minBoxIndex = $.inArray(minBoxH, heightArr);
           // 定位
           var boxs = allBoxs[index];
           $(boxs).css({
               'position':'absolute',
               'top': minBoxH + 'px',
               'left': minBoxIndex *boxW + 'px'
           });
          // 更新盒子的高度
           heightArr[minBoxIndex] += boxHeight;
       }

    })

}

// 检测是否具备滚动的条件
function checkWillScroll(){
   // 拿到最后一个盒子
    var lastBox = $('#main>div').last();
    var lastBoxDis = $(lastBox).offset().top + Math.floor($(lastBox).outerHeight()/2);
    var topScrollH = $(window).scrollTop();
    var screenH = $(window).height();
    console.log(lastBoxDis, topScrollH)
    return lastBoxDis < (topScrollH + screenH)? true:false;
}