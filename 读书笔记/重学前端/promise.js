/*
var p = new Promise((resolve, reject) => {
  console.log('1')
  resolve()
})

setTimeout(() => console.log(4), 0)

p.then(() => console.log(2))

console.log(3)
*/



console.log(1)  // fn1

setTimeout(() => console.log(2), 0)  // fn2

console.log(3)   // fn3

setTimeout(() => console.log(4), 1000)  // fn4

Promise.resolve()
  .then(() => {
    setTimeout(() => console.log(5), 0) // fn5
    setTimeout(() => console.log(6), 1000)  // fn6
    console.log(7)  // fn7
    Promise.resolve()
      .then(() => console.log(8)) // fn8
  })
  .then(() => console.log(9)) // fn9

new Promise((resolve) => {  
  console.log(10) // fn10
  resolve()
}).then(() => {
  console.log(11) // fn11
})

setTimeout(() => console.log(12), 0)  // fn12

console.log(13) // fn13

setTimeout(() => console.log(14), 1000) // fn14


// 1, 3, 10, 13, 7, 11, 9, 8, 2, 12, 5, 4, 14, 6