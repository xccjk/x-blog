# 微信小程序警告 [Component] property received type-uncompatible value: expected but get null value. Used empty string instead

问题产生原因：**子组件properties中定义的字段类型不满足导致相关警告**

比如定义组件中src属性为String类型时，当src传入null时，就会有上述警告出现

```javascript
// imagex
Component({
  options: {},
  externalClasses: ['class'],
  properties: {
    src: String,
  },
  data: {
    loaded: false,
  },
  lifetimes: {
    attached() {},
  },
  methods: {},
});
```

使用

```javascript
<imagex src="{{null}}" />
```

