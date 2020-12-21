# webpack5升级过程遇到的一些坑

## 版本相关信息

- node: v14.15.0
- npm: 6.14.8
- mac: 10.14.6
- webpack: 5.10.3
- webpack-cli: 4.2.0
- webpack-dev-server: 3.11.0

```
  "webpack": "^5.10.3",
  "webpack-cli": "^4.2.0",
  "webpack-dev-server": "^3.11.0"
```

```
  // .babelrc.js
  module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['> 5%', 'IE 10', 'iOS 7', 'Firefox > 20']
          },
          useBuiltIns: 'usage',
          corejs: 3
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es'
        }
      ]
    ]
  }
```


## 问题

1. `Error: Cannot find module 'webpack-cli/bin/config-yargs'`

在`webpack-cli 4.x`中，不能过`webpack-dev-server`启动项目了，需要通过`webpack serve...`或者修改`webpack-cli`版本改为3.x


```
  // package.json
  // webpack4.x
  "script": {
    "dev": "webpack-dev-server ...",
  }
  // webpack5.x
  "script": {
    "dev": "webpack serve ...",
  }
  // 降版本
  {
    webpack-cli@3.3.12
  }
```

2. `webpack5`中错误出现错误`UnhandledPromiseRejectionWarning: TypeError: webpack.NamedModulesPlugin is not a constructor`

```
  // webpack.config.js

  // webpack4.x
  module.exports = {
    ...
    plugins: [
      ...
      new webpack.NamedModulesPlugin()
    ]
  }

  // webpack5.x
  // 在webpack5.x中，webpack.NamedModulesPlugin的功能已经内置
```

3. babel配置导致的文件引入错误，`@babel/runtime`

在webpack5.x中，发现很多关于`@babel/runtime/helpers/esm`的文件引入错误，错误提示类似下面，通过锁定@babel/runtime包版本即可

```
Module not found: Error: Can't resolve './superPropBase' in '/Users/xxx/node_modules/@babel/runtime/helpers/esm'
Did you mean 'superPropBase.js'?
BREAKING CHANGE: The request './superPropBase' failed to resolve only because it was resolved as fully specified
(probably because the origin is a '*.mjs' file or a '*.js' file where the package.json contains '"type": "module"').
The extension in the request is mandatory for it to be fully specified.
Add the extension to the request
```

```
  npm install @babel/runtime@7.12.0 -D
```


4. `webpack < 5 used to include polyfills for node.js core modules by default`

在运行过程中出现了很多这样的报错信息，是由于在webpack5中移除了nodejs核心模块的polyfill自动引入，所以需要手动引入，如果打包过程中有使用到nodejs核心模块，webpack会提示进行相应配置

```
  // webpack.config.js
  module.exports = {
    ...
    resolve: {
      // https://github.com/babel/babel/issues/8462
      // https://blog.csdn.net/qq_39807732/article/details/110089893
      // 如果确认需要node polyfill，设置resolve.fallback安装对应的依赖
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        url: require.resolve('url'),
        buffer: require.resolve('buffer/'),
        util: require.resolve('util/'),
        stream: require.resolve('stream-browserify/'),
        vm: require.resolve('vm-browserify')
      },
      // 如果确认不需要node polyfill，设置resolve.alias设置为false
      alias: {
        crypto: false
      }
    }
  }
```


5. DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated. BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.
        Do changes to assets earlier, e. g. in Compilation.hooks.processAssets.
        Mak`e sure to select an appropriate stage from Compilation.PROCESS_ASSETS_STAGE_*.

为`html-webpack-plugin`这个包导致的⚠️信息，[github issue](https://github.com/webpack/webpack/issues/11997)


```
  npm run html-webpack-plugin@next -D
```

6. DeprecationWarning: A 'callback' argument need to be provided to the 'webpack(options, callback)' function when the 'watch' option is set. There is no way to handle the 'watch' option without a callback

官方给出的问题原因是`webpack-cli`这个包的版本导致的，[github issue](https://github.com/webpack/webpack-cli/issues/1918)

```
  // 官方提供的解决方式，修改webpack-cli版本到4.2.0既可
  npm install webpack-cli@4.2.0 --save-dev
```

不过我在本地创建了一个新的项目，版本信息如下，还是存在上面的那个报错信息，demo地址[github issue](https://github.com/xccjk/webpack-demo1)

```
  "webpack": "^5.10.3",
  "webpack-cli": "^4.2.0",
  "webpack-dev-server": "^3.11.0"
```

7. 业务插件遇到的问题，`webpack-merge`包遇到的问题

[csdn资料](https://blog.csdn.net/lzc2644481789/article/details/107814848)

```
  // 4.x版本
  {
    "webpack-merge": "^4.2.2"
  }
  // webpack.config.js
  const merge = require('webpack-merge')
  const defaultConfig = require('../...')
  const config = merge(defaultConfig, {

  })
  export default config

  // 5.x版本
  {
    "webpack-merge": "^5.7.0"
  }
  const webpackMerge = require('webpack-merge')
  const defaultConfig = require('../...')
  const config = webpackMerge.merge(defaultConfig, {

  })
  export default config
```

8. 数据流工具`recoil`好像还不支持在webpack中使用，我们项目里有使用recoil，配置了babel后，一直提示`You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders`

官方答复：[guthub issue](https://github.com/facebookexperimental/Recoil/pull/467)

9. `TypeError: Cannot read property 'tap' of undefined`

`hard-source-webpack-plugin`这个包在版本升级后出现错误，[github issue](https://github.com/mzgoddard/hard-source-webpack-plugin/issues/461)

```
  // webpack.config.js
  // webpack4.x
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  module.exports = {
    ...
    piugins: [
      new HardSourceWebpackPlugin({
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package-lock.json', 'yarn.lock'],
        },
        cachePrune: {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          sizeThreshold: 50 * 1024 * 1024
        }
      })
    ]
  }
  // webpack5.x
  // https://github.com/mzgoddard/hard-source-webpack-plugin/issues/461
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
  module.exports = {
    ...
    piugins: [
      new HardSourceWebpackPlugin(),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([])
    ]
  }
```

10. `webpack output is served from undefined`

[github issue](https://github.com/webpack/webpack-dev-server/issues/2745)


[github查看更多文章](https://github.com/xccjk/notes/issues/26)
[webpack升级日志](https://github.com/webpack/changelog-v5/blob/master/README.md)
