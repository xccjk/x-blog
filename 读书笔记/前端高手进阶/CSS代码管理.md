# css代码管理

- 现状：现阶段web标准提倡结构，样式，行为分离，通常css文件会独立为一个文件，怎么更好的组织分类提高复用与代码编辑

## 常见的几种样式文件组织方式

1. css文件与组件，页面放同一个文件夹，类似antd组件库的组织方式
2. css文件放在一个统一的文件夹内，组件，页面中通过import的方式引入

## 如何避免样式冲突

- 场景：平时使用框架开发的过程中，经常会遇到这个问题，pageA页面定义了类名layout-header，pageB页面也定义了同样的类名，会发现样式之间相互有影响
- 解决方案
  - 1. 为每个页面设置不同的父级类名，类似：.pagea .layout-header与.pageb .layout-header
    - 问题：不同开发人员也可能设置了相同的父级类名，没有代码检测手段可以检测出命名重复的问题
  - 2. CSS Modules
    - 问题：通过CSS Modules设置后，类名会被编译为一个随机名称，但是这样会导致在想覆盖样式时，不知道该改哪个元素

```javascript
  // pageA
  import './a.css'
  <div className='layout-header'>pageA</div>

  // a.css
  .layout-header {
    color: 'red'
  }

  // pageB
  import './b.css'
  <div className='layout-header'>pageB</div>

  // b.css
  .layout-header {
    margin: 10px
  }
```

```javascript
  // 方案一实现
  <div class='pageA'>
    <h4 class='text'>pageA</h4>
  </div>

  <div class='pageB'>
    <h4 class='text'>pageB</h4>
  </div>
```

```javascript
  // 方案二实现
  // style.css
  .text {
    color: 'red'
  }

  import styles from './style.css'
  <div class={styles.text}>方案2</div>

  // 编译之后的结果
  <div class="_3zyde4l1yATCOkgn-DBWEL"></div>
  <style>
  ._3zyde4l1yATCOkgn-DBWEL {
    color: 'red';
  }
  </style>
```

## 怎么高效复用样式

- 我们现在常用的解决方案：把公司内部的主题色，字体大小，样式，边距大小，圆角，字体类型等常用的样式，在与设计沟通好后，定义为一个变量然后导出

```javascript
  // 伪代码
  // styles/index.js
  const export FONT_24 = 24
  const export COLOR_DARK = '#ccc'
  ...
  ...

  // index.js
  import './styles'
  .text {
    font-size: FONT_24
  }
```
