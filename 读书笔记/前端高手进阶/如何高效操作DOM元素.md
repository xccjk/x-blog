# 如何高效操作DOM元素

## 什么是DOM

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

## 为什么说DOM操作耗时

### 浏览器的工作原理

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

### 重新渲染

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

## 如何高效操作DOM

### 循环外操作元素

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

### 批量操作元素

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

### 缓存元素集合

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
