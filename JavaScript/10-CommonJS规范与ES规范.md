# CommonJS规范与ES规范

## CommonJS规范与ES规范差异

1. CommonJS规范是一个值的拷贝，ES6输出的是一个值的引用

```javascript
  // CommonJS
  // a.js
  let num1 = 1
  let num2 = 5

  const add = function () {
    num1 = num1 * num2
    return 
  }

  module.exports = {
    num1,
    num2,
    add
  }
  // b.js
  const { num1, num2, add } = require('./a')

  add && add()

  console.log(num1, num2) // 1 5
```

```javascript
  // ES6
  // a.js
  let num1 = 1
  let num2 = 5

  const add = function () {
    num1 = num1 * num2
    return 
  }
  export {
    num1,
    num2,
    add
  }
  // b.js
  import { num1, num2, add } from './a'
  add && add()
  console.log(num1, num2) // 5 5
```

2. CommonJS是运行时加载，ES6是编译时加载

- 运行时加载：CommonJS模块就是对象，运行程序时先把所有的模块解析，使用时再读取
- 编译时加载：ES6模块不是对象，而是通过export显式输出指定代码，import时采用静态命令的形式

```javascript
  // CommonJS
  // a.js
  let num1 = 1
  let num2 = 5

  const add = function () {
    num1 = num1 * num2
    throw new Error('error')
  }

  module.exports = {
    num1,
    num2,
    add
  }
  // b.js
  const { num1, num2, add } = require('./a')

  add && add()

  console.log(num1, num2)

  node b.js // error
```

```javascript
  // ES6
  // a.js
  let num1 = 1
  let num2 = 5

  const add = function () {
    num1 = num1 * num2
    throw new Error('error')
  }

  module.exports = {
    num1,
    num2,
    add
  }
  // b.js
  import { num1, num2, add } from './a'

  const handleClick() {
    add && add()
    console.log(num1, num2) // error
  }
```
