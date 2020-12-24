
// cankao :[JavaScript专题之跟着underscore学防抖#2](https://github.com/mqyqingfeng/Blog/issues/22)

// 防抖

function debounce(func, wait) {
  let timer = null;
  return function () {
    const context = this
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, arguments);
    }, wait);
  };
}


// cankao :[JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
// 节流











