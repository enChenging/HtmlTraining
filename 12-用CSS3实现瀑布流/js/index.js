/**
 * Created by apple on 15/10/31.
 */
function $(id){
    return typeof id === 'string' ? document.getElementById(id):id;
}

window.onload = function(){
    // 实现瀑布流布局
    waterFall('main', 'box');
    // 当屏幕滚动的时候动态加载图片
    window.onscroll = function(){
        // 判断是否具备加载图片的条件
        if(isLoadBox()){
           // 造数据
            var dataImg = {'data':[{'src':'0.jpg'},{'src':'2.jpg'},{'src':'1.jpg'},{'src':'5.jpg'},{'src':'6.jpg'}]};
            for(var i=0; i<dataImg.data.length; i++){
                //创建盒子
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);
                // 创建里面的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                // 创建图片
                var newImg = document.createElement('img');
                newImg.src = 'images/' + dataImg.data[i].src;
                newPic.appendChild(newImg);
            }
            // 实现瀑布流布局
            waterFall('main', 'box');
        }
    }
}


// 实现瀑布流布局
function waterFall(parent, box){
    //----- 居中显示-----
    // 1.拿到所有的盒子
    var allBox = $(parent).getElementsByClassName(box);
    // 2.取出其中任一盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    // 3.求出当前浏览器的宽度
    var screenWidth = document.body.clientWidth;
    // 4.求出总列数
    var cols = Math.floor(screenWidth / boxWidth);
    // 让父标签居中显示
    $(parent).style.cssText = 'width:' + boxWidth * cols + 'px; margin:0 auto;';

    // ----- 定位------
    // 定义一个高度数组
    var heightArr = [];
    // 1.遍历所有的盒子,并取出第一行盒子的高度放入数组
    for(var i=0; i<allBox.length; i++){
        // 取出每一个盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        if(i < cols){// 第一行
            heightArr.push(boxHeight);
        }else{ // 剩余的行
            // 取出上一行最矮盒子的高度
            var minBoxHeight = Math.min.apply(null, heightArr);
            // 取出上一行最矮盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
            // 对当前行中盒子进行定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = boxWidth * minBoxIndex + 'px';
            // 更新高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
}


// 遍历取出最矮盒子对应的索引
function getMinBoxIndex(value, arr){
    for(var i in arr){
        if(arr[i] == value){
            return i;
        }
    }
}

// 判断是否加载新的盒子
function isLoadBox(){
   // 取出所有的盒子
    var allBox = $('main').getElementsByClassName('box');
   // 拿到最后一个盒子
    var lastBox = allBox[allBox.length -1];
   // 求出最后一个盒子自身高度的一半 + 其头部偏离浏览器的高度
    var lastBoxDis = lastBox.offsetTop + Math.floor(lastBox.offsetHeight / 2.0);
   // 求出浏览器的高度
    var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
   // 求出页面偏离浏览器的高度
    var offSetTop = document.body.scrollTop;

    console.log(lastBoxDis,screenHeight,offSetTop);
   // 判断是否具备加载条件
    return lastBoxDis < screenHeight + offSetTop ? true : false;
}