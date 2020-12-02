## 箭头函数和普通函数的区别

1.this上的区别

箭头函数不会创建自己的this，所以它只会从自己的作用域链的上一层继承this，且继承的this不可以使用call，apply，bind改变。

2.不能做构造函数

=>由于不能使用 new 调用箭头函数，所以也没有构建原型的需求，于是箭头函数也不存在 prototype 这个属性。

=>连原型都没有，自然也不能通过 super 来访问原型的属性

3.没有自己的arguments对象，但是可以通过rest参数的形式访问参数

参考链接：

[箭头函数和普通函数的区别](https://blog.nowcoder.net/n/f419c1d4728d4ed58b6f88e2d084f15c)

[[ES6 系列之箭头函数](https://segmentfault.com/a/1190000015162781)]



## this指向讲一下

在普通函数中在函数被调用时决定，永远指向调用他的那个对象

在箭头函数中在函数被定义时候决定，因为箭头函数不会创建this，所以只能从作用域链的上一层继承。一般指向最近一层非箭头函数的this。

call，apply,bind对this指向的影响

------



可以**具体**说说js在函数调用中的指向问题吗？

1.全局下，指向顶层对象window或者global

2.构造函数中的this，指向实例对象

3.函数和对象之间嵌套后的this



## 函数柯里化讲一下

柯里化就是把 使用多个参数的一个函数 转换成 一系列使用一个参数

![image-20201126101033495](https://i.loli.net/2020/11/26/j54COhYJ2E19LbV.png)

最终效果如下：

```js
function sum(a, b, c) {
    console.log(a + b + c);
}

const fn = curry(sum);

fn(1, 2, 3); // 6
fn(1, 2)(3); // 6
fn(1)(2, 3); // 6
fn(1)(2)(3); // 6

```

使用场景：在一个函数中，某些参数不变，某些参数改变，这个时候我们需要把不变的参数和可变的参数分开。就可以使用函数柯里化

手写柯里化的实现函数：

```js
function curry (fn, currArgs) {
    return function() {
        let args = [].slice.call(arguments);

        // 首次调用时，若未提供最后一个参数currArgs，则不用进行args的拼接
        if (currArgs !== undefined) {
            args = args.concat(currArgs);
        }

        // 递归调用
        if (args.length < fn.length) {
            return curry(fn, args);
        }

        // 递归出口
        return fn.apply(null, args);
    }
}


```

参考文章：

[「前端面试题系列6」理解函数的柯里化](https://juejin.cn/post/6844903778424995848#heading-2)

[JavaScript专题之函数柯里化](https://github.com/mqyqingfeng/Blog/issues/42)



## 构造函数创建对象的过程

1.新建一个对象

2.将构造函数的prototype赋值给对象的_proto_

3.返回这个对象

-----------



手写new函数

```js
function newFun(cont, ...args) {
    // 新建一个对象 
    let obj = {};
    // 给这个对象指定原型链，不要用obj.__proto = cont.prototype，__proto__这种写法并不是很好
    
    Object.setPrototypeOf(obj, cont.prototype)
    // 或者用 let obj = Object.create(ctor.prototype); 把上边那个obj删掉
    
    // 这一步挺神奇的，说一下自己的理解
    let result = cont.apply(obj, args)
    
    // 
    return result instanceof Object ? result : obj
}


```

参考文章：[JavaScript new的过程](https://juejin.cn/post/6844903966149443597#heading-3)









proxy和reflect

## Reflect用过没？

## Proxy 与 Object.defineProperty 区别？

1.使用 defineProperty 只能重定义属性的读取（get）和设置（set）行为，到了 ES6，提供了 Proxy，可以重定义更多的行为，比如 in、delete、函数调用等更多行为。

2.使用 defineProperty 和 proxy 的区别，当使用 defineProperty，我们修改原来的 obj 对象就可以触发拦截，而使用 proxy，就必须修改代理对象，即 Proxy 的实例才可以触发拦截。

参考文章：[ES6 系列之 defineProperty 与 proxy](https://github.com/mqyqingfeng/Blog/issues/107)

>
>
>### 5. Proxy 相比于 defineProperty 的优势
>
>- 数组变化也能监听到
>- 不需要深度遍历监听
>
>```
>let data = { a: 1 }
>let reactiveData = new Proxy(data, {
>	get: function(target, name){
>		// ...
>	},
>	// ...
>})
>```
>
>
>作者：郭东东
>链接：https://juejin.cn/post/6844903776512393224
>来源：掘金
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。













































































## 讲一下原型链？

原型：

为了解决构造函数创建对象时，共有属性被重复声明的问题，出现了原型的概念。

**每个函数都有原型prototype，每个对象都有_proto_。每个对象的_proto_指向其构造函数的prototype。**

原型链：

**每个函数都有原型prototype，每个对象都有_proto_。每个对象的_proto_指向其构造函数的prototype。**

当对象寻找某一属性时，如果自身属性没有就沿着原型链上依次往上找，直到一个对象的原型对象为null（null没有原型）。这个就叫原型链





## js实现继承的思路讲一下？

[深入学习js之——继承的多种方式和优缺点#13](https://www.lagou.com/lgeduarticle/66611.html)（黑哥说这个不行，垃圾）或者[JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16)

[[js继承、构造函数继承、原型链继承、组合继承、组合继承优化、寄生组合继承](https://segmentfault.com/a/1190000015216289)]



## 异步的几种形式，分别的优缺点？

[第 12 题：JS 异步解决方案的发展历程以及优缺点](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/11)

[JS 异步错误捕获二三事](https://juejin.cn/post/6844903830409183239)

[JS异步解决方案的发展历程以及优缺点 ](https://github.com/sisterAn/blog/issues/29)

## 讲一下event loop？

## 函数柯里化讲一下？







## 事件代理是什么？好处是？

事件代理，就是利用事件冒泡，来执行某一事件。

具体实现方式是把要执行的事件绑定公共父元素上，将事件委托给父元素来触发，然后通过id定位到具体子元素。

好处：避免大量的事件绑定，减少内存占用

## 为什么react,vue这些框架的列表都需要一个key?

key 是给每一个 vnode（虚拟节点）的唯一 id,可以依靠 key,更准确, 更快的拿到 oldVnode 中对应的 vnode 节点。







# 浏览器

## js为什么是单线程的，如果是多线程有什么问题？

所谓单线程，是指在 JavaScript 引擎中负责解释和执行 JavaScript 代码的线程唯一，同一时间上只能执行一件任务。

**问题：首先为什么要引入单线程喃？**

我们知道：

- 浏览器需要渲染 DOM
- JavaScript 可以修改 DOM 结构
- JavaScript 执行时，浏览器 DOM 渲染停止

如果 JavaScript 引擎线程不是单线程的，那么可以同时执行多段 JavaScript，如果这多段 JavaScript 都修改 DOM，那么就会出现 DOM 冲突。

你可能会说，[web worker](http://www.ruanyifeng.com/blog/2018/07/web-worker.html) 就支持多线程，但是 web worker 不能访问 window 对象，document 对象等。


作者：前端瓶子君
链接：https://juejin.cn/post/6844903574133014542
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



## XSS和CSRF都是什么，怎么防御？

## 如何处理跨域问题？





# 优化

## **为什么将css放在头部？**，为什么script标签要写到body最下方

**为什么将css放在头部？**

CSS放头部，在加载html生成DOM tree的时候，就可以同时对DOM tree进行渲染。

现在浏览器为了更好的用户体验，渲染引擎会尝试尽快在屏幕上显示内容，它不会等到所有的HTMl元素解析之后在构建和布局dom树，所以部分内容将被解析并显示。也就是说浏览器能够渲染不完整的dom树和cssom，尽快的减少白屏的时间。

CSS如果放置底部，浏览器阻止内容逐步呈现，浏览器在等待最后一个css文件下载完成的过程中，就出现了“白屏”（新打开连接时为白屏，尔后先出现文字，图片，样式最后出现）。这点非常严重，因为在网速非常慢的情况下，css下载时间比较长，这样就给用户带来“白屏”的时间自然也就很长了，用户体验非常差。

将CSS放在底部，页面可以逐步呈现，但在CSS下载并解析完毕后，已经呈现的文字和图片就要需要根据新的样式重绘，这是一种不好的用户体验。

**javascript放在后面**

1.javascript可能会改变DOM tree的结构，所以需要一个稳定的DOM tree。如果js脚本对dom元素进行操作，而dom还未生成，则会报错。

2.js 会阻碍浏览器的解析，解析遇到js会停止渲染，优先去加载或者执行js,处理完毕后再继续渲染。

所以假如js脚本放在head中，js脚本会阻塞解析dom，从而延后first paint。

(浏览器为了更好的用户体验，不是等到所有html解析完毕才开始构建和布局渲染树的。也就是说浏览器能够渲染不完整的dom树和cssom树，从而减少白屏时间。我们管这个过长叫作first paint。)

参考文章：[为什么要把js放在页面底部，css放在顶部](https://blog.csdn.net/qq_33505829/article/details/103419143)





## 浏览器输入url到显示的过程阐述？ 

[浏览器输入url到显示的过程阐述？](https://github.com/ljianshu/Blog/issues/24)

- DNS 解析
- TCP 三次握手
- 发送请求，分析 url，设置请求报文(头，主体)
- 服务器返回请求的文件 (html)
- 浏览器渲染
  - HTML parser --> DOM Tree
    - 标记化算法，进行元素状态的标记
    - dom 树构建
  - CSS parser --> Style Tree
    - 解析 css 代码，生成样式树
  - attachment --> Render Tree
    - 结合 dom树 与 style树，生成渲染树
  - layout: 布局
  - GPU painting: 像素绘制页面

### 

作者：郭东东
链接：https://juejin.cn/post/6844903776512393224
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。











































