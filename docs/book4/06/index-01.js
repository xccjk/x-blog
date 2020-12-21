class hook {
  constructor() {

  }

  a = () => {
    console.log(1)
  }
}

const obj1 = new hook()
const obj2 = new hook()

console.log(obj1.a())

// 面向对象语音都具有一个特性，都有类的概念，而通过类可以创建任意多个具有相同属性和方法的对象

/**
 * esmascript中没有类的概念
 * ecma-262中把对象定义为：无序属性的集合，属性可以包含基本值，对象或者函数
 * 可以说对象是一组没有特定顺序的值，每个属性和方法独有一个名字，而每个名字都有映射到一个值
 * 可以把ecmascript对象想象为散列表，无非就是一组名值对，其中值可以是数据或者函数
 */

/**
 * object 实例模式创建
 */
var person = new Object()
person.name = 'xcc'
person.age = 27

person.sayName = function () {
  console.log(this.name)
}

person.sayName()

/**
 * 对象字面量创建
 * 这些属性在创建时都带有一些特征值，JavaScript通过特征值来定义他们的行为
 */

// 什么是特征值？

var person1 = {
  name: 'xcc1',
  age: 20,
  sayName: function () {
    console.log(this.name)
  }
}

person1.sayName()



/**
 * 属性类型
 */

// esma-262第5版定义了只在类别才用的属性，描述了属性的各种特征，类似[[Enumerable]]


/**
 * 数据属性
 * 包含一个数据值的位置，在这个位置可以读取和写入值
 * 四个描述行为的特性
 */

var person2 = {
  name: 'xcc2',
  age: 18,
  sex: 1,
  value: 1
}

Object.defineProperty(person2, 'name', {
  configurable: false
})

Object.defineProperty(person2, 'age', {
  enumerable: false
})

Object.defineProperty(person2, 'sex', {
  writable: false
})

Object.defineProperty(person2, 'value', {
  value: 10
})

delete person2.name

for (var key in person2) {
  console.log(key)
}

person2.sex = 0

console.log('person2 name', person2.name)

console.log('person2 sex', person2.sex)

console.log('person2 value', person2.value)




