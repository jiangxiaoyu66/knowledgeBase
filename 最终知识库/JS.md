



[思齐JS](https://github.com/ChellyAI/note/tree/master/JavaScript)

[JS 万字总结 重量级干货！！！](https://juejin.cn/post/6844904136161361933#heading-26)

[【面试篇】寒冬求职季之你必须要懂的原生JS(上)](https://juejin.cn/post/6844903815053852685#heading-3)


- [JS](#js)
  - [数据类型](#数据类型)
    - [Symbol](#symbol)
    - [数据存储机制](#数据存储机制)
    - [类型判断](#类型判断)
      - [各种数据的判断](#各种数据的判断)
        - [判断引用数据类型](#判断引用数据类型)
        - [判断基本数据类型](#判断基本数据类型)
    - [==和===的区别](#和的区别)
      - [===](#)
      - [==](#-1)
    - [拷贝](#拷贝)
      - [赋值](#赋值)
      - [浅拷贝](#浅拷贝)
      - [深拷贝](#深拷贝)
      - [浅拷贝的实现方式：](#浅拷贝的实现方式)
      - [深拷贝的实现方式：](#深拷贝的实现方式)
    - [面试题](#面试题)
      - [null和undefined的区别](#null和undefined的区别)
      - [null是对象吗](#null是对象吗)
      - [基本数据类型和复杂数据类型的区别](#基本数据类型和复杂数据类型的区别)
  - [原型和原型链](#原型和原型链)
    - [原型：](#原型)
    - [原型链：](#原型链)
  - [继承](#继承)
  - [`class / extend`: 类声明与继承](#class--extend-类声明与继承)
  - [执行上下文，作用域，闭包](#执行上下文作用域闭包)
    - [执行上下文](#执行上下文)
      - [**定义：**](#定义)
      - [执行上下文的生命周期](#执行上下文的生命周期)
      - [执行上下文栈](#执行上下文栈)
      - [执行上下文的三个重要属性](#执行上下文的三个重要属性)
        - [变量对象](#变量对象)
        - [作用域链](#作用域链)
          - [函数创建时](#函数创建时)
          - [**函数激活**](#函数激活)
          - [作用域链和执行上下文的区别](#作用域链和执行上下文的区别)
        - [this](#this)
          - [箭头函数的this和普通函数this的区别](#箭头函数的this和普通函数this的区别)
    - [作用域](#作用域)
      - [静态作用域和动态作用域的区别](#静态作用域和动态作用域的区别)
      - [块级作用域和局部作用域](#块级作用域和局部作用域)
      - [隐式全局变量和显示全局变量](#隐式全局变量和显示全局变量)
    - [闭包](#闭包)
  - [let，const，var的区别](#letconstvar的区别)
    - [循环中的块级作用域](#循环中的块级作用域)
      - [es5解决方案：](#es5解决方案)
      - [es6解决方案：](#es6解决方案)
        - [如果我们把 let 改成 const 呢](#如果我们把-let-改成-const-呢)
        - [for in中的循环又会如何](#for-in中的循环又会如何)
  - [apply、call、bind实现](#applycallbind实现)
  - [同步与异步](#同步与异步)
    - [同步](#同步)
    - [异步](#异步)
      - [异步的几种形式，分别的优缺点？](#异步的几种形式分别的优缺点)
        - [1.回调函数](#1回调函数)
        - [2.promise](#2promise)
        - [3.Generator](#3generator)
        - [4.async await](#4async-await)
      - [介绍下 Promise.all 使用、原理实现及错误处理](#介绍下-promiseall-使用原理实现及错误处理)
      - [讲一下event loop？](#讲一下event-loop)
        - [宏任务，微任务](#宏任务微任务)
  - [AMD、CMD、CommonJS与ES6模块化](#amdcmdcommonjs与es6模块化)
  - [script标签之async与defer](#script标签之async与defer)
  - [数组](#数组)
    - [改变数组本身的api](#改变数组本身的api)
  - [window之location、navigator](#window之locationnavigator)
  - [setTimeout与setInterval](#settimeout与setinterval)
- [es6](#es6)
  - [super指向问题](#super指向问题)




# JS

## 数据类型

七种基本数据类型，一种引用数据类型

- undefined，null，string，number，boolean，symbol，bigInt
- object

NaN 是number中的一个特殊的值，可以通过Number.NaN 来访问



### Symbol

表示独一无二的值。它通过 `Symbol` 函数生成。如果对象使用 `Symbol` 属性名的类型，可以保证不会跟其他属性名冲突。

注意：

1. **Symbol作为属性名时，不能用点运算符。**

	这是会因为点运算符后面总是字符串，所以不会读取 `Symbol` 作为标识名所指代的那个值。
	
	所以在手写 call、apply、bind 的时候使用的 Symbol 值需要用 `obj[Symbol]` 来执行对应的函数。

2. **Symbol作为属性名时，不能被遍历。**
   	`Symbol` 作为属性名，遍历对象的时候，该属性不会出现在 `for...in`、`for...of` 循环中，也不会被 `Object.keys()、Object.getOwnPropertyNames()、JSON.stringfy()`返回。

  但它也不是私有属性，有一个 `Object.getOwnPropertySymbols()` 方法，可以获取指定对象的所有 `Symbol` 属性名，该方法返回一个数组，成员是当前对象的所有用作属性名的 `Symbol` 值。



### 数据存储机制

JavaScript的存储空间分为栈(stack)、堆(heap)和池(一般也归类为栈)，其中栈存放变量，堆存放复杂对象，池存放常量。

- 基础数据类型都有固定大小，它们由系统自动分配空间，可以直接操作保存在栈内存空间的值，因此**基础数据类型都是按值来访问的**；
- 引用数据类型的大小不固定，他们的值是保存在堆内存中的对象，JavaScript不允许直接访问堆内存中的位置，在操作对象时我们是在操作对象的引用，因此**引用类型的值是按照引用访问的**，可以理解为对象的地址指针。

### 类型判断

- typeof可以正确判断除了null以外的基本数据类型，可以判断function的对象类型
-  instanceof也不准确，他的原理是查看原型是否在原型链上（如：A instanceof B是用来判断B的原型是否在A的原型链上）

>b instanceof B（b为实例，B为构造函数）
>
>原理：测试构造函数的prototype是否在实例的原型链上
>
>### 手写实现instanceof
>
>```js
>while (x.__proto__) {
>  if (x.__proto__ === y.prototype) {
>    return true;
>  }
>  x.__proto__ = x.__proto__.__proto__;
>}
>if (x.__proto__ === null) {
>  return false;
>}
>```
>
>参考：
>
>[[js\] 第76天 说说instanceof和typeof的实现原理并自己模拟实现一个instanceof](https://github.com/haizlin/fe-interview/issues/528#)
>
>[instanceof 的实现原理](https://github.com/a1029563229/InterviewQuestions/tree/master/javascript/36)
>
>

#### 各种数据的判断

##### 判断引用数据类型

>对于引用数据类型，大概三个方案：
>
>通过原型链：instanceof，arr.constructor，
>
>字符串：toString

判断数组

- 使用`Array.isArray()`判断数组
- 使用`[] instanceof Array`判断是否在Array的原型链上，即可判断是否为数组
- `[].constructor === Array`通过其构造函数判断是否为数组
- 也可使用`Object.prototype.toString.call([])`判断值是否为'[object Array]'来判断数组

判断对象

- `Object.prototype.toString.call({})`结果为'[object Object]'则为对象
- `{} instanceof Object`判断是否在Object的原型链上，即可判断是否为对象
- `{}.constructor === Object`通过其构造函数判断是否为对象

判断函数

- 使用`func typeof function`判断func是否为函数
- 使用`func instanceof Function`判断func是否为函数
- 通过`func.constructor === Function`判断是否为函数
- 也可使用`Object.prototype.toString.call(func)`判断值是否为'[object Function]'来判断func

判断null

- 最简单的是通过`null===null`来判断是否为null
- `(!a && typeof (a) != 'undefined' && a != 0 && a==a)`判断a是否为null
- `Object.prototype.__proto__===a`判断a是否为原始对象原型的原型即null
- `typeof (a) == 'object' && !a`通过typeof判断null为对象，且对象类型只有null转换为Boolean为false

##### 判断基本数据类型

判断null

- 最简单的是通过`null===null`来判断是否为null
- `Object.prototype.__proto__===a`判断a是否为原始对象原型的原型即null
- `typeof (a) == 'object' && !a`通过typeof判断null为对象，且对象类型只有null转换为Boolean为false

判断是否为NaN

- `isNaN(any)`直接调用此方法判断是否为非数值

一些其他判断

- `Object.is(a,b)`判断a与b是否完全相等，与===基本相同，不同点在于Object.is判断`+0不等于-0`，`NaN等于自身`



### ==和===的区别

#### ===

属于**严格判断**，判断两者值是否相等

#### ==

先看类型是否一致

不一致则**进行隐式转换**，一致则判断值的大小，得出结果

来看下《Javascript高级程序设计》关于==和===的规则

> 1.如果有一个操作数是布尔值，则在比较前先将其转换为数值，true转换为1，false转换为0，例如false == 0，true == 1
> 2.如果一个操作数是字符串，另一个操作数是数值，先将字符串转换成数值，例如"1"==1,'' ==0
> 3.如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型按照前面的规则进行比较。**(解释不清楚)**
> 4.null和undefined是相等的。
> 5.如果有一个数是NaN，则相等操作符返回false，而不相等操作符返回true。NaN == NaN返回为false，因为规则如此。
> 6.如果两个操作数是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true，否则返回false。
> 例如：var obj = {a:1};foo = obj;bar = obj;foo==bar;foo==bar返回为true，因为他们指向同一个对象，obj。

即：

- boolean则转为数值
- 对象和基本数据类型：valueOf()
- 有NaN，则结果为false
- 对象和对象：看引用地址是否一样
- null == undefined

![image-20210115174901723](https://i.loli.net/2021/01/15/XG2W1RKxSVqwd3n.png)





### 拷贝

参考：

[深拷贝和浅拷贝](https://zhuanlan.zhihu.com/p/146664126)

[浅拷贝与深拷贝](https://juejin.cn/post/6844904197595332622#heading-0)

浅拷贝和深拷贝**只针对引用数据类型**

#### 赋值

赋值，赋的其实是该对象的在栈中的地址，而不是堆中的数据。

#### 浅拷贝

浅拷贝只拷贝第一层属性，对于第一层的引用类型的值无法拷贝。

拷贝的是对象第一层，第二层开始，引用类型只复制地址，不复制值。

只复制对象的第一层空间（如果第一层空间中有引用数据类型，那么拷贝的只是他的地址；如果是剧本数据类型，就直接拷贝的是值）

#### 深拷贝

深拷贝是拷贝的引用对象的值，而不是地址。

>总而言之，浅拷贝只复制指向某个对象的指针，而不复制对象本身，**新旧对象还是共享同一块内存**。但深拷贝会另外创造一个一模一样的对象，**新对象跟原对象不共享内存**，修改新对象不会改到原对象。

![v2-650f96aa6b2566339702f3250b1a98d7_720w](https://i.loli.net/2021/01/17/zUr2q7HtWLSTDv5.jpg)



#### 浅拷贝的实现方式：

1.Object.assign()

`**Object.assign()**` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

```js
let obj1 = { person: {name: "kobe", age: 41},sports:'basketball' };
let obj2 = Object.assign({}, obj1);
obj2.person.name = "wade";
obj2.sports = 'football'
console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }
```

2.数组的拼接和裁剪

Array.prototype.concat()

```js
let arr = [1, 3, {
    username: 'kobe'
    }];
let arr2 = arr.concat();    
arr2[2].username = 'wade';
console.log(arr); //[ 1, 3, { username: 'wade' } ]
```

Array.prototype.slice()

```js
let arr = [1, 3, {
    username: ' kobe'
    }];
let arr3 = arr.slice();
arr3[2].username = 'wade'
console.log(arr); // [ 1, 3, { username: 'wade' } ]
```

3.lodash的clone方法

```js
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.clone(obj1);
console.log(obj1.b.f === obj2.b.f);// true
```

4.es6的展开运算符

```js
let obj1 = { name: 'Kobe', address:{x:100,y:100}}
let obj2= {... obj1}
obj1.address.x = 200;
obj1.name = 'wade'
console.log('obj2',obj2) // obj2 { name: 'Kobe', address: { x: 200, y: 100 } }	
```

#### 深拷贝的实现方式：

1.手写递归

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就把对象的值放进去
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);
```

https://juejin.cn/post/6844904197595332622#heading-13

2.lodash中cloneDeep()

3.JSON.parse(JSON.stringify())

```js
let arr = [1, 3, {
    username: ' kobe'
}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)
```

**这种方法虽然可以实现数组或对象深拷贝,但不能处理函数和正则**，因为这两者基于JSON.stringify和JSON.parse处理后，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为null）了。

比如下面的例子：

```js
let arr = [1, 3, {
    username: ' kobe'
},function(){}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)
```

![image-20210117221407301](https://i.loli.net/2021/01/17/sHF8D16rXCANfTS.png)









### 面试题

#### null和undefined的区别

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

#### null是对象吗

虽然 typeof null 返回的值是 object,但是null不是对象，而是基本数据类型的一种

#### 基本数据类型和复杂数据类型的区别

- 基本数据类型存储在栈内存，存储的是值。
- 复杂数据类型的值存储在堆内存，地址（指向堆中的值）存储在栈内存。当我们把对象赋值给另外一个变量的时候，复制的是地址，指向同一块内存空间，当其中一个对象改变时，另一个对象也会变化。



----------------------------



## 原型和原型链

### 原型：

为了解决构造函数创建对象时，**共有属性被重复声明**的问题，出现了原型的概念。

- 每个函数都有原型prototype，每个对象都有\_proto\_。每个对象的_proto_指向其构造函数的prototype。
- 每一个对象或者函数都会从原型"继承"属性

### 原型链：

**每个对象的_proto_指向其构造函数的prototype。**

当对象寻找某一属性时，如果自身属性没有就**沿着原型链上依次往上找**，直到一个对象的原型对象为null（null没有原型）。这个就叫原型链





----------------------------



## 继承

继承有几种方式，思路是什么，如何实现？尝试手写

可参考：

[ES5实现继承的那些事](https://juejin.cn/post/6844903872847151112#comment)

[JavaScript深入之继承的多种方式和优缺点](https://github.com/mqyqingfeng/Blog/issues/16#)#16

[继承的实现](https://juejin.cn/post/6844904136161361933#heading-22)

[【面试系列】JS实现继承的几种方式](https://juejin.cn/post/6847902217190506509#heading-2)



1.借助call实现继承

```js
  function Parent1(){
    this.name = 'parent1';
  }
  function Child1(){
    Parent1.call(this);
    this.type = 'child1'
  }
  console.log(new Child1);
```

问题：

子类只能继承非原型上的属性和原型上除函数以外的属性

> 父类原型上的方法子类是无法继承和访问的，但是父类中的非原型方法子类还是能够继承的

第二种方式借助原型链实现继承：

```js
  function Parent2() {
    this.name = 'parent2';
    this.play = [1, 2, 3]
  }
  function Child2() {
    this.type = 'child2';
  }
  Child2.prototype = new Parent2();

  console.log(new Child2());
```


问题：

两个实例使用的是同一个原型对象。

```js
  var s1 = new Child2();
  var s2 = new Child2();
  s1.play.push(4);
  console.log(s1.play, s2.play); // [1,2,3,4]  [1,2,3,4]
```

上面代码只改变了s1的play属性，s2也变了。因为两个实例使用的是同一个原型。

第三种方式：将前两种组合：

```js
  function Parent3 () {
    this.name = 'parent3';
    this.play = [1, 2, 3];
  }
  function Child3() {
    Parent3.call(this);
    this.type = 'child3';
  }
```

问题：


```js
  Child3.prototype = new Parent3();
  var s3 = new Child3();
  var s4 = new Child3();
  s3.play.push(4);
  console.log(s3.play, s4.play); // [1,2,3,4]  [1,2,3]
```

解决了原型共享的问题，但是父类构造函数多执行了一次

优化方案1：

```js
  function Parent4 () {
    this.name = 'parent4';
    this.play = [1, 2, 3];
  }
  function Child4() {
    Parent4.call(this);
    this.type = 'child4';
  }
  Child4.prototype = Parent4.prototype;
```

问题：

```js
  var s3 = new Child4();
  var s4 = new Child4();
  console.log(s3)
```

![image-20210119104327855](https://i.loli.net/2021/01/19/4uzbcvkZTQYKULr.png)

子类实例的构造函数是Parent4，显然这是不对的，应该是Child4。

优化方案2：

```js
  function Parent5 () {
    this.name = 'parent5';
    this.play = [1, 2, 3];
  }
  function Child5() {
    Parent5.call(this);
    this.type = 'child5';
  }
  Child5.prototype = Object.create(Parent5.prototype);
  Child5.prototype.constructor = Child5;

```

Object.create()

方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。





## `class / extend`: 类声明与继承

es6加入的class其实是为了开发者方便创建类，与其他语言在写法上尽量一致，但是js原生并没有类这个东西，为了实现类的效果，可以通过js的构造器来实现，class使用new关键字生成实例，构造器也是通过new来实例化，那么可以推断class本质也是个构造器



## 执行上下文，作用域，闭包

### 执行上下文

#### **定义：**

执行上下文是用来**解释代码执行过程**的概念，在**运行时才确定**，随时可能改变

JavaScript创建了执行上下文栈(Execution context stack，ECS)来管理执行上下文。

#### 执行上下文的生命周期

>**一个执行上下文的生命周期可以分为两个阶段。**
>
>1. 创建阶段
>
>> 在这个阶段中，执行上下文会分别创建变量对象，建立作用域链，以及确定this的指向。
>
>1. 代码执行阶段
>
>> 创建完成之后，就会开始执行代码，这个时候，会完成变量赋值，函数引用，以及执行其他代码。

#### 执行上下文栈

执行上下文栈的工作过程：最先遇到全局代码，此时向其中压入一个全局执行上下文，之后再遇到函数，会创建一个执行上下文，并压入执行上下文栈，执行完毕后将函数的执行上下文再弹出。

栈遵循先入后出

下面给出一个例子：

```js
//  定义
ECStack = [];

//  压入全局执行上下文
ECStack = [
  globalContext,
];

function func3() {
  console.log(3);
}

function func2(){
  func3();
}

function func1() {
  func2();
}

//  func1()
ECStack.push(func1Context);

//  发现func1调用了func2，因此func2()
ECStack.push(func2Context);

//  而func2还调用了func3，只好再func3()
ECStack.push(func3Context);

//  func3执行完毕
ECStack.pop();

//  func2执行完毕
ECStack.pop();

//  func1执行完毕
ECStack.pop();
```

#### 执行上下文的三个重要属性

**执行上下文有三个重要属性：**

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this



##### 变量对象

参考：[JavaScript深入之变量对象](https://github.com/mqyqingfeng/Blog/issues/5#)#5

它存储着该执行上下文中的所有 **变量和函数声明(不包含函数表达式)**

>未进入执行阶段之前，变量对象(VO)中的属性都不能访问！但是进入执行阶段之后，变量对象(VO)转变为了活动对象(AO)，里面的属性都能被访问了，然后开始进行执行阶段的操作。
>
>它们其实都是同一个对象，只是处于执行上下文的不同生命周期。




变量对象会包括：

1. 函数的所有形参 (如果是函数上下文)

   - 如果没有实参，属性值设为 undefined

2. 函数声明

   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性（函数优先级比变量优先级高）

3. 变量声明

   - 如果变量名称跟已经声明的形参或函数相同，则变量声明不会干扰已经存在的这类属性

   **注意：**如果是变量赋值，则已经声明的形参或者函数都会被覆盖。

   举个例子：

   ```js
   function foo(a) {
     var b = 2;
     function c() {};
     var d = function() {};
   
     b = 3;
   }
   
   foo(1);
   ```

   进入执行上下文后，即**执行上下文创建阶段**，此时的VO是：

```js
AO = {
  arguments: {
    0: 1,
    length: 1,
  },
  a: 1,
  b: undefined,
  c: reference to function c(){},
  d: undefined
}
```

进入代码执行阶段，代码顺序执行，修改变量对象，所以上例执行完后如下：

```js
AO = {
  arguments: {
    0: 1,
    length: 1,
  },
  a: 1,
  b: 3,
  c: reference to function c(){},
  d: reference to FunctionExpression "d"
}
```



##### 作用域链

当查找变量时，会从当前上下文的**变量对象**中查找，如果没有找到就会从父级执行上下文的**变量对象**中查找。这样**由多个执行上下文的变量对象构成的链表就叫作用域链**。

###### 函数创建时

函数有一个内部属性[[scope]]，当函数创建的时候，就会保存所有父变量对象到其中。

[[scope]]就是所有父变量对象的层级链，但[[scope]]并不代表完整的作用域链。

```js
function foo() {
  function bar() {
    //  some code
  }
}

//  创建时，各自的[[scope]]为
foo.[[scope]] = [
  globalContext.VO,
];
bar.[[scope]] = [
  fooContext.AO,
  globalContext.VO,
];
```

###### **函数激活**

  当进入函数上下文，创建了函数的变量对象（活动对象）后，将其添加到作用链（即所有父变量对象的层级链）的前端，此时才构成一个完整的执行上下文作用域链，结构如下：

```js
Scope = [AO].concat([[scope]]);
```

参考：[JavaScript深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6#)#6

###### 作用域链和执行上下文的区别

- 相同点：都是链式结构（执行上下文准确来说是个栈）

- 不同：

  1.执行上下文在运行时确定，随时可能改变

  ​	作用域在脚本解析阶段就已经规定好了，所以与执行阶段无关，且无法改变

  2.作用域是为了解释变量使用范围产生的概念，执行上下文是为了解释代码执行机制而存在的概念



##### this

 简单来说

- 普通函数中在函数被调用时决定，永远指向调用他的那个对象；
- 箭头函数中在函数被定义时决定，因为箭头函数不会创建 this，所以只能从作用域链的上一层继承。

![this](https://i.loli.net/2021/01/20/SdY4HgeFfEpV1CK.png)

>如果进入执行环境时没有设置 `this` 的值
>
>- 严格模式下保持为undefined
>- 非严格模式下为global或者window。分别对应的是node环境和浏览器
>
>



注意：

> [window.setTimeout-关于"`this`"的问题](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%85%B3%E4%BA%8Ethis%E7%9A%84%E9%97%AE%E9%A2%98)
>
> 由`setTimeout()`调用的代码运行在与所在函数完全分离的执行环境上。这会导致，这些代码中包含的 `this` 关键字在非严格模式会指向 `window` (或全局)对象，严格模式下为 undefined，这和所期望的`this`的值是不一样的。

参考：

[思齐this](https://github.com/ChellyAI/note/blob/master/JavaScript/3%E3%80%81%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E3%80%81this%E5%92%8C%E9%97%AD%E5%8C%85.md#other)

[一次笔试引发的关于setTimeout的this的思考](https://juejin.cn/post/6844903745147387918)



###### 箭头函数的this和普通函数this的区别

1.箭头函数的this在函数声明的时候决定，普通函数的this在函数被调用的时候决定

2.箭头函数不可以用作构造函数来创建对象，普通函数可以

3.箭头函数没有arguments对象，但是可以用...rest结构来代替；普通函数有arguments对象





### 作用域

定义：

作用域是指程序源代码中定义变量的区域。

个人理解就是 **变量的作用范围**

作用：

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

#### 静态作用域和动态作用域的区别

静态作用域是根据书写位置来查找变量，动态作用域是从调用函数的作用域查找变量

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

参考：[JavaScript深入之词法作用域和动态作用域](https://github.com/mqyqingfeng/Blog/issues/3#)#3



#### 块级作用域和局部作用域

let和const是声明的变量属于块级作用域，var声明的变量属于全局作用域

注意：

块级作用域下，for循环的条件语句的作用域与其循环体的作用域不同，条件语句块属于循环体的父级作用域，例子如下：

```js
// 以下语句使用let声明不报错，说明为不同作用域
for (let i = 0; i < 5; i++) {
  let i = 5
  if(i) {
      console.log(i)  // 1,2,3,4
  }
}
--------------------------------------------
// 此语句报错，说明循环体为条件语句块的子作用域
// for循环执行顺序为：条件语句块1->条件语句块2->循环体->条件语句块3->条件语句块2 依次类推
for (let i = 0; i < 5; i=x) { // x is not defined
  let x = 5
}
```

#### 隐式全局变量和显示全局变量

所有未定义的变量直接赋值后，会自动声明为全局作用域的变量

- 注意：(隐式全局变量可以用delete删除，var定义的则不行)

```js
a=1 // 隐式全局变量 严格模式报错
var b=2 // 显式全局变量
console.log(a,b) //1 2
delete a  // 严格模式报错
delete b  // 严格模式报错
console.log(b,a) // 2   a is not defined 
```

### 闭包

理论角度：闭包就是能够访问自由变量的**函数**。

  <!--释：自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。-->

​       换句话说，**闭包是指有权访问另一个函数作用域内变量的函数**。

​		所以，理论角度来说，js所有的函数都是闭包

从实践角度：以下函数才算是闭包：

1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
2. 在代码中引用了自由变量

## let，const，var的区别

- let和const之间

  1. let声明常量，const声明变量

  2. let声明时可以不赋值，const声明时候必须赋值

- var和let，const之间

  1. var存在变量提升，let和const不存在

  2. var刻意重复声明，let和const不可以

  3. var声明的变量是全局作用域，const和let声明的变量是块级作用域

  ```js
    var a = 1;
    //  window.a = 1
  ```

  4. let和const存在暂时性死区

     

  ```js
  var value = "global";
  
  // 例子1
  (function() {
      console.log(value); // Uncaught ReferenceError: value is not defined
  
      let value = 'local';
  }());
  
  // 例子2
  {
      console.log(value); // Uncaught ReferenceError: value is not defined
  
      const value = 'local';
  };
  ```

  虽然在执行上下文中，所有的除形参和函数以外的变量都是先声明，后赋值的。但是let和const额外还有一个机制，叫做暂时性死区。即只有在执行过变量声明语句后，变量才可以被访问，否则就报错。

  

  

### 循环中的块级作用域

```js
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 3
```

#### es5解决方案：

```js
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs[i] = (function(i){
        return function() {
            console.log(i);
        }
    }(i))
}
funcs[0](); // 0
```

解决思路：

```js
// 伪代码

var funcs = [];

funcs[0] = function(0) {
    return function() {
        console.log(0)
    }
}

// 就相当于
funcs[0] = funciton() {
    console.log(0)
}

```

#### es6解决方案：

```js
var funcs = [];
for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // 0
```

es6解决思路：

> 那么当使用 let 的时候底层到底是怎么做的呢？
>
> 简单的来说，就是在 `for (let i = 0; i < 3; i++)` 中，即圆括号之内建立一个隐藏的作用域，这就可以解释为什么:
>
> ```js
> for (let i = 0; i < 3; i++) {
>   let i = 'abc';
>   console.log(i);
> }
> // abc
> // abc
> // abc
> ```

然后**每次迭代循环时都创建一个新变量，并以之前迭代中同名变量的值将其初始化**

就相当于：

```js
// 伪代码
(let i = 0) {
    funcs[0] = function() {
        console.log(i)
    };
}

(let i = 1) {
    funcs[1] = function() {
        console.log(i)
    };
}

(let i = 2) {
    funcs[2] = function() {
        console.log(i)
    };
};
```

##### 如果我们把 let 改成 const 呢

不过到这里还没有结束，如果我们把 let 改成 const 呢？

```js
var funcs = [];
for (const i = 0; i < 10; i++) {
    funcs[i] = function () {
        console.log(i);
    };
}
funcs[0](); // Uncaught TypeError: Assignment to constant variable.
```

结果会是报错，因为虽然我们每次都创建了一个新的变量，然而我们却在迭代中尝试修改 const 的值，所以最终会报错。

##### for in中的循环又会如何

```js
var funcs = [], object = {a: 1, b: 1, c: 1};
for (var key in object) {
    funcs.push(function(){
        console.log(key)
    });
}

funcs[0]()
```

结果是 'c';

那如果把 var 改成 let 或者 const 呢？

使用 let，结果自然会是 'a'，const 呢？ 报错还是 'a'?

结果是正确打印 'a'，这是因为在 for in 循环中，**每次迭代不会修改已有的绑定**，而是会创建一个新的绑定。

参考：[ES6 系列之 let 和 const](https://github.com/mqyqingfeng/Blog/issues/82#)#82



## apply、call、bind实现

call

思路：把函数作为对象的属性，这样就相当于使用对象来调用函数，即this指向为指定的对象

```js

Function.prototype.call = function(obj = window, ...args) {  // 指定的 this 如果是 undefined，就得用 window 对象
  const func = Symbol('func'); // 保持属性名的唯一性，防止和对象中的原有属性名发生冲突
  obj[func] = this; // Symbol类型的属性在对象中不能用.来访问

  const result = obj[func](...args);
  delete obj[func]; // 使用指定对象调用函数后，把函数从指定对象中删除

  return result;
}
```

apply

```js
Function.prototype.apply2 = function(obj = window, params) {
  const func = Symbol('func');
  obj[func] = this;

  const result = obj[func](...params); // apply传过来的是一个数组，所有直接结构就好了
  delete obj[func];

  return result;
}
```

bind

```js
Function.prototype.bindNew = function (obj, ...args) {
  if (typeof this !== "function") { throw Error("not a function.") } // 是否为函数_若不考虑参数类型可以省略
  return (...newArgs) => this.apply(obj, [...args, ...newArgs]); // 返回函数
};
```



## 同步与异步

### 同步

定义：只有当前任务执行完成，才会进入下一个任务。

注意：所有同步代码只会进入调用栈，同步代码会阻塞主线程的执行，而且会优先与其他非同步代码执行

### 异步

定义：指当前执行的代码会进入异步线程处理之后才会再由主线程处理回调

#### 异步的几种形式，分别的优缺点？

>1.回调函数。解决了同步的问题，但本身存在回调地狱的问题，不能用try catch捕获异常，不能return
>
>2.promise。采用级联代替回调，解决回调地狱，但是promise无法取消，捕获错误需要通过回调函数进行捕获
>
>3.generator。可以控制函数的执行
>
>4.async await。代码清晰，没有回调函数的问题。但在处理相互之间没有依赖的多个异步操作的时候，会导致性能降低，不如用peomise.all



##### 1.回调函数

优点：解决了同步的问题（避免出现任务阻塞）

**缺点：回调地狱，不能用 try catch 捕获错误，不能 return**

回调地狱的根本问题在于：

1.耦合度太高，牵一发而动全身

2.嵌套过多，整体调试困难，只能把每一个嵌套函数当作一个单元来调试

##### 2.promise

优点：

采用级联的方式代替嵌套回调，解决了回调地狱的问题：

1.通过return promise函数，来实现多个异步操作的顺序执行

2.并且在 `Promise` 中我们也可以实现分级的 `catch`

缺点：

1.promsie无法取消（状态中只有pending，reject，resolve，没有所谓的 cancel 状态。cancel 的加入会带来更多的状态问题，并不适合 Promise 这一模式来处理）

2.**错误需要通过回调函数来捕获**(reject函数)

参考：

[为什么说promise不能取消是一个缺点](https://m.imooc.com/wenda/detail/473806)

##### 3.Generator

特点：**控制函数执行**

```js
function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

##### 4.async await

**优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题**

缺点：await 将异步代码改造成同步代码，**如果多个异步操作没有依赖性而使用 await 会导致性能上的降低，不如用Promise.all**

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch('XXX1')
  await fetch('XXX2')
  await fetch('XXX3')
}
```

下面来看一个使用 await 的例子：

```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，让我来解释下原因

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为 `await` 内部实现了 `generator` ，**`generator` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来**
- 因为 `await` 是异步操作，后来的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove(返回值)`，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator`，其实 `await` 就是 `generator` 加上 `Promise`的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。

> Generator 函数不是这样，它执行产生的上下文环境，一旦遇到`yield`命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行`next`命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
>
> 参考：[Generator 与上下文](https://es6.ruanyifeng.com/#docs/generator)



对比下面promise，promise就不会对上下文文的变量进行冻结

```js
let a = 0;
let b = () => {
    new Promise((resolve) => {
        resolve(10);
    })
    .then(value => {
        a = a + value;
        console.log('qqq', a);
    });
}
b();
a++;
console.log('www', a);
```

参考：

[JS异步解决方案的发展历程以及优缺点 #29](https://github.com/sisterAn/blog/issues/29)



#### 介绍下 Promise.all 使用、原理实现及错误处理

Promise是异步编程解决方案之一。

Promise.all()接受一个由promise任务组成的数组，可以同时处理多个promise任务，当所有的任务都执行完成时，Promise.all()返回resolve，但当有一个失败(reject)，则返回失败的信息，即使其他promise执行成功，也会返回失败。

参考：

[第 80 题：介绍下 Promise.all 使用、原理实现及错误处理](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/130#)#130







#### 讲一下event loop？

主线程是为了解决Js单线程问题而出现的处理异步任务的一种循环机制，不断从队列中读取任务进行处理。

此机制具体如下:

主线程（或者说，执行栈）会不断从任务队列中按顺序取任务执行，

每执行完一个任务都会检查microtask队列是否为空（执行完一个任务的具体标志是函数执行栈为空）。

如果不为空则会一次性执行完所有microtask。然后再进入下一个循环去任务队列中取下一个任务执行。



1.在全局执行上下文中，先执行同步任务，然后微任务，然后依次执行宏任务

2.在宏任务中，先执行**当前宏任务中**的同步任务，然后清空**当前宏任务中**的微任务，然后执行**当前宏任务中**的宏任务

总结：在当前执行上下文中，先执行同步任务，然后微任务，然后宏任务（这里的同步任务，微任务和宏任务都只是针对当前执行上下文）

先看一个简单的示例：

```js
setTimeout(()=>{
    console.log("setTimeout1");
    Promise.resolve().then(data => {
        console.log(222);
    });
});
setTimeout(()=>{
    console.log("setTimeout2");
});
Promise.resolve().then(data=>{
    console.log(111);
});
```

思考一下, 运行结果是什么？

运行结果为:

```js
111
setTimeout1
222
setTimeout2
```



##### 宏任务，微任务

宏任务（macrotask）也叫tasks，微任务（microtask）也叫jobs，JavaScript有两种队列，分别是macro task queue和micro task queue。任务将放置到对应的任务队列中。

  是宏任务的异步任务有：

- setTimeout
- setInterval
- setImmediate(Node)
- requestAnimationFrame(browser)
- UI rendering(browser)
- I/O

  是微任务的异步任务有：

- process.nextTick(Node)这个任务会插队到其他微任务前面
- Promise
- Object.observe
- MutationObserver




## AMD、CMD、CommonJS与ES6模块化




## script标签之async与defer

## 数组

### 改变数组本身的api

## window之location、navigator

## setTimeout与setInterval



# es6

## super指向问题

1.super作为对象，如super.x

作为对象时，只能在对象的方法中使用，指向父类的原型对象。

```js
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x);
  },
};

const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```

2.super作为函数，如super()

作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

>Class 可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
>
>```js
>class Point {
>}
>
>class ColorPoint extends Point {
>}
>```
>
>上面代码定义了一个`ColorPoint`类，该类通过`extends`关键字，继承了`Point`类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个`Point`类。下面，我们在`ColorPoint`内部加上代码。
>
>```js
>class ColorPoint extends Point {
>  constructor(x, y, color) {
>    super(x, y); // 调用父类的constructor(x, y)
>    this.color = color;
>  }
>
>  toString() {
>    return this.color + ' ' + super.toString(); // 调用父类的toString()
>  }
>}
>```
>
>上面代码中，`constructor`方法和`toString`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。
>
>子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。

react里面类组件中，super(props)其实就是：

1. 执行父类的construtor，来创建子类的this对象

2. 将父类的实例对象和属性通过props传给子类

循环中的块级作用域





