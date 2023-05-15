# react tsx 引入 less 文件，警告找不到模块“../index.less xxx，但是可以正常运行

## 全局ts配置文件typings.d.ts

```javascript
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}
```

## 使用变量接收less文件

```javascript
const styles = require('./index.less')
```
