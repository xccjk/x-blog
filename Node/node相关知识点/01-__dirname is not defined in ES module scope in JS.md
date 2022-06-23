# __dirname is not defined in ES module scope in JS

在`es`模块中使用`__dirname`时，会报错

```javascript
The "__dirname is not defined in ES module scope" error occurs when we try to try to use the __dirname global variable in an ES module file. The __dirname or __filename global variables are not available in ECMAScript module files
```

解决方案：

```javascript
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, 'app'))
```