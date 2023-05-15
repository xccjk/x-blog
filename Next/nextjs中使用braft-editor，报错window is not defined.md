# nextjs中使用braft-editor，报错window is not defined

braft-editor中使用了浏览器对象window等，在next中使用时会报`window is not defined`相关错误

解决方案：

src/home/conponents/editor/index.js
```
import React from 'react';

// 引入编辑器组件
import BraftEditor from 'braft-editor';
import ColorPicker from 'braft-extensions/dist/color-picker';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/color-picker.css';

import styles from './index.module.scss';

BraftEditor.use(
  ColorPicker({
    includeEditors: ['editor'],
    theme: 'dark' // 支持dark和light两种主题，默认为dark
  })
);

function Editor({ data = {} }) {
  const { content } = data;
  const dom = BraftEditor.createEditorState(content);
  let html = dom.toHTML();

  return (
    <div
      className={styles.txt}
      dangerouslySetInnerHTML={{
        __html: html || ''
      }}
    />
  );
}

export default Editor;
```

src/home/index.js
```
import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./components/editor'), { ssr: false });

const Home = ({ data }) => {
  return (
    <>
      <Editor />
      ...
    </>
  );
};

export default Home;
```

通过把dynamic ssr设置为false，可以让组件不使用服务端渲染，在本地环境跑起来也是正常的，但是在运行`next build`时还是会报相同的错误

问题原因：nextjs中pages下面的`.js、jsx、.ts、.tsx`文件都会当做一个路由，并且默认情况下，nextjs将预渲染每个 page页面(服务端渲染)，因此还是会报window相关错误

解决方案：

- 把braft-editor相关组件进行封装，放在src/components目录下

- 设置next.config.js中的pageExtensions，把路由文件采用`.page.js`命名，组件采用`.js`命名，这样在编译时就不会预渲染`.js`文件了

```
module.exports = {
  ...
  pageExtensions: [
    // `.page.tsx` for page components
    'page.tsx',
    'page.js',
    // `.api.ts` for API routes
    'api.ts',
  ],
}
```


