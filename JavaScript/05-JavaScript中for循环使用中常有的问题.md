# JavaScript中for循环使用中常有的问题

for循环的执行顺序：设置循环变量 -> 循环判断 -> 满足执行循环体 -> 循环变量自增

通过let声明的循环变量，在整个for循环中let i只声明了一次，但产生了三个块级作用域，生成了块级作用域，每次循环的i都是独立的一份。

第二次循环的i是怎么知道上一个块级作用域中的i的？

JavaScript引擎内部会记住上一轮的循环的值，初始化本轮变量时，就在上一轮的基础上进行计算

引用类型值参加for循环时，块级作用域实际保存的是变量的引用地址，指向的都是同一个堆内存中的数据

```javascript
  const data = []
  for(var i = 0; i < 3; i++) {
    data[i] = function() {
      console.log(i)
    }
  }

  data[0]() // 3
  data[1]() // 3
```

```javascript
  const data = []
  for(var i = 0; i < 3; i++) {
    data[i] = (function() {
      console.log(i)
    })(i)
  }

  data[0] // 0, 1, 2
```

```javascript
  let i = 0, data = []
  if(0 < 3) {
    data[0] = function() {
      console.log(i)
    }
  }

  i++

  if(1 < 3) {
    data[1] = function() {
      console.log(i)
    }
  }

  i++

  if(2 < 3) {
    data[2] = function() {
      console.log(i)
    }
  }

  i++

  data[0]() // 3
  data[1]() // 3
```

```javascript
  let i = 0, data = []
  if(0 < 3) {
    let k = i
    data[0] = function() {
      console.log(k)
    }
  }

  i++

  if(1 < 3) {
    let k = i
    data[1] = function() {
      console.log(k)
    }
  }

  i++

  if(2 < 3) {
    let k = i
    data[2] = function() {
      console.log(k)
    }
  }

  i++

  data[0]() // 0
  data[1]() // 1
```

```javascript
  const data = []
  for(let i = 0; i < 3; i++) {
    data[i] = function() {
      console.log(i)
    }
  }

  data[0]() // 0
  data[1]() // 1
```

```javascript
  const data = []
  for(let i = 0; i < 3; i++) {
    data[i] = function() {
      console.log(i)
    }
  }

  data[0]() // 0
  data[1]() // 1
```

```javascript
  // 引用类型值参加for循环时，块级作用域实际保存的是变量的引用地址，指向的都是同一个堆内存中的数据
  const data = []
  for(let x = {i: 0}; x.i < 3; x.i++) {
    data[x.i] = function() {
      console.log(x.i)
    }
  }

  data[0]() // 3
  data[1]() // 3
```

```javascript
  let x = {i: 0}, data = []
  if(0 < 3) {
    let k = x
    data[k.i] = function() {
      console.log(k.i)
    }
  }

  x.i++

  if(1 < 3) {
    let k = x
    data[k.i] = function() {
      console.log(k.i)
    }
  }

  x.i++

  if(2 < 3) {
    let k = x
    data[k.i] = function() {
      console.log(k.i)
    }
  }

  x.i++

  data[0]() // 3
  data[1]() // 3
```

```javascript
  const data = []
  let x = {i: 0}
  for(let y = x.i; y < 3; y++) {
    data[y] = function() {
      console.log(y)
    }
  }

  data[0]() // 0
  data[1]() // 1
```

参考文档 [地址](https://www.cnblogs.com/echolun/p/10584703.html)