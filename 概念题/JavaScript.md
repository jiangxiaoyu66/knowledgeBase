# 原型原型链

[prototype 对象](https://javascript.ruanyifeng.com/oop/prototype.html)

[Object 对象的相关方法](https://javascript.ruanyifeng.com/oop/object.html)：5.Object.prototype.__proto__

# 执行上下文

[解密 JavaScript 执行上下文](https://juejin.im/post/6844903847513554952#heading-5):偏重于解释代码如何



## 何为作用域

理解作用域：[Scope（作用域）](https://developer.mozilla.org/zh-CN/docs/Glossary/Scope)









## this

[JavaScript 的 this 原理](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)

[this 关键字](https://javascript.ruanyifeng.com/oop/this.html#toc3)

[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

**箭头函数表达式**的语法比[函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)更简洁，并且没有自己的`this`，`arguments`，`super`或`new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

箭头函数没有绑定this，它的this取决于该函数外部非箭头函数的this 值

this:

箭头函数不会创建自己的`this,它只会从自己的作用域链的上一层继承this`。



[箭头函数和普通函数的区别](https://blog.nowcoder.net/n/f419c1d4728d4ed58b6f88e2d084f15c)















