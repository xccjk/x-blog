/**
 * 深拷贝中的数据类型判断
 * @param {deepClone} target
 */

// 合理判断引用类型，需要考虑null和function两种特殊的数据类型
function isObject(target) {
  const type = typeof target
  console.log(type)
  return target !== null && (type === 'object' || type === 'function')
}

isObject(null)          // object
isObject({})            // object
isObject(undefined)     // undefined
isObject((function(){}))  // function


// 获取数据类型
// 可以使用toString()方法来获取准确的引用类型，每一个引用类型独有toString()方法
// 如果自定义对象未覆盖toString()方法，toString返回"[object type]"，type是对象的类型

// 实际大部分引用类型重写了toString方法，比如Array，Date，RegExp等
// 通过直接调用Object原型上未被覆盖的toString()方法，使用call来改变this指向达到想要的效果
console.log([1, 2].toString())  // 1, 2
console.log(Object.prototype.toString.call([])) // [object Array]

console.log(new Date().toString())  // Mon May 18 2020 10:55:06 GMT+0800 (GMT+08:00)
console.log(Object.prototype.toString.call(new Date())) // [object Date]

console.log(new Set().toString()) // [object Set]
console.log(new Map().toString()) // [object Map]
console.log(new Boolean().toString()) // false
console.log(new Error().toString()) // Error
console.log(Symbol().toString())  // Symbol()
console.log((function() {}).toString()) // function() {}


const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'


// 获取数据类型，通过原型获取，通过call改变this指向
function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

// 箭头函数没有prototype
function a1() {

}

const a2 = () => {

}

console.log(a1, a2, typeof a1, typeof a2, a1.prototype, a2.prototype) // [Function: a1] [Function: a2] 'function' 'function' a1 {} undefined

function deepClone(target, map = new  Map()) {
  // 克隆元素类型
  if(!isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)
  let cloneTarget
  if(deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  }

  // 防止循环引用
  if(map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if(type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepClone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if(type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map))
    })
    return cloneTarget
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if(keys) {
      key = value
    }
    cloneTarget[key] = deepClone(target[key], map)
  })

  return cloneTarget
}


// 赋值 - 复制了一份内存地址
var a = 10, c = 15
var b = a
d = c
a = 20
c = 20
console.log(a, b, c, d) // 20 10 20 15

// 浅拷贝 - 复制了指针
var obj = {a: 1}
var _obj = obj
obj.b = 2
console.log(obj, _obj)  // { a: 1, b: 2 } { a: 1, b: 2 }


