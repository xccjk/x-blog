# react context怎么在hooks组件中与函数组件中使用

## hooks组件

```javascript
import React, { useContext } from 'react';
import { BaseContext } from '@/store';

const Home = () => {
  const [base] = useContext(BaseContext);

  return ...;
};

export default Home;
```

## 函数组件

如果使用了`withRouter`包裹组件

```javascript
import React, { PureComponent } from 'react';
import { withRouter } from 'umi';

import { BaseContext } from '@/store';

class Home extends PureComponent {
  ...
}
// 注意contextType要放在export default后面
export default withRouter(Home);
Home.contextType = BaseContext;
```

```javascript
import React, { PureComponent } from 'react';

import { BaseContext } from '@/store';

class Home extends PureComponent {
  ...
}

export default Home;
```
