/**
 * 深拷贝浅拷贝
 * 参考文章：https://www.cnblogs.com/echolun/p/7889848.htm
 * 参考文章：https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1#heading-2
 */

/**
 * 深拷贝实现方式及原理
 * 1. 多层次情况下的递归调用 - [1, 2, [3, 4]] or {a: 1, b: undefined, c: {d: 10}}
 * 2. 内部循环引用的考虑
 * 3. 
 */

// JSON.stringify 深拷贝的缺点
/*
const obj = {a: 1, b: 2, c: 3, d: [1, 2]}
const _obj = JSON.parse(JSON.stringify(obj))
obj.a = 2
obj.d[0] = 2
console.log(obj, _obj)  // {a: 2, b: 2, c: 3, d: [2, 2]} {a: 1, b: 2, c: 3, d: [1, 2]}
*/


// 当内部存在函数，其他引用类型，循环引用时，在使用JSON.stringify进行拷贝时，会忽略掉函数与undefined，NaN会转换为null
/*
const obj = {a: 1, b: undefined, c: 3, d: [1, 2], e: NaN, f: null, g: true, h: 10, i: 'string', j: Symbol(), func: function() {console.log('---func---')}}
const _obj = JSON.parse(JSON.stringify(obj))
obj.a = 2
obj.d[0] = 2
console.log(obj, _obj)
*/

// obj = {a:2,b:undefined,c:3,d:[2,2],e:NaN,f:null,g:true,h:10,i:'string',j:Symbol(),func:[Function:func]}
// _obj = {a:1,c:3,d:[1,2],e:null,f:null,g:true,h:10,i:'string'}


// slice 与 concat方法
/*
let a = [1, 2, 3, 4]
b = a.slice()
a[0] = 2
console.log(a, b) // [ 2, 2, 3, 4 ] [ 1, 2, 3, 4 ]
*/


// 当数据中存在深层次属性时(数组中包含数组，对象中包含数组或者对象等)，深层次属性没有拷贝成功，第一层属性确实实现了拷贝，拥有了独立的内存，但是更深的属性使用了公共地址(实际指针的指向相同)
/*
let a = [1, 2, [3, 4]]
b = a.slice()
a[0] = 2
a[2][0] = 5
console.log(a, b) // [ 2, 2, [ 5, 4 ] ] [ 1, 2, [ 5, 4 ] ]
*/

/*
let a = [1, 2, [3, 4]]
b = a.concat()
a[0] = 2
a[2][0] = 5
console.log(a, b) // [ 2, 2, [ 5, 4 ] ] [ 1, 2, [ 5, 4 ] ]
*/


// 浅拷贝
/*
function deepClone(target) {
  let cloneTarget = Array.isArray(target) ? [] : {}
  for(const key in target) {
    cloneTarget[key] = target[key]
  }
  return cloneTarget
}
let testObj = {a: 1, b: undefined, c: function() {console.log('1')}}
let testArray = [1, 2, [3, 4]]
const _testObj = deepClone(testObj)
const _testArray = deepClone(testArray)
console.log(_testObj)  // { a: 1, b: undefined, c: [Function: c] }
testObj.a = 2
console.log(testObj, _testObj)  // { a: 2, b: undefined, c: [Function: c] } { a: 1, b: undefined, c: [Function: c] }
console.log(_testArray)  // [ 1, 2, [ 3, 4 ] ]
testArray[0] = 2
console.log(testArray, _testArray)  // [ 2, 2, [ 3, 4 ] ] [ 1, 2, [ 3, 4 ] ]
*/

// 深拷贝 - 考虑多层属性的拷贝，采用递归的方式
/*
function deepClone(target) {
  if(typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    for(const key in target) {
      cloneTarget[key] = deepClone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}

let testObj = {a: 1, b: undefined, c: {e: 10, f: {g: 20}} ,d: function() {console.log('1')}}
let testArray = [1, 2, [3, 4, undefined]]
const cloneData = deepClone(testObj)
console.log(cloneData) // {a:1,b:undefined,c:{e:10,f:{g:20}},d:[Function:d]}
testObj.a = 10
console.log(testObj, cloneData) // {a:10,b:undefined,c:{e:10,f:{g:20}},d:[Function:d]} {a:1,b:undefined,c:{e:10,f:{g:20}},d:[Function:d]}
*/

// es6 对象扩展运算符 - 浅拷贝，当数据属性有多层时，深层次数据(引用类型)指针指向同一处
/*
const obj = {a: 1, b: undefined, c: {d: 10}, e: function() {console.log('e')}}
const _obj = {...obj}
obj.a = 10
console.log(obj, _obj)  // { a: 10, b: undefined, c: { d: 10 }, e: [Function: e] } { a: 1, b: undefined, c: { d: 10 }, e: [Function: e] }
obj.c.d = null
console.log(obj, _obj)  // { a: 10, b: undefined, c: { d: null }, e: [Function: e] } { a: 1, b: undefined, c: { d: null }, e: [Function: e] }
*/

// object.assign() -  这个拷贝的是属性值，假如源对象的属性值是一个对象的引用，那么它也只是指向那个引用 浅拷贝，多层数据情况下拷贝的指针
/*
const target = {a: 1, b: undefined, c: {d: 10}, e: function() {console.log('e')}}
const _target = Object.assign(target)
target.c.d = 1
console.log(target, _target)  // { a: 1, b: undefined, c: { d: 1 }, e: [Function: e] } { a: 1, b: undefined, c: { d: 1 }, e: [Function: e] }
*/

// 当在递归调用中存在循环引用时，会导致栈内存溢出
/*
function deepClone(target) {
  if(typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    for(const key in target) {
      cloneTarget[key] = deepClone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}
const a = {b: 1}
a.a = a
deepClone(a)  // error Maximum call stack size exceeded
*/


// 解决循环引用 - 创建一个新的存储空间(map数据结构)，用来存储当前对象与拷贝对象的对应关系
// 判断当前需要拷贝的对象在存储空间中是否存在，存在就直接返回，不存在就继续拷贝
function deepClone(target, map = new Map()) {
  if(typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if(map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for(const key in target) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

















