// [JavaScript专题之数组扁平化](https://github.com/mqyqingfeng/Blog/issues/36)





/* 
  const arr = [1, [2, [3, 4]]];
  function flatten(arr) {
  let result = []
  for(var i=0; i<arr.length; i++ ) {
    if(Array.isArray(arr[i]))  {
      result = result.concat(flatten(arr[i]))
    }
    else {
      result.push(arr[i])
    }
  }
  return result
}

const newArr = flatten(arr)
console.log(flatten(arr)) */



/* const arr = [1, [2, [3, 4]]];

function flatten() {
  const arrStr = arr.toString()
  const str = arrStr.split(',')
  result = str.map((item)=> +item)
  return result
}

console.log(flatten(arr)) */

















