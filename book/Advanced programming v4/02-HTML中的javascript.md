# HTML中的javascript

学习目标：

- 使用`<script>`元素
- 行内脚本与外部脚本的比较
- 文档模式对javascript有什么影响
- 确保javascript不可用时的用户体验

## 2.1 `<script>`元素

> `<script>`元素的八个属性

<br/>

- async: 表示立即下载该脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载
- charset: 使用src属性指定的代码字符集
- crossorigin: 配置相关请求的CORS(跨域资源共享)设置，默认不使用CORS。crossorigin='anonymous'配置文件请求不必设置凭据标准，crossorigin='use-credentials'设置凭据标志，出站请求会包含凭据
- defer: 表示脚本可以延迟到文档被完全解析和显示之后再执行
- integrity: 允许比对接收到的资源和指定的加密签名以验证子资源完整性
- language: 废弃
- src: 包含要执行的代码外部文件
- type: 代替 language，表示代码块中脚本语言的内容类型，值始终都是"text/javascript"

<br/>

> script的使用方式

<br/>

```
// 方式1 - 行内
<script>
  function a() {

  }
</script>
```

```
// 方式2 - 加载外部资源
<script src='a.js'></script>
```

<br/>

> script加载时的特点

<br/>

- 加载资源时会阻塞页面
- **可以加载不同域名的资源**
- 在script中的代码被计算完之前，页面的其它内容不会被加载
- 在解释外部js文件时，页面也会阻塞
- 不管包含的是什么代码，浏览器都会按照`<script>`在页面中出现的顺序依次解释它们，前提是它 们没有使用 defer 和 async 属性

<br/>

> script加载外部域的资源文件的过程

<br/>

<p>浏览器在解析这个资源时，会向 src 属性指定的路径发送一个 GET 请求，以取得相应资源，假定 是一个 JavaScript 文件。这个初始的请求不受浏览器同源策略限制，但返回并被执行的 JavaScript 则受限 制。当然，这个请求仍然受父页面 HTTP/HTTPS 协议的限制</p>

**<p>来自外部域的代码会被当成加载它的页面的一部分来加载和解释</p>**

<br/>

> script加载不同域名的优缺点

- 优点
  - 提供更加强大的能力
- 缺点
  - 安全性
  - 放在别人服务器的资源文件，可能会被别人放入恶意代码


解决方式

`<script>`标签的integrity属性是防范这种问题的一个武器，但这个属性也不是所有 浏览器都支持


<br/>

### 2.1.1 标签位置

过去

<p>script标签放在head标签内</p>

问题：script标签必须加载完了才会渲染后面的内容，会阻塞页面的加载，页面渲染会有明显延迟，此时浏览器窗口完全空白

现在

<p>script会放在页面内容后，先渲染页面再加载资源</p>

<br/>

### 2.1.2 推迟执行脚本

HTML 4.01 为`<script>`元素定义了一个叫 defer 的属性。这个属性表示脚本在执行的时候不会改 变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行

> 延迟加载特点

- defer 属性只对外部脚本文件才有效
- 都会在 DOMContentLoaded 事件之前执行，不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在 DOMContentLoaded 事件之前执行，因此最好只包含一个这样的脚本


<br/>

### 2.1.3 异步执行脚本

- async可以异步加载脚本
- 与 defer 不同的是，标记为 async 的脚本并不保证能按照它们出现的次序执行
- 脚本添加 async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到 该异步脚本下载和执行后再加载其他脚本
- 异步脚本不应该在加载期间修改 DOM


<br/>

### 2.1.4 动态加载脚本

```
// 默认为异步加载，类似添加async属性
// async存在兼容性
let script = document.createElement('script')
script.src = 'a.js'
document.head.appendChild(script)
```

<br/>

### 2.1.5 XHTML中的变化

可扩展超文本标记语言(XHTML，Extensible HyperText Markup Language)是将 HTML 作为 XML 的应用重新包装的结果


<br/>

## 2.2 行内代码与外部代码

虽然可以直接在 HTML 文件中嵌入 JavaScript 代码，但通常认为最佳实践是尽可能将 JavaScript 代 码放在外部文件中

> 使用外部文件的优点

- 可维护性：同一功能只需要维护一个位置
- 缓存：不同页面请求相同资源，只需要加载一次
- 适应未来

<br/>

## 2.3 文档模式

- 使用 doctype 切换文档模式
- 文档模式有两种:混杂 模式(quirks mode)和标准模式(standards mode)


<br/>

## 2.4 noscript元素

针对早期浏览器不支持 JavaScript 的问题，需要一个页面优雅降级的处理方案。<noscript> 元素出现，被用于给不支持 JavaScript 的浏览器提供替代内容

- 浏览器不支持脚本
- 浏览器对脚本的支持被关闭

```
<!DOCTYPE html>
<html>
<head>
  <title>Example HTML Page</title>
  <script defer="defer" src="a.js"></script>
  <script defer="defer" src="b.js"></script>
</head>
<body>
<noscript>
  <p>This page requires a JavaScript-enabled browser.</p> </noscript>
</body>
</html>
```

## 2.5 小结

- 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同 一台服务器上，也可以位于完全不同的域
- 所有`<script>`元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的 情况下，包含在`<script>`元素中的代码必须严格按次序解释
- 对不推迟执行的脚本，浏览器必须解释完位于`<script>`元素中的代码，然后才能继续渲染页面 的剩余部分。为此，通常应该把`<script>`元素放到页面末尾，介于主内容之后及`</body>`标签 之前
- 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出 的次序执行
- 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异 步脚本不能保证按照它们在页面中出现的次序执行
- 通过使用`<noscript>`元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启 用脚本，则`<noscript>`元素中的任何内容都不会被渲染

个人总结：

- 了解script的两种使用方式，行内与加载外部脚本
- 了解script的加载方式，不设置属性时，需要先执行完/下载完脚本，会阻塞页面渲染
- 了解script标签的常用属性，比如用于跨域设置的crossorigin，异步的async，延迟加载的defer
- 了解不支持js脚本的降级兼容方式noscript
- 了解两种文档模式标准模式与混杂模式










