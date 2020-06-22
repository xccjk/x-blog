```
  var data = [
    {
      name: 'a',
      age: 22,
      a: 1,
      b: 2
    }
  ]
  JSON.stringify(data, ["a", "b"]) // "[{"a":1,"b":2}]"
  // 序列化值，过滤器，缩进值
  JSON.stringify(value, replacer, space)

  var obj = {a: null, b: undefined, c: NaN, d: '', e: {}, f: function(){}, g: [], h: new Date()}
  // undefined，函数在序列号过程中会被过滤掉，NaN在过程中会转为null，时间会调用toJSON()方法转为字符串
  JSON.stringify(obj) // "{"a":null,"c":null,"d":"","e":{},"g":[],"h":"2020-05-07T03:06:24.494Z"}"

```