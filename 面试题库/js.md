## 词法作用域和动态作用域

词法作用域是在函数**定义的时候**就决定了函数的**作用域**

动态作用域是在函数**执行的时候**才决定函数的**作用域**

让我们认真看个例子就能明白之间的区别：

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???
```

假设JavaScript采用静态作用域，让我们分析下执行过程：

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

假设JavaScript采用动态作用域，让我们分析下执行过程：

执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。





## 谈谈你对作用域链的理解

[面试分享：两年工作经验成功面试阿里P6总结](https://juejin.cn/post/6844903928442667015#heading-39)



当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。



## 什么叫函数声明

[详解变量声明提升和函数声明提升](https://juejin.cn/post/6844903532856868872)

函数声明有一个非常重要的特征：函数声明提升，函数声明语句将会被提升到外部函数作用域的顶部（是不是跟变量提升非常类似）

#### 2.2 函数声明语法

```js
f('superman');
function f(name){    console.log(name);}
```

运行上面的程序，控制台能打印出supemran。

#### 2.3 函数表达式语法

```js
f('superman');
var f= function(name){    console.log(name);}
```

运行上面的代码，会报错Uncaught ReferenceError: f is not defined(…),



## null和undefined的区别

意义上来说，null代表“没有对象”，没有值； undefined代表“缺少值”，声明了但是未赋值

用法上：

```js
// null
1.原型链的终点
2.作为函数参数，代表参数不是对象

// undefined
1.变量声明但是没有赋值
2.如果函数调用未给参数，则是undefined
3.函数默认返回值为undefined

```

## 类型转换

1. 转布尔值直接使用`Boolean()`即可

| 数据类型  | 转换为true的值 | 转换为false的值 |
| --------- | -------------- | --------------- |
| Boolean   | true           | false           |
| String    | 任何非空字符串 | ""（空字符串）  |
| Number    | 任何非零数字   | 0和NaN          |
| Object    | 任何对象       | null            |
| Undefined | n/a或N/A       | undefined       |

2.转数字用`Number()`、`parseInt()`或`parseFloat()`。

3.转字符串用`String()`或者`toString()`。需要注意的是，**null和undefined没有`toString`方法**。注意：数字直接调用 `1.toString()` 会报错，因为 `1.`会被理解为小数点而非调用函数，所以要想使用，需要这样多加一个点 `1..toString()` 、中间加空格 `1 .toString()` 或者用括号 `(1).toString()` 才能达成数字转字符串的目的。

4.一元加号会尝试将 `boolean` 类型转换为数字类型，所以 `+true` 会被转换为 1，而 `+false` 被转换为0



## 说说Symbol类型

es6新增的数据类型，表示独一无二

不能直接遍历，可以使用Object.getOwnPropertyNames()



## 深浅拷贝，手写深拷贝

定义：

浅拷贝：只拷贝引用类型的引用地址

深拷贝：拷贝引用类型的值

手写深拷贝：

[如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141#heading-2)



## 闭包有什么作用

闭包：可以访问自由变量的**函数**

自由变量：除函数参数和函数局部变量以外的变量。

换句话说，闭包就是可以访问外部作用域内变量的函数

简单例子：

```js
var a = 1;

function foo() {
  console.log(a);
}

foo();
```







# es6

















