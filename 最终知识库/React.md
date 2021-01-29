# React篇

参考：[
【面试题】React知识点整理(附答案)](https://github.com/funnycoderstar/blog/issues/129#)#129

[你要的 React 面试知识点，都在这了](https://juejin.cn/post/6844903857135304718)

[框架: React](https://juejin.cn/post/6844903801153945608)



## setState原理，什么时候同步，什么时候异步

结论：

在React中，如果是由React引发的事件处理（比如通过 onClick引发的事件处理，类似这种大写的都是react进行包装过的事件方法位的是批量处理setstate，从而优化性能，小写的比如onclick就属于原生事件），调用 setState 不会同步更新this.state，

除此之外的setState调用会同步执行this.state。所谓"除此之外”，指的是绕过React通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval/promise产生的异步调用。

注意：17版本以前是这么搞得，但是17版本以后会尽量全部搞成批量。



原理：

在React的setState函数实现中，会根据一个变量isBatchingUpdates来判断是直接更新this.state还是放到队列中回头再说。

而isBatchingUpdates默认是false，也就表示setState会同步更新this.state。

但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

参考：

[【面试题】React知识点整理(附答案)](https://github.com/funnycoderstar/blog/issues/129#)

[**setState.md**](https://github.com/ChellyAI/note/blob/master/React/setState.md)

[好评论](https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates/48610973#48610973)

[你真的理解setState吗？](https://juejin.cn/post/6844903636749778958#heading-3)





## JSX原理，为什么自定义的React组件必须大写

结论：

babel在编译过程中会判断 JSX 组件的首字母。

如果是小写，则当做原生的DOM标签解析，就编译成字符串。如果是大写，则认为是自定义组件，编译成对象。

解释：

JSX实际上是React.createElement(component, props, ...children)的语法糖。如下JSX代码

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

会编译为

```js
React.createElement(MyButton, {
  color: "blue",
  shadowSize: 2
}, "Click Me");
```

注意：这里的MyButton不是字符串，而是一个对象

如果没有子节点，你还可以使用自闭合的标签形式，如

```js
<div className="sidebar" />
```

会编译为

```js
React.createElement("div", {
  className: "sidebar"
});
```





## 虚拟DOM，diff算法

### 虚拟DOM是什么

虚拟DOM 就是使用一个 原生的JavaScript对象来描述 一个DOM节点。与真实 DOM 相比，更新 JavaScript 对象更加容易、快捷。

```js
<div id="wrap">
    <p class="text">好好学习，天天向上</p>
</div>
```

使用虚拟DOM表示如下：

```js
const element = {
  // 标签名
  tagName: 'div',
  properties: {
    id: 'wrap',
  },
  children: [
    {
      tagName: 'p',
      properties: {
        class: 'text',
        children: ['好好学习，天天向上']
      },
    }
  ]
}
```



### Diff算法

参考：

[**diff.md**](https://github.com/ChellyAI/note/blob/master/React/diff.md)

[官网原文](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/reconciliation.html)

[diff算法](https://juejin.cn/post/6844903762859917320#heading-1)

#### 定义：

Diff算法就是比较虚拟dom树渲染前后的不同，从而对虚拟dom树进行更新的一种算法机制。

#### 核心比较机制

 传统的diff算法，是需要跨级对比两个树之间的不同，时间复杂度为O(n^3)

react提出的diff算法，只需要对比同级元素，这样算法复杂度就变成了O(n),时间复杂度大大减少

#### 具体如何比较：

1. 对两个虚拟dom树，从上往下，各个节点进行对比

   如果标签名发生改变，则直接替换

   如果标签名消失或者添加，则分别进行删除节点和添加节点的操作

   如果标签名未发生改变：

   ​	a. 对比属性，属性发生改变，则更新属性

   ​	b. 对比子节点，继续按照刚刚的流程进行对比

2. 当节点下面有循环渲染子节点的时候，如下列表：

   ```js
   <ul>
     <li>first</li>
     <li>second</li>
   </ul>
   ```

   当递归 `DOM` 节点的子元素时，`React` 会遍历列表。此时 `React` 会针对每个子元素进行差异比对。但这种方式下，特别是知识单纯添加或者删除某一个子节点的时候，这样比较会非常影响性能，开销会变大。

   为了解决以上问题，`React` 支持 `key` 属性，当子元素拥有了 `key` 时，`React` 使用 `key` 来匹配原有树上的子元素以及最新树上的子元素。加上了 `key` 值后，`React` 知道这次差异是新元素的插入和旧元素的移动。

   注意：

   1. 使用数组下标作为 `key` 值

      在元素不重新排序的前提下是可行的。

      但如果元素顺序发生改变，等于修改了元素的 `key` 值，原本的值和key就对应不上了，就会产生乱套的现象
      
     2. 使用不稳定的 `key` 值（例如通过 Math.random()生成的）会导致许多组件实例和 `DOM` 节点被不必要地重新创建，可能导致性能下降和子组件中的状态丢失。

    

    DOM-diff过程

   	1. 产生虚拟Dom
    	2. 虚拟Dom转化为真实Dom
    	3. diff算法，判断两个虚拟dom树的差异，得出差异对象
    	4. 蒋差异对象应用到真正的dom上

   >- 用JavaScript模拟DOM（虚拟DOM）
   >- 把虚拟DOM转换为真实的DOM插入页面中（render）
   >- 如果有事件发生修改了虚拟DOM，则比较两个虚拟DOM树的差异，得到差异对象diff
   >- 将差异对象应用到真正的DOM上（patch）



### React diff原理，如何从 O(n^3)变成 O(n)

### 为什么要使用Key，key有什么好处

在处理循环子节点的时候，

如果是增删节点，就不需要将之前的所有子节点破坏掉，然后新建所有子节点；只需要在对应位置添加需要增删的节点就可以了。

如果是修改节点，可以直接根据key值快速找到对应的节点，从而进行修改。

## 生命周期（16版本之前和之后的）











## React事件机制

参考：

[React如何实现自己的事件机制？](https://juejin.cn/post/6844903951721037837#heading-4)

[【React深入】React事件机制](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484039&idx=1&sn=1f657356676d4809633f30668acb50d2&chksm=ce6ec62bf9194f3d8a4eb382bd01c56231908a1b08fb9c2c9783f96df6650ee808fe18343032&scene=21#wechat_redirect)

[React如何实现自己的事件机制？](https://github.com/blue1314/react-/blob/master/React%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%B7%B1%E7%9A%84%E4%BA%8B%E4%BB%B6%E6%9C%BA%E5%88%B6.md)

- React如何实现自己的事件机制
- React事件和原生事件有什么区别
- React 事件中为什么要绑定 this 或者 要用箭头函数, 他们有什么区别

## fiber

![字节内部fiber](https://i.loli.net/2021/01/22/EwQlInZ6mPLJXty.png)

![字节内部fiber](https://i.loli.net/2021/01/24/ZkWyPO7YIQb5oen.png)

## mixin、HOC、render props、hooks

## immber和immutable

## 受控组件和非受控组件区别

## redux，redux 和 mobx 区别，为什么选择 redux

## Vue和React的区别



## hooks和class的区别

1. class中的函数是实例的属性，所以如果不使用不会报错，容易产生冗余代码，不容易被发现

   function组件中因为函数是直接声明的，不被使用会被报错。





## 修改源码

[前端如何修改组件库源码来封装符合自己需求的组件？](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247491904&idx=1&sn=c9057c9a25b88f16f96959eb2c77a02d&chksm=9031e2a2a7466bb49fa68741b50b3ed986f5d80ff341fbe4644ad15b683716450e25a75e286a&mpshare=1&scene=1&srcid=0128efnegD3NsuWLkJONCNim&sharer_sharetime=1611799005693&sharer_shareid=9662d5a4895340a8fd52f26052c3f72b)