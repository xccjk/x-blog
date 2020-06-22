/**
 * https://laixiazheteng.com/article/page/id/8IN61XjjVt9y
 */

// 同步代码(包括promise的构造函数) -> promise.then -> setTimeout著作权归作者所有。

console.log('1')

// setTimeout 0 会在当前线程执行结束后在执行
// setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行
// setTimeout 0 其实执行时间并不为0，它有一个最小的执行时间4ms
setTimeout(() => {
  console.log(2)
}, 0)

console.log(3)

// promise构造函数里面是同步执行的
// then方法指向的回调将会在当前线程同步任务执行完之后执行
new Promise(function(resolve, reject) {
  console.log(4)
  resolve()
  console.log(6)
})
.then(() => {
  console.log(7)
})

setTimeout(() => {
  console.log(8)
}, 1000)

console.log(9)

// 1，3，4，6，9，7，2, 8