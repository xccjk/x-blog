# css modules与antd一起使用时，antd样式不生效解决方案

最近在做历史项目的依赖升级，历史依赖版本：

```javascript
  "react": "^15.5.4",
  "react-dom": "^15.5.4",
  "antd": "^2.10.1",

  "autoprefixer": "6.7.2",
  "babel-core": "6.22.1",
  "babel-eslint": "7.1.1",
  "babel-jest": "18.0.0",
  "babel-loader": "6.2.10",
  "babel-plugin-import": "^1.1.1",
  "babel-polyfill": "^6.23.0",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-flow": "^6.23.0",
  "babel-preset-react": "^6.24.1",
  "babel-preset-react-app": "^2.2.0",
  "babel-runtime": "^6.20.0",

  "eslint": "3.16.1",
  "eslint-config-react-app": "^0.6.2",
  "eslint-loader": "1.6.0",
  "eslint-plugin-flowtype": "2.21.0",
  "eslint-plugin-import": "2.0.1",
  "eslint-plugin-jsx-a11y": "4.0.0",
  "eslint-plugin-react": "6.4.1",


  "file-loader": "0.10.0",
  "postcss-loader": "1.2.2",
  "json-loader": "0.5.4",
  "html-webpack-plugin": "2.24.0",
  "http-proxy-middleware": "0.17.3",
  "jest": "18.1.0",
  "less": "^2.7.2",
  "less-loader": "^4.0.3",
  "react-dev-utils": "^0.5.2",
  "style-loader": "0.13.1",
  "url-loader": "0.5.7",

  "webpack": "1.14.0",
  "webpack-dev-server": "1.16.2",



```

升级之后的版本信息：

```javascript
  "react": "^16.13.0",
  "react-dom": "^16.13.0",
  "antd": "^4.0.0",
  "webpack": "5.37.1",
  "webpack-dev-server": "^3.11.2",

  "@babel/core": "^7.14.3",
  "@babel/plugin-proposal-class-properties": "^7.13.0",
  "@babel/plugin-proposal-decorators": "^7.14.2",
  "@babel/plugin-proposal-nullish-coalescing-operator": "^7.14.2",
  "@babel/plugin-proposal-object-rest-spread": "^7.14.2",
  "@babel/plugin-proposal-optional-chaining": "^7.14.2",
  "@babel/plugin-syntax-dynamic-import": "^7.8.3",
  "@babel/plugin-transform-runtime": "^7.14.3",
  "@babel/preset-env": "^7.14.2",
  "@babel/preset-react": "^7.13.13",
  "@babel/runtime": "^7.14.0",
  "autoprefixer": "^10.2.5",
  "babel-eslint": "^10.1.0",
  "babel-loader": "^8.2.2",
  "babel-plugin-import": "^1.13.3",
  "body-parser": "^1.19.0",

  "css-loader": "^5.2.6",
  "css-minimizer-webpack-plugin": "^3.0.0",

  "file-loader": "^6.2.0",

  "clean-webpack-plugin": "^4.0.0-alpha.0",
  "copy-webpack-plugin": "^9.0.0",

  "happypack": "^5.0.1",
  "jest": "^27.0.1",
  "json-loader": "^0.5.4",
  "less": "^2.7.3",
  "less-loader": "^4.1.0",
  "mini-css-extract-plugin": "^1.6.0",

  "postcss": "^8.3.0",
  "postcss-loader": "^4.0.3",
  "postcss-modules": "^4.0.0",
  "postcss-preset-env": "^6.7.0",
  "react-dev-utils": "^11.0.4",

  "webpack-hot-middleware": "^2.25.0",
  "webpack-manifest-plugin": "1.1.0",
  "webpackbar": "^5.0.0-3",
  "workbox-webpack-plugin": "^6.1.5"
```

在升级的过程中，当配置了`css-loader`的`modules`时，启动`css modules`来为css给定作用域时，发现antd中组件的样式不生效了，配置如下👇：

- webpack配置

```javascript
  module.exports = {
    ...,
    module: {
      rules: [
        {
          ...
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                }
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                }
              }
            },
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          ...
        }
      ]
    },
    ...
  }
```

- postcss.config.js配置

```javascript
    module.exports = {
      plugins: [
        require('postcss-preset-env')({
          browsers: 'last 2 versions'
        })
      ]
    }
```

***注意的点：css-loader options中，modules配置随着版本而改变***

- css-loader配置css modules模式

```javascript
  // 历史版本配置方式
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    }
  }
  
  // 新版配置css modules方式
  {
    loader: 'css-loader',
    options: {
      modules: {
        mode: 'local',
        localIdentName: '[name]__[local]--[hash:base64:5]'
      }
    }
  }
```

当像上面这样配置时css modules时，项目中样式采用css modules的写法，构建之后会被重命名。如果项目中引入了antd的样式，则会导致样式加载不到问题

解决方式：

1. 在打包后的html中全局引用antd.css文件，但是就做不到按需加载样式了
2. 改变webpack配置，css modules模式只应用在业务代码中，而不改变node_modules中三方组件的样式编译方式

- 修改后的webpack配置

```javascript
  module.exports = {
    ...,
    module: {
      rules: [
        {
          ...
        },
        {
          test: /\.css$/,
          // 采用css modules的解析方式时，排除对node_modules文件处理
          exclude: [/node_modules/],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                }
              }
            },
            'postcss-loader'
          ]
        },
        // 解决使用css modules时antd样式不生效
        {
          test: /\.css$/,
          // 排除业务模块，其他模块都不采用css modules方式解析
          exclude: [/src/],
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                }
              }
            },
            'postcss-loader',
            {
              loader: 'less-loader',
              options: { lessOptions: { javascriptEnabled: true } }
            }
          ]
        },
        {
          ...
        }
      ]
    },
    ...
  }
```
