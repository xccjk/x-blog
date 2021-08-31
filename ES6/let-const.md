# ES6之let和const

## var

- es6之前通过var声明变量，会出现变量提升的情况出现
- 通过var声明的变量会绑定到全局的window上

```
  // 代码1
  if(true) {
    var a = 10
  }
  console.log(a)  // 10
  等价于
  var a = undefined
  if(true) {
    a = 10
  }
  console.log(a)
```

```
  // 代码2
  if(false) {
    var b = 20
  }
  console.log(b)  // undefined
  等价于
  var b = undefined
  if(true) {
    b = 10
  }
  console.log(b)
```

```
  // 代码3
  var a = 10
  console.log(window.a) // 10
```

## 块级作用域

- 没有作用域的提升
- 无法重复声明
- 无法在定义前使用
- 不会绑定到全局window
- let声明的变量可以进行修改，const声明的变量不能修改，但是当const声明的为复杂数据结构(obj, array等)的数据时，可以修改内部引用


### let

```
  // 代码4 - const同理
  if(true) {
    let a = 10
  }
  console.log(a)  // a is not defined
```

```
  // 代码5 - const同理
  var a = 10
  let a = 20  // Identifier 'a' has already been declared
```

```
  // 代码6
  console.log(a)  // Identifier 'a' has already been declared
  let a = 10
```

```
  // 代码7 - const同理
  let a = 10
  console.log(window.a) // undefined
```

```
  // 代码8 - const同理
  let a = 10
  a = 20
  console.log(a)  // 20
```

### const

- const用来声明常量时，值不可以被修改，值类型为number,string,boolen,undefined,null...
- const声明不允许修改绑定，但是允许修改值，值类型object,array...

```
  // 代码9
  const a = 10
  a = 20  // Identifier 'a' has already been declared
```

```
  // 代码10
  const a = []
  a.push(1)
  console.log(a)  // [1]

  const obj = { a: 1 }
  obj.a = 2
  console.log(obj)  // { a: 2 }
```


### 临时性死区

- 临时死区(Temporal Dead Zone), 简称TDZ
- 通过let和const声明的变量，会产生一个块级作用域，变量不会被提升到作用域顶部，在声明之前就访问变量，会导致报错
- 原因：JavaScript引擎在扫描到变量声明时，要么将变量提升到作用域顶部，要不就会将声明放在TDZ中，访问TDZ中的变量会导致运行错误，只有执行过变量声明语句，变量才会从TDZ中移除

```
  // 代码11
  var a = 10

  {
    console.log(a)  // Cannot access 'a' before initialization
    
    let a = 20
  }

  var a = 10

  {
    console.log(a)  // 10
    
    var a = 20
  }
```

```
  // 代码12
  var a = 10
  (function() {
    console.log(a)  // a is not defined
    const a = 20
  })()
```

### 循环中的作用域

- for循环语句中，()层为一层作用域，{}层为一层作用域
- for..in循环中，每次迭代不会修改已有绑定，而是会生成一个新的绑定(代码21)

```
  // 代码13
  var a = []
  for(var i = 0; i < 10; i++) {
    a[i] = function() {
      console.log(i)  
    }
  }
  a[0]()  // 10
  a[1]()  // 10
```

```
  // 代码14
  var a = []
  for(var i = 0; i < 10; i++) {
    a[i] = (function(i) {
      return function() {
        console.log(i)
      }
    }(i))
  }
  a[0]()  // 0
  a[1]()  // 1
```

```
  // 代码15
  var a = []
  for(let i = 0; i < 10; i++) {
    a[i] = function() {
      console.log(i)  
    }
  }
  a[0]()  // 0
  a[1]()  // 1
```

```
  // 代码16
  for(let i = 0; i < 10; i++) {
    let i = 'a'
    console.log(i)  // a ... a
  }
```

```
  // 代码17
  for(var i = 0; i < 10; i++) {
    let i = 'a'
    console.log(i)  // a ... a
  }
```

```
  // 代码18
  // console出一个值后就终止了
  for(var i = 0; i < 10; i++) {
    var i = 'a'
    console.log(i)  // a
  }
  等价于
  var i = 0
  for(i < 10; i++) {
    i = 'a'
    console.log(a)
  }
  执行完一次后
  var i = 'a'
  'a'++ => NaN
```

```
  // 代码19
  // 变量重复定义
  for(const i = 0; i < 10; i++) {
    console.log(i)  // Assignment to constant variable.
  }
```

```
  // 代码20
  const a = [], obj = { a: 1, b: 2, c: 3 }
  for(var key in object) {
    a.push(function() {
      console.log(key)
    })
  }
  a[0]()  // c
```

```
  // 代码21
  var a = [], obj = { a: 1, b: 2, c: 3 }
  for(let key in obj) {
    a.push(function() {
      console.log(key)
    })
  }
  a[0]()  // a
```

```
  // 代码22
  var a = [], obj = { a: 1, b: 2, c: 3 }
  for(const key in obj) {
    a.push(function() {
      console.log(key)
    })
  }
  a[0]()  // a
```