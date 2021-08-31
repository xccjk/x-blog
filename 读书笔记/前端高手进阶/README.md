# 前端高手进阶

## 前端护城河

### 如何破局

1. 建立合理的知识结构
   1. 合理的知识结构知识框架的可扩展性，同时也指每个知识点的完备性
2. 培养可复用的工作能力
   1. 探究能力，深度探究技术背后的原理，并且能结合实践灵活运用
   2. 解构能力，能够分析和分解复杂问题
   3. 归纳能力，建立知识点之间的类型

## HTML标签

### meta标签，自动刷新/跳转

```javascript
  <meta http-equiv="Refresh" content="5; URL=page2.html">
```

### script标签

1. async属性
   1. 立即请求文件，不阻止渲染引擎，而是文件加载完毕后阻塞渲染引擎并立即执行文件内容
2. defer属性
   1. 立即请求文件，但不阻塞渲染引擎，等到解析完 HTML 之后再执行文件内容
3. HTML标准type属性
   1. 对应值为“module”。让浏览器按照 ECMA Script 6 标准将文件当作模块进行解析，默认阻塞效果同 defer，也可以配合 async 在请求完成后立即执行

### link标签

1. dns-prefetch属性
   1. 当 link 标签的 rel 属性值为“dns-prefetch”时，浏览器会对某个域名预先进行 DNS 解析并缓存。这样，当浏览器在请求同域名资源的时候，能省去从域名查询 IP 的过程，从而减少时间损耗
2. preconnect属性
   1. 让浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作，这包括 DNS 解析、TLS 协商、TCP 握手，通过消除往返延迟来为用户节省时间
3. prefetch/preload属性
   1. 两个值都是让浏览器预先下载并缓存某个资源，但不同的是，prefetch 可能会在浏览器忙时被忽略，而 preload 则是一定会被预先下载
4. prerender属性
   1. 浏览器不仅会加载资源，还会解析执行页面，进行预渲染

### 搜索优化

- 有时候也要考虑更方便其他程序（如搜索引擎）理解。合理地使用 meta 标签和 link 标签，恰好能让搜索引擎更好地理解和收录我们的页面

```javascript
  <meta content="拉勾,拉勾网,拉勾招聘,拉钩, 拉钩网 ,互联网招聘,拉勾互联网招聘, 移动互联网招聘, 垂直互联网招聘, 微信招聘, 微博招聘, 拉勾官网, 拉勾百科,跳槽, 高薪职位, 互联网圈子, IT招聘, 职场招聘, 猎头招聘,O2O招聘, LBS招聘, 社交招聘, 校园招聘, 校招,社会招聘,社招" name="keywords">
```

- 搜索指数查看
  - https://trends.google.com/trends
  - https://data.chinaz.com/keyword/

### link标签，减少重复

### OGP（开放图表协议）

- 目的是通过增加文档信息来提升社交网页在被分享时的预览效果。你只需要在一些分享页面中添加一些 meta 标签及属性，支持 OGP 协议的社交网站就会在解析页面时生成丰富的预览信息，比如站点名称、网页作者、预览图片。具体预览效果会因各个网站而有所变化

## 如何高效操作DOM元素

### 什么是DOM

- DOM，文档对象模型，比如下面的前端功能
  - 动态渲染列表，表格表单数据
  - 监听点击，提交事件
  - 懒加载脚本或样式文件
  - 实现动态展开树组件，表单级联等复杂操作
- DOM组成
  - DOM节点
    - 标签是HTML的基本单位
    - 节点是DOM树的基本单位，有多种类型，比如注释节点，文本节点
    - 元素是节点的一种，与HTML标签相对应
    - `<p>xcc</p>`
      - p是标签，生成DOM树时会产生两个节点，一个是元素节点p，一个是文本节点xcc
  - DOM事件
  - 选择区域
    - 一般用于富文本编辑类业务

### 为什么说DOM操作耗时

#### 浏览器的工作原理

- 浏览器包含渲染引擎+JavaScript引擎，两者都是单线程的方式运行，单线程优势为开发方便，避免多线程下死锁，竞争，缺点为失去了并发能力
- 浏览器为了避免两个引擎同时修改一个内容造成渲染结果不一致的情况，增加了一个机制，及两个引擎具有互斥性，在某个时刻只会有一个引擎在运行，另外一个在阻塞状态。操作系统在进行线程切换时，需要先保存上一个线程的状态信息然后去读取下一个线程的状态信息，俗称`上下文切换`，这个操作会比较耗时
- 每次DOM切换就会引发线程的上下文切换，及从JavaScript引擎切换到渲染引擎并执行对应操作，然后继续切换回JavaScript引擎，这样就会带来性能损耗

```javascript
   // 案例
   // 当数组长度比较长时，会比较耗时
   const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   console.time('xcc')
   let body = document.body
   data.map(li => {
      body.appendChild(<p>{li}</p>)
   })
   console.timeEnd('xcc')

   // good
   const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   console.time('xcc')
   let body = document.body
   let str = ''
   data.map(li => {
      str += <p>{li}</p>
   })
   body.appendChild(str)
   console.timeEnd('xcc')
```

#### 重新渲染

- 元素已经样式变化时会引起再次渲染，在渲染过程中最耗时的步骤为`重排(Reflow)`与`重绘(Repaint)`
- 浏览器渲染页面时会将HTML和CSS解析为DOM和CSSOM，然后进行排布
  - 如果在操作DOM时，对元素，样式进行了修改，会引起渲染引擎的重新计算样式生成CSSOM树，可能会触发对元素的重新排布和重新绘制
- `重排一定会引起重绘，但是重绘不会导致重排`

- 可能会影响带其他元素排布的操作就会引起重排，继而引发重绘
  - 修改元素边距，大小
  - 添加，删除元素
  - 改变窗口大小
- 会引起重绘的操作
  - 设置背景图片
  - 修改字体颜色
  - 改变visibility属性值

### 如何高效操作DOM

#### 循环外操作元素

```javascript
   // bad
   const len = 1000
   console.time('bad')
   for(let i = 0; i < len; i++) {
      document.body === 1 ? console.log(i) : null
   }
   console.timeEnd('bad')

   // good
   const len = 1000
   console.time('good')
   const body = JSON.stringify(document.body)
   for(let i = 0; i < len; i++) {
      body === 1 ? console.log(i) : null
   }
   console.timeEnd('good')
```

#### 批量操作元素

- 场景：在ul下创建1000个li
  - bad: 在循环中创建元素，直接往父元素中添加
  - good: 在循环中创建元素，拼接为一个字符串，在循环外添加到父元素

```javascript
   // bad
   console.time('bad')
   const ul = document.createElement('ul')
   for(let i = 0; i < 1000; i++) {
      ul.appendChild(<li>{i}</li>)
   }
   console.timeEnd('bad')

   // good
   console.time('good')
   const ul = document.createElement('ul')
   let str = ''
   for(let i = 0; i < 1000; i++) {
      str += `<li>{i}</li>`
   }
   ul.appendChild(str)
   console.timeEnd('good')
```

#### 缓存元素集合

- 对上面创建的1000个元素进行修改，使用选择器获取元素时，缓存获取元素的方法

```javascript
   // bad
   for(let i = 0; i < document.querySelectorAll('div').length; i++) {
      document.querySelectorAll(`div`)[i].innerText = i
   }

   // good
   const divs = document.querySelectorAll('div')
   for (let i = 0; i < divs.length; i++) {
      divs[i].innerText = i
   }
```

### 总结

1. DOM渲染流程
2. DOM耗时元素
3. 常见解决渲染耗时的方法

#### 其他提升渲染性能的方式

- 尽量`不要使用复杂的匹配规则和复杂的样式`，从而减少渲染引擎计算样式规则生成CSSOM树的时间
- 尽量减少重排和重绘的影响区域
- 使用CSS3特性来实现动画效果
