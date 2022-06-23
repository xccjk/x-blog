# 要node支持import等新语法，看这里你就都明白了

## 现状

大家在编写node相关代码时，肯定遇到过下面的问题

```javascript
  // a.js
  import fs from 'fs'
  ...

  // bash
  node a.js
```

在你没有做过任何处理的情况下，肯定会出现一个挺傻的错误

<image src="./image/02.png" width="500" />

看到这里，你肯定会想，大清都亡了，在node中还不能使用import等新语法嘛。

- 那么不支持import语法的根本原因是什么呢？

**两者采用的模块化规范不一样**，nodejs采用的是CommonJS的模块化规范，使用require引入模块；而import是ES6的模块化规范关键字

## 解决方案

### 方法1

是谁说node不支持import等语法的，其实在node后面的版本中，已经出现了支持node import语法的提案，只是还没完全开始使用，那么，应该怎么使用呢？

```javascript
  // a.mjs
  import fs from 'fs'
  ...

  // bash
  node --experimental-modules a.mjs
```

当你这样运行代码时，恩，你会 发现居然没有抛出上面的错误，你是否发现了重点内容：**文件扩展名要为mjs**和**node运行时需要加--experimental-modules参数**

[node官方对import支持文档](https://nodejs.org/dist/latest-v10.x/docs/api/esm.html)

<image src="./image/3.jpg" width="500" />

但是，改文件扩展名是不是有点怪怪的...而且当文件多的时候，我难道需要一个个的迁移改掉嘛，我只是想使用一下新语法就要搞得这么麻烦。那么，有没有什么可以不用改变原来的代码，新的也可以用。这个时候，你就需要用到babel

### 方法2

一听到babel，我就想到了使用webpack的痛苦感受。babel版本间api不一致，配置复杂是不可回首的往事。但是抵挡不住它香啊...

不逼逼了，我先说结果，在这里使用babel，就是**为了把es6+的新语法转换为node可以识别的语法**

在老版本中，我们一般采用**babel-preset-es2015**来做转换工作

```javascript
  // babel-preset-es2015配置方式
  yarn add babel-preset-es2015 -D
  // .babelrc
  {
    "parsets": ["es2015"]
  }
```

后来，随着每年新的es语法的出现，有要对新的语法做适配。恩，后面就出现babel-preset-es2016、babel-preset-es2017、babel-preset-es2018...，是不是感觉没完没了了

强迫症的人都受不了这样的写法，所以后面，把这些包做成了一个集合**babel-preset-env**

```javascript
  // babel-preset-env配置方式
  yarn add babel-preset-env -D
  // .babelrc
  {
    "parsets": ["env"]
  }
```

[babel-preset-es2015与babel-parser-env的关系及升级指南](https://babeljs.io/docs/en/env/)

在我们进行语法转换时，需要使用babel-node命令来执行包含import/export语法的代码

再后来，随着babel版本的升级,babel对babel-node等相关包做了拆分

babel7.x以前

```javascript
  yarn add babel-cli babel-parser-env -D
```

babel7.x之后

```javascript
  yarn add @babel/cli @babel/core @babel/node @babel/preset-env @babel/plugin-transform-runtime -D
  // .babelrc
  {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      [
        "@babel/plugin-transform-runtime"
      ]
    ]
  }
```

### 方法3

安安心心使用require的模块导入方式，在开发npm包的时候还是好些。node服务之类的还是添加babel相关依赖会更好
