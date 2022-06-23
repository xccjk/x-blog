# react18中swiper导致的报错

在nextjs中使用swiperjs，当升级react版本到18.x后，报错：

> Cannot read properties of undefined (reading 'wrapperClass')

当前版本信息：

```json
"next": "^12.1.7-canary.30",
"react": "^18.2.0-next-e531a4a62-20220505",
"react-dom": "^18.2.0-next-e531a4a62-20220505",
"swiper": "^7.4.1"
```

解决方案：通过设置`next.config.js`中的`reactStrictMode : false`

或者：

升级swiper到最新版本

```json
"next": "^12.1.7-canary.30",
"react": "^18.2.0-next-e531a4a62-20220505",
"react-dom": "^18.2.0-next-e531a4a62-20220505",
"swiper": "^8.2.2"
```

[关联错误信息](https://github.com/nolimits4web/swiper/issues/5398)