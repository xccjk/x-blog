# React设计模式

## 组合模式

组合模式：将**容器、数据、UI**渲染分离，容器组件负责应用程序的数据和状态，UI组件负责呈现UI。通过分离数据管理和UI渲染的问题，可以使代码更加模块化并且易于理解。

```javascript
// index.js
import React, { useState, useEffect } from 'react';

import Header from '@/components/header';
import Content from '@/components/content';
import Footer from '@/conponents/footer';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { code, data = {} } = await api();
      if (code === 200) {
        setData(data);
      }
    }

    getData();
  }, []);

  return (
    <div className='app'>
      <Header {...data} />
      <Content {...data} />
      <Footer {...data} />
    </div>
  )
};

export default App;
```

```javascript
// header/index.js
import React from 'react';

const Header = (props) => {
  return (
    <div className='header'>
      <div>渲染header</div>
      <div>{props.name}</div>
    </div>
  )
};

export default Header;
```

```javascript
// content/index.js
import React from 'react';

const Content = (props) => {
  return (
    <div className='content'>
      <div>渲染content</div>
      {props.todos?.map(todo => (<div>{todo.text}</div>))}
    </div>
  )
};

export default Content;
```

```javascript
// footer/index.js
import React from 'react';

const Footer = (props) => {
  return (
    <div className='footer'>
      <div>渲染footer</div>
    </div>
  )
};

export default Footer;
```

## render props模式

render props模式：这个模式分为两层，容器组件和外层组件，容器组件用来传递状态，执行children函数。大白话就是容器组件提供一些数据、状态、方法给外层组件使用，就不用在每个使用的位置都写一套相同的逻辑

```javascript
import React, { useState } from 'react';

const Toggle = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible)
  }

  return children({
    visible,
    toggle: handleClick
  })
}

export default Toggle;
```

```javascript
import React from 'react';

import Toggle from '@/components/toggle';

const App = ({ children }) => {
  return (
    <Toggle>
      {(visible, toggle) => {
        return (
          <>
            <div onclick={toggle}>{visible ? '隐藏' : '显示'}toggle</div>
            {visible && <div>内容区域</div>}
          </>
        )
      }}
    </Toggle>
  )
}

export default App;
```

## HOC模式

HOC模式：高阶组件是一种重用组件逻辑的模式，可以在多个组件之间共享标准功能的方法。

场景：你有一个网页，有许多操作需要登录后才可以进行，如果登录就可以直接操作，未登录就需要弹出登录弹窗。总不能说每个位置都加一套判断登录的逻辑然后再决定弹不弹登录弹窗吧，最好的方法就是把是否登录逻辑和弹窗登录逻辑封装一下来提供给使用的位置使用。

## 提供者模式

提供者模式：使用Context API将数据向下传递到组件，而无需通过多个组件级别传递 props，可用于访问树中任何组件的数据。

## 继承模式
