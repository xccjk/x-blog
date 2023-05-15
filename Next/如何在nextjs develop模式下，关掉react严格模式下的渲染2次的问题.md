# 如何在nextjs develop模式下，关掉react严格模式下的渲染2次的问题

在新版react中，develop环境中，严格模式(React.StrictMode)下会重复渲染两次的问题，在**正式环境中不会重复渲染**

[issue](https://github.com/facebook/react/issues/17786)

带来的问题：

接口会重复调用，在有些场景下重复调用接口会导致报错，develop下调试时带来不便

解决方案：

手动关闭严格模式，即不使用`React.StrictMode`包裹组件

nextjs中通过配置中的reactStrictMode来设置

next.config.js
```
module.exports = {
  ...
  reactStrictMode: false,
}
```
