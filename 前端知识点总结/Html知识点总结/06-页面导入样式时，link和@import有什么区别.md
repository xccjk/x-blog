## 页面导入样式时，link和@import有什么区别

1. 在解析HTML时，`link css`会同时加载，而`@import css`会在HTML解析完成后再加载
2. `link`方式样式的权重高于`@import`的权重