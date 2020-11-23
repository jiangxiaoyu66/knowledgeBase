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

柯里化就是把 使用多个参数的函数 转化为 使用一个参数函数

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

参考文章：[「前端面试题系列6」理解函数的柯里化](https://juejin.cn/post/6844903778424995848#heading-2)



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





## 讲一下原型链？

原型：

为了解决构造函数创建对象时，共有属性被重复声明的问题，出现了原型的概念。

**每个函数都有原型prototype，每个对象都有_proto_。每个对象的_proto_指向其构造函数的prototype。**

原型链：

**每个函数都有原型prototype，每个对象都有_proto_。每个对象的_proto_指向其构造函数的prototype。**

当对象寻找某一属性时，如果自身属性没有就沿着原型链上依次往上找，直到一个对象的原型对象为null（null没有原型）。这个就叫原型链





## js实现继承的思路讲一下？

[深入学习js之——继承的多种方式和优缺点#13](https://www.lagou.com/lgeduarticle/66611.html)











































































