// [JavaScript专题之函数柯里化](https://github.com/mqyqingfeng/Blog/issues/42)

function curry(fn) {
  const args = [].slice.call(arguments, 1)
  return function() {
    const newArgs = args.concat([].slice().call(arguments))
    fn.apply(this,newArgs )
  }
}
























