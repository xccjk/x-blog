# **什么是作用域**

作用域指的是代码当前的上下文环境
作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性，作用域决定了代码区块中变量和其他资源的可见性

## 作用域的用处

作用域是一个独立的运行环境，作用域是用来隔离变量

## 作用域的分类

### 全局作用域

1. 在代码中任何地方都可以直接访问到的对象拥有全局作用域
2. 最外层变量，函数，所有未定义直接赋值的变量，window对象的属性都拥有全局作用域
3. 缺点：污染全局命名空间，任意引起命名冲突，一般的三方包都会把代码定义在(function(){...})()

```javascript
  // 最外层变量
  var a = 10
  function some() {

  }
  // 为定义直接赋值的变量
  function func() {
    a = 10
    var b = 20
  }
  console.log(a)  // 10
  console.log(b)  // b is not defined
  // window对象属性
  console.log(window.name)
  // 全局声明可能导致的问题
  // a 同学
  var a = 10
  // b 同学
  a = 20
```

### 函数作用域

1. 是指声明在函数内部的变量，一般只在固定的代码片段中可访问到
2. 作用域是分层的，内存作用域可以访问外层作用域的变量，直到window
3. 块语句不会创建一个新的作用域，比如if，for，while，switch

```javascript
  // 函数作用域
  function func() {
    var a = 10
    function func1() {
      console.log(a)
    }
    func1() // 10
  }
  console.log(a) // a is not defined
  func1() // 报错
  // 作用域的分层效果
  function foo(a) {
    var b = a * 2
    function bar(c) {
      console.log(a, b, c)
    }
    bar(b * 3)
  }
  foo(2)  // 2, 4, 12
  // if(true) {
    var a = 10
  }
  console.log(a)  // 10
```

### 块级作用域

1. 通过let和const声明，所声明的变量在指定块的作用域外无法被访问
2. 创建方式：在函数内部，在代码块内部({})
3. 特点：声明变量不会提升到代码块顶部，禁止重复声明

```javascript
  // 在代码块中创建
  if(status) {
    let a = 10
  } else {
    console.log(a)  // a is not defined
  }
  // 变量不会提升到顶部
  console.log(a)  // a is not defined
  let a = 10
  const b = 20
  console.log(c)  // 30
  var c = 30
  // 禁止重复声明
  const a = 10
  const a = 20 // Identifier 'a' has already been declared
```

## 循环中块级作用域的使用

```javascript
  // 循环中var声明变量
  const data = [] 
  for(var i = 0; i < 5; i++) {
    data[i] = function() {
      // 函数内部的i指向的全局变量i
      console.log(i)
    }
  }
  data[2]() // 5
  data[4]() // 5
  // 通过闭包解决上面问题
  const data = [] 
  for(var i = 0; i < 5; i++) {
    data[i] = (function() {
      // 通过函数作用域解决全局作用域带来的影响
      console.log(i)
    })(i)
  }
  data[2]() // 2
  data[4]() // 4
  // 通过块级作用域解决问题
  const data = [] 
  for(let i = 0; i < 5; i++) {
    data[i] = function() {
      // 变量i只能在块级内部访问
      console.log(i)
    }
  }
  data[2]() // 2
  data[4]() // 4
```

### for循环中的两层嵌套作用域 - 循环体中是内层独立作用域，外层为for循环本身的作用域

```javascript
  for(var i = 0; i < 3; i++) {
    // 内部局部变量
    let i = '123'
    console.log(i)
  }
  // 123
  // 123
  // 123
```
