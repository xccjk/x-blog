# JavaScript中let是否有变量提升

## 现象

var声明中：

```javascript
console.log(a)	// undefined
var a = 1
```

let声明中：

```javascript
console.log(a)	// Uncaught ReferenceError: a is not defined
let a = 1
```

这样看来，是不是只是var声明产生了变量提升，而let不会产生变量提升呢？

```javascript
var a = 1
(function() {
  console.log(a)	// 1
}())
```

在一个匿名函数中，首先会现在匿名函数中寻找a变量，匿名函数中没有找到时，会沿着作用域链，找到父级作用域，然后在父级作用域中找a变量

```javascript
var a = 1
(function() {
  console.log(a)	// Uncaught ReferenceError: Cannot access 'a' before initialization
  let a = 1
}())
```

按理说，如果let不存在变量提升，那么a的值应该为1。报错说明出现了提升现象，只是在变量赋值前不能对变量进行读写，否则会报错，这个也就是let和const的暂时性死区



## 原因

js代码在编译时，创建执行上下文，像var、functions声明的变量，会存储在「变量环境」中，let与const放在「词法环境」中。let初始状态为**unitialized**，var放在变量环境中，初始值是**undefined**。undefined状态是可以读取的，而unitialized状态的变量在读取的时候会抛出异常