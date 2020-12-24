// [数组去重 #6](https://github.com/yrl/Blog/issues/6)
// [如何答一道惊艳面试官的数组去重问题 ](https://zhuanlan.zhihu.com/p/100925618)




//————————————————————————————————————————————————————————————————————————————————————————————————————

/* 
// const arr = [1,'1',2,'2',1,'2']
// const arr = [1,3,1,2,1,5,2]
const arr = ['‘dasdas',3,1,'‘dasdas',1,'jijiji',2,'jijiji']

Array.prototype.unique = function() {
  this.sort()
  const newArr = []
  for(let i=0; i<this.length; i++) {
    // 旧数组排序后遍历，如果循环中的项和新数组最后元素不同，则推入新数组
    if(this[i] !==newArr[newArr.length-1] ) {
      newArr.push(this[i]) 
    }
  }
  return newArr
}

console.log(arr.unique())

// 优点：速度快：700ms
// 缺点：1.无法区分和数字相同的字符串，比如：1和'1' 
//       2.去重后的数组会自动排序
 */


//————————————————————————————————————————————————————————————————————————————————————————————————————————————————


Array.prototype.unique = function() {
  return [...new Set(this)]
}

// 兼容性不好，但是速度快，600ms







