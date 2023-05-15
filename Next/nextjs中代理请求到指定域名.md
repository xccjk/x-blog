# nextjs中代理请求到指定域名

在next.config.js中，通过配置rewrites fallback来把请求代理到指定域名
```
module.exports = {
  ...
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `https://host/:path*`,
        },
      ],
    }
  }
}
```
