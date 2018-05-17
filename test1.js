// 2、使用ajax（可使用jQuery框架，若使用其他框架请注明）写一个跨域异
// 步获取json数据方案；说说能否使用javascript进行跨域异步post数据。
// 3、已知数组如下，请用js完成以下请求，需写出详细实现步骤。
const arr = [1, 6, 6, 2, 10, 3, 9, 7, 3, 9, 15, 20, 14, 61];
const sort = arr => {
  let low = 0;
  let high = arr.length - 1;
  while(low < high) {
    for(let j = low; j < high; ++j) {
      if(arr[j] < arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    --high;
    for(let j = high; j > low; --j) {
      if(arr[j] > arr[j - 1]) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
    }
    ++low;
    
  }
  return arr;
};
// arr.unshift(11);
// arr.push(99);
// const index = arr.indexOf(61);
// arr.splice(index + 1, 0, 62, 63, 64);
// arr.reverse();
// const uniqueArr = arr => {
//   const obj = {};
//   const uniqueArr = [];
//   for(let i = 0; i < arr.length; i++) {
//     if(obj[arr[i]]) {
//       continue;
//     } else {
//       obj[arr[i]] = 1;
//       uniqueArr.push(arr[i]);
//     }
//   }
//   return uniqueArr;
// }
// console.log(arr);
// console.log(uniqueArr(arr));

{/* <input class="input" /> */}
// .input {
//   // background-image: url('bg.jpg');
//   background-repeat: no-repeat;
//   background-color: blue;
//   text-align: left;
//   border: 5px dashed green;
//   border-radius: 3px;
//   width: 200px;
//   height: 50px;
//   box-shadow: 1px 2px 3px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-100px, -25px);
// }
// .input:after {
//   content: '';
//   clear: both;
//   display: block;
// }

// 7、前端如何对web进行性能上的优化？有什么检测工具？
// 1.减少HTTP请求
// 浏览器和服务器发生通信时，会消耗大量的时间，可以通过合并图片、css、js
// 文件方式来进行优化，减少请求次数，例如雪碧图这种图像合成技术，可以将小
// 的图标之类的合成一张图片请求，还可以通过webpack将项目打包成一个js文件
// 2.减少重绘和重排
// 设置style属性改变结点样式的话，每设置一次都会导致一次重排，最好通过修
// 改class来设置样式，还有些样式仅读取就会发生浏览器重新渲染
// 3.减少对DOM的操作
// 4.控制cookie大小和污染
// 每次浏览器都会去读取相应的cookie，所以要去除不必要的cookie，体积要尽量
// 小，设置合理的过期时间
// ONEAPM

// 8、请编写子类Child，通过原型链方法和构造器方法实现People父类继承，并调用say()说出自己的名字和年龄。
// 构造器方法
// function People(name,age){
//   this.name = name;
//   this.age = age;
//   this.say = function(){
//     console.log(this.name + '年龄： '+ this.age);
//   }
// }
// function Child(name,age){
//   People.apply(this, arguments);
//   this.name = name;
//   this.age = age;
// }
// const child = new Child('韩贵封', 21);
// child.say();
// 原型链方法
// function People(name,age){
//   this.name = name;
//   this.age = age;
//   this.say = function(){
//     console.log(this.name + '年龄： '+ this.age);
//   }
// }
// function Child(name,age){
//   this.name = name;
//   this.age = age;
// };
// Child.prototype = new People();
// const child = new Child('韩贵封', 21);
// child.say();

// 9.冒泡排序
function bubbleSort3(arr) {
  var low = 0;
  var high= arr.length-1; //设置变量的初始值
  var tmp,j;
  console.time('2.改进后冒泡排序耗时');
  while (low < high) {
    for (j= low; j< high; j++){
      if (arr[j]> arr[j+1]) {
        tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
      }
    } //正向冒泡,找到最大者
    high--;                 //修改high值, 前移一位
    for (j=high; j>low; j--){
      if (arr[j] < arr[j - 1]) {
        tmp = arr[j]; arr[j] = arr[j - 1]; arr[j - 1] = tmp;
      }
    } //反向冒泡,找到最小者
    low++;
  }
  return arr;
}
// console.log(bubbleSort(arr));

// 10、说说你所知道的提高前端开发效率的工具或方法？
// 一款合适自己的IDE工具，人性化的界面和支持大多数语法的
// 高亮外，还可以安装各种各样的插件来拓展你的IDE工具，如
// vscode，webstorm等
// 前端的自动化工具，能够很大程度上缩减前端不必要的工作量
// ，可以使用NPM来管理我们的项目包文件；利用webpack来打
// 包压缩我们的代码；利用Node.js来实现构建本地服务器；
// 使用ES6的模块化功能来实现我们的前端模块化。
// 用react等框架将前端组件化，我们可以通过将我们的代码划分成不同组件来实
// 现功能公用，同时也可以提高前端代码的可维护性和清晰度。
// 有个好的编码规范和开发模式，遵循编码规范文档可以帮助
// 在团队开发时提高合作开发的效率。一个团队遵循一套编码
// 规范可以使每个人的代码写出一个人的风格，这样团队间相互
// 审查、测试、完善功能时会非常高效。

// 11、CSS选择器的优先级如何定义？如何做选择器优化？
// 优先级就是分配给指定的CSS声明的一个权重，它由匹配的选
// 择器中的每一种选择器类型的数值加权计算决定。如果优先级相等，那
// 么最后的那个声明将会被应用到元素上，优先级列表如下：
// !important>内联样式>ID>类|伪类|属性选择|>标签|伪元素
// >通配符
// 无穷大，1000，100，10，1，0

// var a = function(n){
//   if(n<2){
//     return n;
//  }
//   else
//     return 2*a(n-1)+a(n-2);
//  }
// console.log(a(5));
// function getCDNum(n, s, L) {
//   var total = n * s;
//   var cdNum = 0;
//   while(cdNum * L <= (total + (n - 1 - (cdNum - 1))) && (n /cdNum) % 13 !== 0 ) {
//       cdNum++;
//   }
//   return cdNum;
// }
// console.log(getCDNum(1, 1, 1));
// function indexOf(arr, item) {
//   return arr.findIndex((n) =>{
//                 return n === item;
//                 })
// }
// console.log(indexOf([ 1, 2, 3, 4 ], 3));
// 引入 readline , 用于逐行读取
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// let lineCount = 0;
// let arr1 = [];
// let arr2 = [];
// rl.on('line', function(line){
//     if(lineCount === 0) {
//         arr1 = line.split(' ');
//         lineCount++;
//     } else if(lineCount === 1) {
//         arr2 = line.split(' ');
//         lineCount++;
//     } else {
//         unique(arr1, arr2);
//     }
// });
// function unique(arr1, arr2) {
//     const sub = parseInt(arr1[1], 10);
//     const arr3 = [];
//     const arr4 = [];
//     for(let i = 0; i < arr2.length; i++){
//         for(let j = 0; j < arr2.length; j++){
//             if(arr2[i] - arr2[j] === sub) {
//                 arr3.push([arr2[i], arr2[j]]);
//             }
//         }
//     }
//     console.log(arr3);
//     for(let i = 0; i < arr3.length; i++) {
//         let isUnique = true;
//         for(let j = 0; j < arr3.length; j++) {
//             if(i !== j && arr3[i][0] === arr3[j][0] && arr3[i][1] === arr3[j][1]) {
//                 isUnique = false;
//             }
//         }
//         if(isUnique) {
//             arr4.push(arr3[i]);
//         }
//     }
//     console.log(arr4.length);
//     return arr4.length;
// }


// var readline = require('readline');
// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// var lineCount = 0;
// rl.on('line', function(line){
//     var reg = /[a-zA-Z]\d+/g;
//     var arr = line.match(reg);
//     var numArr = [];
//     for(var i = 0; i < arr.length; i++) {
//         numArr.push(parseInt(arr[i], 10));
//     }
//     console.log(numArr);
// });
function a(line){
  var reg = /\d+/g;
  var arr = line.match(reg);
  var arr1 = arr.map(n => parseInt(n, 10));
  var _arr = bubbleSort3(arr1);
  console.log(_arr, _arr[_arr.length - 1]);
  return _arr[_arr.length - 1];
}
console.log(a("helloworld520hellowrold1314h1111"));
console.log([1, 2, 3].toString());