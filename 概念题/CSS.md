![image-20201030145117384](https://i.loli.net/2020/10/30/6JD1mkrzScQFeqH.png)

# 布局

## 不定宽高元素，垂直水平居中

参考文章：[「干货」CSS 不定宽高的垂直水平居中（最全 9 种）](https://juejin.im/post/6844903933350150158)



## 三栏布局

[详解 CSS 七种三栏布局技巧](https://juejin.im/entry/6844903462283509768#comment)

[负margin技术原理与运用 | CSS](https://juejin.im/post/6847902222106230797)

[浅谈margin负值](https://zhuanlan.zhihu.com/p/25892372)

flex





# 盒模型



- `content-box` (W3C 标准盒模型)：盒子大小就是content大小
- `border-box` (IE 盒模型)：盒子大小还包括padding和border

可通过`box-sizing`进行设置。

不写box-sizing的话，写了DOCTYPE类型的，使用content-box；不写就使用border-box

![image-20201116175847928](https://i.loli.net/2020/11/16/qFyEWJcHRMfawNS.png)



# BFC



## 是什么

一个独立的渲染区域，内外部元素的定位互不影响

## 如何触发

1.父元素是根元素html下的body标签

2.float值不为none

3.position为fixed或者absolute

4.display的值为flex，inline-flex；inline-block；table-cell，table-caption；flow-root

5.overflow不是visible

## 渲染规则

1.内部块级元素在垂直方向依次排列

2.内部块级元素在垂直方向的距离由margin决定，属于同一个BFC的相邻块级元素margin会重叠

3.对于从左往右的格式化，每个元素（块级元素与行内元素）的左边缘，与包含块的左边缘相接触，(对于从右往左的格式化则相反)。即使包含块中的元素存在浮动也是如此，除非其中元素再生成一个BFC

4.BFC内外的定位互不影响，BFC区域不与浮动元素重叠

5.计算BFC的高度时，浮动元素的高度也计算在内：

![image-20201117112245079](https://i.loli.net/2020/11/17/lEUro8MByhn2G6k.png)

根据BFC布局规则第六条：

```
计算BFC的高度时，浮动元素也参与计算
```

为达到清除内部浮动，我们可以触发par生成BFC，那么par在计算高度时，par内部的浮动元素child也会参与计算。

```
.par {
    overflow: hidden;
}
```

![image-20201117112259227](https://i.loli.net/2020/11/17/oXcQlJR8agBWGb6.png)



## 应用

1.解决元素上下边距的问题

```js
<body>
    <div style="width:100px;height:100px;background:red;margin:20px;"></div>
    <div style="width:100px;height:100px;background:blue;margin:20px;"></div>
</body>
复制代码
```

我们利用BFC渲染规则第2点（属于同一个BFC的两个相邻块级元素的margin会发生重叠），那么**不属于**同一个BFC的两个相邻块级元素的margin就**不会发生**重叠。

那么我们在第二个div元素用一个div元素包裹起来，并用`overflow:auto`触发其BFC。再看一下效果是不是不重叠了。

```js
<body>
    <div style="width:100px;height:100px;background:red;margin:20px;"></div>
    <div style="overflow:auto">
        <div style="width:100px;height:100px;background:blue;margin:20px;"></div>
    </div>
</body>
复制代码
```



![img](https://user-gold-cdn.xitu.io/2020/4/30/171c90fd4aa2b022?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



2.清除浮动的问题

除了用`clear:both`来清除浮动，我们也可以根据BFC的渲染规则（计算BFC容器的高度时，浮动元素也参与计算）来清除浮动，解决高度坍塌的问题。

3.实现自适应两栏布局（利用渲染规则：BFC的区域不会与浮动元素重叠）



# 层叠上下文

## 如何产生层叠上下文

其实，层叠上下文也基本上是有一些特定的CSS属性创建的，一般有3种方法：

1. `HTML`中的根元素`<html></html>`本身就具有层叠上下文，称为“根层叠上下文”。
2. 普通元素设置`position`属性为**非**`static`值并设置`z-index`属性为具体数值，产生层叠上下文。
3. CSS3中的新属性也可以产生层叠上下文：
   - `flex`
   - `transform`
   - `opacity`
   - `filter`
   - `will-change`
   - `-webkit-overflow-scrolling

## 层叠等级（层叠上下文在z轴上的排序）

![image-20201117114924040](https://i.loli.net/2020/11/17/lhuZyTC8zgdA9Xm.png)





# 居中对齐

## 水平居中

flex或者absolute+translate

text-align（行内元素）

margin：0 auto（块级元素）

## 竖直居中

flex或者absolute+translate

display：table-cell

ligin-height=height

## 水平垂直居中

flex/absolute+transform

其实还有grid，只不过性能和兼容的问题，不太推荐

# 选择器优先级

！important>内联样式>外部样式

外部样式里面：#id>.class>标签选择器>伪类>*通配符>继承>默认

# 清除浮动

去除浮动影响，防止高度塌陷：

1.通过尾部元素：:after/<br />使用clear：both

2.通过BFC

3.直接规定父元素的高度

# 动画

- [ ] 过渡动画：transition

- transition-duration：间隔
- transition-delay：延迟

- [ ] keyframs+animation

- animation-name:动画名称

- animation-delay：延迟

- animation-duration：间隔












