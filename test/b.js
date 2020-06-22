const { log } = console

// 相等运算符
const obj = {a: 1}, _obj = obj
const arr = [
  [null, undefined],
  [null, 0],
  [true, 1],
  [true, 2],
  [true, 0],
  [false, ''],
  [false, 0],
  [false, 1],
  [NaN, NaN],
  [NaN, 0],
  [NaN, 1],
  [NaN, 5],
  [[''], ''],
  [[''], 0],
  [[''], false],
  [{}, true],
  [{}, false],
  [{}, 1],
  [{}, 0],
  [[], 0],
  [[], 1],
  [{}, {}],
  [{a: 1}, {a: 1}],
  [obj, _obj],
  [null, null],
  [undefined, undefined],
]

/**
  1 true
  2 false
  3 true
  4 false
  5 false
  6 true
  7 true
  8 false
  9 false
  10 false
  11 false
  12 false
  13 true
  14 true
  15 true
  16 false
  17 false
  18 false
  19 false
  20 true
  21 false
  22 false
  23 false
  24 true
  25 true
  26 true
*/

function compare(data) {
  data.map((li, i) => {
    const [a, b] = li
    console.log(i + 1, a == b)
  })
}


compare(arr)

console.log(({}).toString())  // [object Object]

console.log(({}).valueOf()) // {}


// 全等运算符

function _compare(data) {
  data.map((li, i) => {
    const [a, b] = li
    console.log(i + 1, a === b)
  })
}

_compare(arr)

/**
 * 
  1 false
  2 false
  3 false
  4 false
  5 false
  6 false
  7 false
  8 false
  9 false
  10 false
  11 false
  12 false
  13 false
  14 false
  15 false
  16 false
  17 false
  18 false
  19 false
  20 false
  21 false
  22 false
  23 false
  24 true
  25 true
  26 true
 */
