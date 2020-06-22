/*
const data = []
for(var i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i)
  }
}

data[0]()
data[1]()
*/

/*
const data = []
for(var i = 0; i < 3; i++) {
  data[i] = (function() {
    console.log(i)
  })(i)
}

data[0]
*/


/*
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

data[0]()
data[1]()
*/


/*
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

data[0]()
data[1]()
*/


/*
const data = []
for(let i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i)
  }
}

data[0]()
data[1]()
*/


/*
const data = []
for(let x = {i: 0}; x.i < 3; x.i++) {
  data[x.i] = function() {
    console.log(x.i)
  }
}

data[0]() // 3
data[1]() // 3
*/

/*
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

data[0]()
data[1]()
*/

/*
const data = []
let x = {i: 0}
for(let y = x.i; y < 3; y++) {
  data[y] = function() {
    console.log(y)
  }
}

data[0]() // 0
data[1]() // 1
*/