# javascript代码的解析过程

## javascript引擎编译流程

- 解析
  - 词法解析
    - 原理
      - 是编译过程的第一个阶段，运行规则为`从左到右`一个一个字符读入源程序，对构成源程序的字符流进行扫描，然后根据构词规则识别单词
      - 核心：扫描，识别单词且对识别出的单词给出定性，定长的处理
    - 将JavaScript代码解析为一个个令牌(Token)
    - `会对代码逐个字符进行解析，生成令牌，每个令牌的类型都不相同，有关键字，标识符，符号，字符串等`
  - 语法解析
    - 将令牌组装成一颗抽象的语法树(AST)
- 解释
  - JavaScript引擎是通过解释器lgnition将AST转换成字节码，字节码是对机器码的一个抽象的描述
- 优化
  - 解释器在得到AST后，会按需进行解释和执行，如果函数未被调用，则不会去解释执行
  - 解释器会将一些重复可优化的操作收集起来生成分析数据，然后将字节码和分析数据传给编译器TurboFan，编译器会依据分析数据来生成高度优化的机器码


### 解析流程

- 输入代码

```
  var name = 'xcc'
  console.log(name)
```

- 词法分析
  - Keyword: 关键字
  - Identifier: 标识符
  - Punctuator: 符号
  - String: 字符串

```
  Keyword(var)
  Identifier(name)
  Punctuator(=)
  String('xcc')
  Identifier(console)
  Punctuator(.)
  Identifier(log)
  Punctuator(()
  Identifier(name)
  Punctuator())
```

- 语法解析阶段
  - 用令牌生成抽象语法树
  
- 生成的AST语法树
<img src='./2.png' width='200' />

- JavaScript引擎编译过程

<img src='./3.png' width='200' />


## 内存管理

