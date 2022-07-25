## src与href的区别

### 定义

#### href

href是`Hypertext Reference`的简写，表示超文本引用，指向网络资源所在位置

常见场景：

```html
<a href="www.xxx.com"></a>
<link type="text/css" rel="stylesheet" href="a.css" >
```

#### src

src是`source`的缩写，目的是**下载资源到页面**

常见场景：

```html
<img src="a.png" />
<script src="a.js"></script>
<iframe src="a.html" />
```

### 浏览器解析方式

1. 浏览器遇到href会并行下载资源而不会停止对当前文档的处理。（建议使用link的方式加载css而不是@import方式加载）
2. 浏览器遇到src时，会停止对其它资源的加载和执行，直到该资源加载与执行完毕。（这也是为什么script标签放在底部而不是头部的原因）

### 总结

1. href用于在当前文档和引用资源之间确立联系
2. src用于替换当前内容