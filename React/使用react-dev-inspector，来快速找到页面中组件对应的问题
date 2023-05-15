# 使用react-dev-inspector，来快速找到页面中组件对应的问题

## 安装依赖

```javascript
yarn add react-dev-inspector -D
```

## 项目根节点配置(以umi2/umi3做示例)

```javascript
import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Inspector } from 'react-dev-inspector';

const BasicLayout = (props) => {
  return (
    <>
      <ProLayout
        {...props}
      >
        {children}
      </ProLayout>
      {isDev && (
        <Inspector
          keys={['control', 'shift', 'command', 'c']}
          disableLaunchEditor={true}
          onClickElement={({ codeInfo }) => {
            if (!codeInfo?.absolutePath) return;
            const { absolutePath, lineNumber, columnNumber } = codeInfo;
            window.open(`vscode://file/${absolutePath}:${lineNumber}:${columnNumber}`);
          }}
        >
          <div />
        </Inspector>
      )}
    </>
  );
};

export default <BasicLayout />
```

注意的点：

**Inspector组件内部需要放一个空的子元素，不然会报错** [issue](https://github.com/zthxxx/react-dev-inspector/issues/139)

## 使用方式

在页面跑起来项目后，快捷键control + shift + command + c，点击dom元素就可以打开vscode了

[npm 地址](https://github.com/zthxxx/react-dev-inspector)

