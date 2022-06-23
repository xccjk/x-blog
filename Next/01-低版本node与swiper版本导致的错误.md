# 低版本node与swiper版本导致的错误

最近在nextjs项目中使用swiper，版本信息如下：

node版本`12.9.1`

```json
"next": "11.1.0",
"swiper": "7.4.1",
```

项目打包后报错：

```javascript
(node:159) ExperimentalWarning: The ESM module loader is experimental.

> Build error occurred
file:///shark/web-book/node_modules/swiper/react/use-isomorphic-layout-effect.js:1
import { useEffect, useLayoutEffect } from 'react';
         ^^^^^^^^^
SyntaxError: The requested module 'react' is expected to be of type CommonJS, which does not support named exports. CommonJS modules can be imported by importing the default export.
For example:
import pkg from 'react';
const { useEffect, useLayoutEffect } = pkg;
    at ModuleJob._instantiate (internal/modules/esm/module_job.js:97:21)
    at async ModuleJob.run (internal/modules/esm/module_job.js:143:20)
    at async Loader.import (internal/modules/esm/loader.js:182:24) {
  type: 'SyntaxError'
}
```

重点错误信息`The requested module 'react' is expected to be of type CommonJS, which does not support named exports. CommonJS modules can be imported by importing the default export`

意思就是打包环境还不支持EMS包

解决方案：

- 升级node版本到14.x
- 把swiper版本降到6.x版本

[资料](https://stackoverflow.com/questions/69214178/error-using-swiperjs-react-the-requested-module-react-is-expected-to-be-of)