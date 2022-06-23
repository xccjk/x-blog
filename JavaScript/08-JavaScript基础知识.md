# js基础知识

## js组成的三个部分

1. ECMAScript - 定义了js的语法规范，es3/es6-es10
2. DOM - 文档对象模型，提供了对应的属性和方法，可以让js操作页面中的DOM元素
3. BOM - 浏览器对象模型，提供了操作浏览器的属性和方法

## js中的数据类型

1. 基本数据类型(值类型/原始值)，包括了string，number，Boolean，null，undefined，Symbol(es6)，BigInt(es10)
2. 引用数据类型，包括了对象数据类型object，函数数据类型function。

|  基本数据类型   | 引用数据类型  |  
|  string   | {}  |  
|  number   | []  |  
|  boolean  | 日期对象 new Date()  |  
|  null   | 正则 /^$/  |  
|  undefined   | 数学函数对象 Math  |  
|  symbol es6   |  - |  
|  BigInt es10   | -  |  

## js中的变量声明

1. 变量声明方式
   - var,let,const
   - function与class声明
   - import与require的导入规范
2. 变量的命名规范
   - 严格遵循大小写
   - 使用驼峰命名法
   - 命名规则
   - 不能使用关键字和保留字

- 问题1：var与let与const声明变量的区别
- 问题2：import与require的区别
- 问题3：判断数据类型的方式有哪些
- 问题4：深拷贝与浅拷贝
- 问题5：什么是DOM什么是BOM
