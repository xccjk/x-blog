# nextjs window is not defined

问题原因，nextjs是服务端渲染的，在服务器预渲染HTML，然后发送到客户端进行渲染。因此在服务端渲染时，是获取不到浏览器对象window/document等

## dynamic 动态导入组件

home.js

```
export default Home () {
  console.log(window);

  return (
      ...
  )
}
```

app.js

```
import dynamic from 'next/dynamic';

const HomePage = dynamic(import('./home'), { ssr: false });

export default App () {
  return <HomePage />
}
```

## useEffect

因为useEffect方法在服务端渲染过程中不会执行，而是在HTML挂载到客户端后才执行，因此可以在useEffect中直接使用window

```
import React, { useEffect } from 'react';

export default Home () {
  useEffect((
    console.log(window)
  ), [])

  return (
      ...
  )
}
```
