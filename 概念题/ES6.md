## 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

Set：没有重复的值，没有键名，可以遍历

WeakSet：成员属于弱引用，不能遍历

Map：Set 是以 [value, value]的形式储存元素，Map 是以 [key, value] 的形式储存





set和map都是储存不重复的值

参考：

[第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6#)#6





## 弱引用

JS的垃圾回收机制中，如果我们持有对一个对象的**引用**，那么这个对象就不会被垃圾回收。这里的引用，指的是**强引用**。

还有一个**弱引用**的概念： 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。





>参考:[JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
>
>前面说过，及时清除引用非常重要。但是，你不可能记得那么多，有时候一疏忽就忘了，所以才有那么多内存泄漏。
>
>最好能有一种方法，在新建引用的时候就声明，哪些引用必须手动清除，哪些引用可以忽略不计，当其他引用消失以后，垃圾回收机制就可以释放内存。这样就能大大减轻程序员的负担，你只要清除主要引用就可以了。
>
>ES6 考虑到了这一点，推出了两种新的数据结构：[WeakSet](http://es6.ruanyifeng.com/#docs/set-map#WeakSet) 和 [WeakMap](http://es6.ruanyifeng.com/#docs/set-map#WeakMap)。它们对于值的引用都是不计入垃圾回收机制的，所以名字里面才会有一个"Weak"，表示这是弱引用。



参考：

[ES6 系列之 WeakMap](https://github.com/mqyqingfeng/Blog/issues/92#)#92

[从JS中的内存管理说起 —— JS中的弱引用](https://juejin.cn/post/6854573215549751310#heading-6)



























