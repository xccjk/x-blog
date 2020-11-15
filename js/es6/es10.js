// 新增Array的flat()方法和flatMap()方法

/**
 * flat
 * 按照指定的深度遍历数组，进行降维操作，返回一个新数组
 * 类似数组扁平化操作
 */

var arr1 = [1, [2, 3], [4, [5, 6, [7, 8, [9, [10]]]]]]

console.log(arr1.flat())

console.log(arr1.flat(2))

console.log(arr1.flat(3))

console.log(arr1.flat(4))

console.log(arr1.flat(5))

console.log(arr1.flat(10))

var arr2 = [1, null, undefined, true, false, 0, Symbol(), , '0', 'string', {}, [], []]

// 可以用来过滤数组中的空元素，null，undefined，false，0，{}等都不会被过滤掉

console.log(arr2.flat())  // [ 1, null, undefined, true, false, 0, Symbol(), '0', 'string', {} ]


/**
 * flatMap
 * 使用映射函数映射数组中每个元素，将结果压缩成一个新数组
 * 会将结果扁平化一层
 */

console.log('-----flatMap-----')

var arr3 = [1, 2, 3]

console.log(arr3.map(x => [x * 2])) // [ [ 2 ], [ 4 ], [ 6 ] ]

console.log(arr3.flatMap(x => [x * 2])) // [ 2, 4, 6 ]

console.log(arr3.flatMap(x => [[ x * 2 ]])) // [ [ 2 ], [ 4 ], [ 6 ] ]

console.log(arr3.flatMap(x => [[[ x * 2 ]]])) // [ [ [ 2 ] ], [ [ 4 ] ], [ [ 6 ] ] ]


// 新增String的trimStart和trimEnd方法
// 去除字符串前面空格

/**
 * trimStart
 */

console.log('-----trimStart-----')

var str1 = ' abc 123 '

console.log(str1.trimStart()) // 'abc 123 '

console.log(str1.trimEnd()) // ' abc 123'

console.log(str1.trim())  // 'abc 123'

console.log(str1.trimLeft())  // 'abc 123 '

console.log(str1.trimRight()) // ' abc 123'