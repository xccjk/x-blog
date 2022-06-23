let num1 = 1
let num2 = 5

const add = function () {
  num1 = num1 * num2
  throw new Error('error')
  return 
}

module.exports = {
  num1,
  num2,
  add
}