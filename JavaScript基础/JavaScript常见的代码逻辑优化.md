# JavaScript常见的代码逻辑优化

## 多条件判断

```javascript
  // bad
  function filter(type) {
    if (type === 1 || type === 2 || type === 3 || type === 4 || ...) {
      console.log('条件成立了...')
    }
  }
  // good
  const types = [1, 2, 3, 4, ...]
  function filter(type) {
    if (types.includes(type)) {
      console.log('条件成立了...')
    }
  }
```

### 检查数组是否都满足某条件

```javascript
  const data = [
    { name: 'a', age: 20 },
    { name: 'b', age: 28 },
    { name: 'c', age: 18 }
  ]
  // bad
  function filter(n) {
    let isAll = true
    data.forEach(({ age }) => {
      if (age > n) {
        isAll = false
      }
    })
    return isAll
  }
  // bad
  function filter(n) {
    const o = data.find(x => x.age > n)
    return o ? true : false
  }
  // good
  function filter(n) {
    return data.every(x => x.age > n)
  }
```

## 数组中某一项满足要求

```javascript
  const data = [
    { name: 'a', age: 20 },
    { name: 'b', age: 28 },
    { name: 'c', age: 18 }
  ]
  // bad
  let isAge = false
  data.forEach(({ age }) => {
    if (age > 25) {
      isAge = true
    }
  })
  // good
  const isAge = data.some(({ age }) => age > 25)
```

## 对数组中匹配上的某个值进行解构

```javascript
  const data = [
    { name: 'a', age: 20 },
    { name: 'b', age: 28 },
    { name: 'c', age: 18 }
  ]
  // bad
  const { name, age } = data.filter(({ age }) => age > 25)[0] || {}
  // good
  const { name, age } = data.find(({ age }) => age > 25) || {}
```

## 函数默认值

- 常用来接口请求给定默认请求方式

```javascript
  // bad
  function f(m) {
    return m || 1
  }
  // good
  function f(m = 1) {
    return m
  }
```

## 解构匹配 - 可选链操作符

```javascript
  const obj = { a: { b: { c: 1 } } }
  // bad
  const { a = {} } = obj
  const { b = {} } = a
  const { c } = b
  // good
  // 需要配置babel
  const m = a?.b?.c
  // bad
  <div>
    {
      (this.props.data || []).map(li => <span>{li}</span>)
    }
  </div>
  // good
  <div>
    {
      this.props?.data?.map(li => <span>{li}</span>)
    }
  </div>
```

## 多条件匹配

```javascript
  // bad
  function pick(type) {
    if (type === 1) {
      return [0, 1]
    } else if (type === 2) {
      return [0, 1, 2]
    } else if (type === 3) {
      return [0, 3]
    } else {
      return []
    }
  }
  // bad
  function pick(type) {
    switch (type) {
      case 1:
        return [0, 1]
      case 2:
        return [0, 1, 2]
      case 3:
        return [0, 3]
      default:
        return []
    }
  }
  // good
  // 枚举法
  const fn = {
    1: [0, 1],
    2: [0, 1, 2],
    3: [0, 3]
  }
  const filter = fn[type] ?? []
  // good
  // map数据结构
  const fn = new Map()
    .set('1', [0, 1])
    .set('2', [0, 1, 2])
    .set('3', [0, 3])
  const filter = fn[type] ?? []
```

## 三元表达式优化

```javascript
  // bad
  return (
    <>
      {
        isCheck ? (
          <div>check all</div>
        ) : null
      }
    </div>
  )
  // good
  if (!isCheck) return null
  return <div>check all</div>
```

## 数字转换中常见的错误处理 - ~~运算符

- 即使是数据错误，返回的数据类型不会影响后续数据格式的处理

```javascript
  // bad
  function sum(num) {
    return +num + 1
  }
  // bad
  function sum(num) {
    return Number(num) + 1
  }
  sum('1.1')  // 2.1
  sum('1.1abc') // NaN
  // good
  function sum(num) {
    return ~~num + 1
  }
  sum('1.1')  // 2.1
  sum('1.1abc') // 1
```

## 错误处理 - try...catch

```javascript
  // bad
  function async fetchData() {
    const res = await getData({})
    const { success, response = [] } = res || {}
    if (success) {
      setData(response)
    }
  }
  // good
  function async fetchData() {
    try {
      const res = await getData({}) ?? []
      const { success, response = [] } = res
      if (success) {
        setData(response)
      }
    } catch (err) {
      console.log('error', const res = await getData({}))
    }
  }
```
