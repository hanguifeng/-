// const getJson = url => {
//   const promise = new Promise((resolve, reject) => {
//     const handler = () => {
//       if (this.readyState !== 4) {
//         return;
//       }
//       if (this.status === 200) {
//         resolve(this.response);
//       } else {
//         reject(new Error(this.statusText));
//       }
//     }
//     const client = new XMLHttpRequest();
//     client.open("GET", url);
//     client.onreadystatechange = handler;
//     client.responseType = "json";
//     client.setRequestHeader("Accept", "application/json");
//     client.send();
//   });
//   return promise;
// };
// getJson("/posts.json").then(json => {
//   console.log('json');
// }).catch(e => {
//   console.log(e);
// })
// const deepClone = (parent, child) => {
//   const child = child || {};
//   for(let prop in parent) {
//     if (parent.hasOwnProperty(prop)) {
//       if (typeof(parent[prop]) === 'object') {
//         child[prop] = (Object.prototype.toString.call(parent[prop]) === '[object Object]') ? {} : [];
//         deepClone(parent[prop], child[prop]);
//       } else {
//         child[prop] = parent[prop];
//       }
//     }
//   }
// }
// const unique = (arr) => {
//   const len = arr.length;
//   let uniqueArr = [];
//   let obj = {};
//   for(let i = 0; i < len; i += 1) {
//     if (!obj[arr[i]]) {
//       uniqueArr.push(arr[i]);
//       obj[arr[i]] = 1;
//     }
//   }
//   return uniqueArr;
// }
// const getJson = (url, method, data) => {
//   const promise = new Promise((resolve, reject) => {
//     const handler = () => {
//       if (this.readyState !== 4) {
//         return;
//       }
//       if (this.status === 200) {
//         resolve(this.responseText);
//       } else {
//         reject(new Error(this.statusText));
//       }
//     };
//     const client = new XMLHttpRequest();
//     client.onreadystatechange = handler;
//     if (method === "GET") {
//       client.open("GET", url, true);
//       client.send();
//     } else if(method === "POST") {
//       client.open("POST", url, true);
//       client.setRequestHeader("content-type", "Application/json");
//       client.send(data);
//     }
//   });
//   return promise;
// }
// const deepClone = (parent, child) => {
//   const child = child || {};
//   for (let prop in parent) {
//     if (parent.hasOwnProperty(prop)) {
//       if (typeof(parent[prop]) === 'object') {
//         child[prop] = (Object.prototype.toString(parent[prop]) === '[object Object]') ? {} : [];
//         deepClone(parent[prop], child[prop]);
//       } else {
//         child[prop] = parent[prop];
//       }
//     }
//   }
// }
// const unique = arr => {
//   const len = arr.length;
//   let obj = {};
//   const uniqueArr = [];
//   for (let i = 0; i < len; i++) {
//     if (!obj[arr[i]]) {
//       obj[arr[i]] = 1;
//       uniqueArr.push(arr[i]);
//     }
//   }
//   return uniqueArr;
// }
// $.ajax({
//   url:'/comm/test1.php',
//   type:'POST', //GET
//   async:true,    //或false,是否异步
//   data:{
//       name:'yang',age:25
//   },
//   timeout:5000,    //超时时间
//   dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//   beforeSend:function(xhr){
//       console.log(xhr)
//       console.log('发送前')
//   },
//   success:function(data,textStatus,jqXHR){
//       console.log(data)
//       console.log(textStatus)
//       console.log(jqXHR)
//   },
//   error:function(xhr,textStatus){
//       console.log('错误')
//       console.log(xhr)
//       console.log(textStatus)
//   },
//   complete:function(){
//       console.log('结束')
//   }
// })
// function fun(n,o) {
//   console.log(o)
//   return {
//     fun:function(m){
//       return fun(m,n);
//     }
//   };
// }
// var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
// var b = fun(0).fun(1).fun(2).fun(3);
// var c = fun(0).fun(1);  c.fun(2);  c.fun(3);

var insertNode = function(node, newNode){
  if (newNode.key < node.key){ //{4}
  if (node.left === null){ //{5}
  node.left = newNode; //{6}
  } else {
  insertNode(node.left, newNode); //{7}
  }
  } else {
  if (node.right === null){ //{8}
  node.right = newNode; //{9}
  } else {
  insertNode(node.right, newNode); //{10}
  }
  }
};
var inOrderTraverseNode = function (node, callback) {
  if (node !== null) { //{2} 
    inOrderTraverseNode(node.left, callback); //{3}
    callback(node.key); //{4}
    inOrderTraverseNode(node.right, callback); //{5}
  }
};
var preOrderTraverseNode = function (node, callback) {
  if (node !== null) {
  callback(node.key); //{1}
  preOrderTraverseNode(node.left, callback); //{2}
  preOrderTraverseNode(node.right, callback); //{3}
  }
};
var postOrderTraverseNode = function (node, callback) {
  if (node !== null) {
  postOrderTraverseNode(node.left, callback); //{1}
  postOrderTraverseNode(node.right, callback); //{2}
  callback(node.key); //{3}
  }
};

function BinarySearchTree() {
  this.root = null;
  var Node = function(key){ //{1}
    this.key = key;
    this.left = null;
    this.right = null;
  };
  this.insert = function(key){
    var newNode = new Node(key); //{1}
    if (this.root === null){ //{2}
    this.root = newNode;
    } else {
    insertNode(this.root,newNode); //{3}
    }
  };
  this.inOrderTraverse = function(callback){
    inOrderTraverseNode(this.root, callback); //{1}
  };
  this.preOrderTraverse = function(callback){
    preOrderTraverseNode(root, callback);
  }; 
  this.postOrderTraverse = function(callback){
    postOrderTraverseNode(root, callback);
  }; 
} 

var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
// console.log(tree);
function printNode(value){ //{6}
  console.log(value);
}
// tree.inOrderTraverse(printNode);


// const binarySearch = (array, item) => {
//   var low = 0, //{2}
//   high = array.length - 1, //{3}
//   mid, element;
//   while (low <= high){ //{4}
//   mid = Math.floor((low + high) / 2); //{5}
//   element = array[mid]; //{6}
//   console.log(element);
//   if (element < item) { //{7}
//   low = mid + 1; //{8}
//   } else if (element > item) { //{9}
//   high = mid - 1; //{10}
//   } else {
//   return mid; //{11}
//   }
//   }
//   return -1; //{12}
// }
// console.log(binarySearch([0,1,2,3,4,5,6,7,8,9,10], 3));
function quickSort(array, left, right) {
  console.time('1.快速排序耗时');
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
      if (left < right) {
          var x = array[right], i = left - 1, temp;
          for (var j = left; j <= right; j++) {
              if (array[j] <= x) {
                  i++;
                  temp = array[i];
                  array[i] = array[j];
                  array[j] = temp;
              }
          }
          quickSort(array, left, i - 1);
          quickSort(array, i + 1, right);
      }
      console.timeEnd('1.快速排序耗时');
      return array;
  } else {
      return 'array is not an Array or left or right is not a number!';
  }
}

//方法二
var quickSort2 = function(arr) {
  console.time('2.快速排序耗时');
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
console.timeEnd('2.快速排序耗时');
　　return quickSort2(left).concat([pivot], quickSort2(right));
};

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// console.log(quickSort(arr,0,arr.length-1));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
// console.log(quickSort2(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
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
// console.log(bubbleSort3(arr));
function insertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
      console.time('插入排序耗时：');
      for (var i = 1; i < array.length; i++) {
          var key = array[i];
          var j = i - 1;
          while (j >= 0 && array[j] > key) {
              array[j + 1] = array[j];
              j--;
          }
          array[j + 1] = key;
      }
      console.timeEnd('插入排序耗时：');
      return array;
  } else {
      return 'array is not an Array!';
  }
}
// console.log(insertionSort(arr));

const mergeSort = arr => {
  if(arr.length < 2) {
    return arr;
  }
  const len = arr.length;
  const middle = Math.floor(len / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
const merge = (left, right) => {
  const result = [];
  console.log(left, right);
  while(left.length && right.length) {
    
    if(left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  
  while(left.length) {
    result.push(left.shift());
  }
  while(right.length) {
    result.push(right.shift());
  }
  return result;
}

// console.log(mergeSort(arr));
// 二分查找
// const search = (item, arr) => {
//   let low = 0, high = arr.length - 1;
//   while(low <= high) {
//     let middle = Math.floor((low + high) / 2)
//     let ele = arr[middle];
//     if(ele < item) {
//       low = middle + 1;
//     } else if(ele > item) {
//       high = middle - 1;
//     } else {
//       return ele;
//     }
//   }
// }
// function Find(target, array)
// {
//   // write code here
//   const len = array.length;
//   for(let i = 0; i < len; i++) {
//     let low = 0;
//     let high = array[i].length - 1;
//     let middle = Math.ceil((low + high) / 2);
//     while(low < high) {
//       // console.log(low, high, middle);
//       // console.log(target, array[i][middle]);
//       if(target < array[i][middle]) {
//         if(middle === high) {
//           break;
//         }
//         high = middle;
//         middle = Math.floor((low + high) / 2);
//       } else if(target > array[i][middle]) {
//         if(middle === low) {
//           break;
//         }
//         low = middle;
//         middle = Math.ceil((low + high) / 2);
//       } else {
//         return true;
//       }
//     }
//   }
//   return false;
// }
// function Find(target, array) {
//   let i = 0;
//   let j = array[i].length - 1;
//   while (i < array.length && j >= 0) {
//     if (array[i][j] < target) {
//       i++;
//     } else if (array[i][j] > target) {
//       j--;
//     } else {
//       return true;
//     }
//   }
//   return false;
// }
// console.log(Find(11,[[1,2,8,9,10],[2,4,9,12],[4,7,10,13],[6,8,11,15]]));

// function printListFromTailToHead(head)
// {
//     // write code here
//     console.log(head);
//     while(head.next) {
        
//         console.log(head.val);
//         head = head.next;
//     }
// }
// console.log(printListFromTailToHead({val: '1', next: { val: 2, next: null }}));
