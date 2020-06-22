const str = console.log`hello world`  // ['hello world']

const name = 'abc'
const gender = true

function myTagFunc (strings, name, gender) {
  console.log(strings)  // [ 'hey, ', ' is a ', '' ]
  return strings[0] + name + strings[1] + gender + strings[2]
}

const result = myTagFunc`hey, ${name} is a ${gender}`
console.log(result) // hey, abc is a true


const message = 'Error: foo is not defined.'
console.log(
  message.startsWith('Error')
)

// 展开数组
// apply()方法
const arr = [1, 2, 3]
console.log.apply(console, arr) // 1, 2, 3

// es6 ...展开操作符
console.log(...arr) // 1, 2, 3

function foo(a) {
  console.log(a)
}

const _foo = a => console.log(a)

foo(2)  // 2
_foo(2) // 2


// 箭头函数与this
const person = {
  name: 'abc',
  func: function() {
    console.log(this.name)
  },
  // 在箭头函数中没有this的机制，也不会改变this的指向。箭头函数外面拿到的this是什么，在里面拿到的就是什么 
  _func: () => {
    // 箭头函数拿到的是person外面的一层this啊
    console.log(this.name)
  },
  funcAsync: function() {
    // 普通函数在setTimeout里面时，会放在全局对象上被调用
    setTimeout(function() {
      console.log(this.name)
    }, 1000)
  },
  _funcAsync: function() {
    // axios 中this指向
    const _this = this
    setTimeout(function() {
      console.log(_this.name)
    }, 1000)
  },
  // 箭头函数中，this指向的始终是当前作用域里面的this
  __funcAsync: function() {
    // 箭头函数拿到的是我这一层的this
    setTimeout(() => {
      console.log(this.name)
    }, 1000)
  }
}

person.func()   // 'abc'
person._func()  // undefined
person.funcAsync()  // undefined
person._funcAsync() // abc
person.__funcAsync()  // abc


// 对象字面量增强
const age = 20
const obj = {
  age,
  name: 123,
  // 实际等价于function，this指向和function函数相同
  func() {
    console.log(this.name)
  },
  // error
  // Math.random(): 123
  // 计算属性名
  [Math.random()]: 123
}
// 使用表达式的返回值作为对象的属性值
obj[Math.random()] = 123

obj.func()


// 对象扩展方法 Object.assign

const obj1 = {
  a: 1,
  b: 2
}

const obj2 = {
  a: 2,
  c: 1
}

const obj3 = Object.assign(obj2, obj1)

console.log(obj3) // { a: 1, c: 1, b: 2 }


function func1(obj) {
  // 实际修改了obj4的对象
  obj.name = '123'
  // 对象拷贝一次，不影响原来的对象(浅拷贝)
  const _obj = Object.assign({}, obj)
  _obj.age = 30
  return _obj
}

const obj4 = {name: 'abc', age: 20}

const obj5 = func1(obj4)

console.log(obj4, obj5) // { name: '123', age: 20 } { name: '123', age: 30 }



// Object.is()

console.log(0 == false)             // true
console.log(0 === false)            // false
console.log(+0 === -0)              // true
console.log(NaN === NaN)            // false
console.log(Object.is(+0, -0))      // false
console.log(Object.is(NaN, NaN))    // true


// proxy

const obj6 = {
  name: 'abc',
  age: 20
}

// 第一个参数 - 代理对象
// 第二个参数 - 代理处理对象
const objProxy = new Proxy(obj6, {
  // 监视属性访问
  // 第一个参数 - 代理对象
  // 第二个参数 - 外部访问的属性名  
  get(target, property) {
    console.log(target, property) // { name: 'abc', age: 20 } 'name'
    // 返回值为外部范文返回的结果
    // return 100
    return property in target ? target[property] : 'default'
  },
  // 监视设置属性的过程
  // 第一个参数 - 代理对象
  // 第二个参数 - 属性名
  // 第三个参数 - 属性值
  set(target, property, value) {
    // 数据校验
    if(property === 'age') {
      if(!Number.isInteger(value)) {
        throw new TypeError(`${value} is not an int`)
      }
    }
    console.log(target, property, value)
    target[property] = value
  },
  // 第一个参数 - 代理对象
  // 第二个参数 - 属性名
  deleteProperty(target, property) {
    console.log(target, property)
  }
})

objProxy.gender === true
delete obj6.age

console.log(objProxy.name)  // abc
console.log(objProxy.title) // 'default'
console.log(obj6) // { name: 'abc' }


const list = []

const listProxy = new Proxy(list, {
  set(target, property, value) {
    console.log(target, property, value)  // [] '0' 100
    target[property] = value
    return true
  }
})

listProxy.push(100) // [ 100 ] 'length' 1


// class 类
class Person {
  constructor(name) {
    this.name = name
  }
  say() {
    console.log(`hi, ${this.name}`)
  }
  // // 静态方法
  static create(name) {
    return new Person(name)
  }
}

const p = Person.create('abc')
p.say() // hi, abc



// 类的继承
class Student extends Person {
  constructor(name, number) {
    super(name)
    this.number = number
  }

  hello() {
    super.say()
    console.log(this.number)
  }
}

const s = new Student('abc', '100')
s.hello() // hi, abc 100


// Set()
const s1 = new Set()

s1.add(1).add(2).add(3)

console.log(s1) // Set { 1, 2, 3 }

s1.forEach(i => console.log(i)) // 1, 2, 3

for(let i of s1) {
  console.log(i)  // 1, 2, 3
}

// 获取set长度
console.log(s1.size)  // 3

// 是否包含某个值
console.log(s1.has(2))  // true
console.log(s1.has(5))  // false

// 删除某个值
console.log(s1.delete(2)) // true
console.log(s1.delete(5)) // false

// 清楚集合全部内容
s1.clear()

const arr1 = [1, 2, 3, 1, 4, 1]

const _arr1 = new Set(arr1)

console.log(_arr1)  // Set { 1, 2, 3, 4 }

const arr2 = [1, 2, 3, 1, 4, 1]

const _arr2 = Array.from(new Set(arr2))

console.log(_arr2)  // [ 1, 2, 3, 4 ]

const arr3 = [1, 2, 3, 1, 4, 1]

const _arr3 = [...new Set(arr3)]

console.log(_arr3)  // [ 1, 2, 3, 4 ]


// Map数据结构 - 严格意思上的键值对集合，用来映射两个任意类型数据的对应关系

const obj7 = {}
obj7[true] = 'value'
obj7[123] = 'value'
obj7[{a: 1}] = 'value'

// 键值都会转为字符串 - 会存在问题
console.log(Object.keys(obj7))  // [ '123', 'true', '[object Object]' ]

console.log(obj7[{}]) // value

console.log(obj7['[object Object]'])  // value


const m = new Map()

const t = {name: 'abc'}

m.set(t, 90)

console.log(m)  // Map { { name: 'abc' } => 90 }

console.log(m.get(t)) // 90

// 判断键是否存在
console.log(m.has(t)) // true

// 删除某个键
console.log(m.delete(t))  // true

// 清空
m.clear()

// 遍历所有键值
m.forEach((v, k) => {
  console.log(v, k)
})


// Symbol
// 避免对象名重复产生的问题，模拟实现对象的私有成员
// 最主要的作用就是为对象添加独一无二的属性名称
const cache = {}

// a.js
cache['a'] = '123'

// b.js
cache['a'] = '456'

// 键相同的情况会产生问题
console.log(cache)  // { a: '456' }


const s3 = Symbol()
console.log(s3) // Symbol()
console.log(typeof s3)  // symbol

console.log(Symbol() === Symbol())    // false

console.log(Symbol('a'))  // Symbol(a)

console.log(Symbol('b'))  // Symbol(b)

console.log(Symbol('c'))  // Symbol(c)

// 对象的属性可以是两种类型，String和Symbol

const obj8 = {}
obj8[Symbol ()] = '123'
obj8[Symbol()] = '456'

console.log(obj8) // { [Symbol()]: '123', [Symbol()]: '456' }

// a.js
const name1 = Symbol()

const person1 = {
  [name1]: 'abc',
  say() {
    console.log(this[name1])
  }
}

// b.js
person1.say() // abc


// Symbol 补充

// 唯一性
console.log(Symbol('a') === Symbol('a'))  // false

const s4 = Symbol.for('foo')
const s5 = Symbol.for('foo')

console.log(s4 === s5)  // true

// 会自动转为字符串来做比较
console.log(Symbol.for(true) === Symbol.for('true'))  // true

// 内部方法标识
console.log(Symbol.iterator)  // Symbol(Symbol.iterator)
console.log(Symbol.hasInstance) // Symbol(Symbol.hasInstance)


const obj9 = {
  // 内置Symbol常量toStringTag 
  [Symbol.toStringTag]: 'XObject',
  name: 'abc'
}

// toString结果叫做toString标签
console.log(obj9.toString())  // [object XObject]

// for...in无法拿到Symbol类型属性名
for(let key in obj9) {
  console.log(key)  // name
}

// Object.keys获取不到Symbol类型属性名
console.log(Object.keys(obj9))  // [ 'name' ]

// JSON.stringify序列号Symbol类型会被忽略掉
console.log(JSON.stringify(obj9))  // {"name":"abc"}

// 获取Symbol类型属性名
console.log(Object.getOwnPropertySymbols(obj9)) // [ Symbol(Symbol.toStringTag) ]



// for...of循环

// for循环适用遍历普通数组

// for...in循环使用遍历键值对

// 遍历方式存在局限性

// for...of方法会作为遍历所有数据结构的统一方式

const arr4 = [1, 2, 3, 4]

// 直接返回值
// 可以使用break关键词终止循环
for(let item of arr4) {
  console.log(item) // 1, 2, 3, 4
  if(item > 3) {
    break
  }
}

// arr.forEach()  // 不能跳出循环
// arr.some() // 返回true可以终止循环
// arr.every()  // 返回false可以终止循环

const s6 = new Set([1, 3])

for(const item of s6) {
  console.log(item) // 1, 3
}

const s7 = new Map()
s7.set('name', 'abc')

for(const item of s7) {
  // 返回当前遍历的键和值
  console.log(item) // [ 'name', 'abc' ]
}

for(const [key, value] of s7) {
  // 返回当前遍历的键和值
  console.log(key, value) // name abc
}

const obj10 = {a: 1, b: 2}

// object数据结构无法遍历
for(const item of obj10) {
  console.log(item) // obj10 is not iterable
}