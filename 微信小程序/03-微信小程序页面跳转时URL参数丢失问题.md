# 微信小程序页面跳转时URL参数丢失问题

最近在小程序开发过程中，发现之前可用的某个功能字段展示为了undefined，后来查看参数发现页面跳转时参数丢失了导致的

```javascript
  // group/index.js
  handleJump() {
    const { id, cover, title = '123' } = this.data
    wx.navigateTo({
      url: `/pages/group/result?id=${id}&cover=${cover}&title=${title}`
    })

    // cover参数url地址'https://test.baidu.com/20210926/f91e96d8ef22988d26e63c13bf1d3068_99x93x27.png'
  }

  // group/result.js
  onLoad(options) {
    console.log(options) // id, cover, title = 123
  }
```

此时获取到的参数都是正常的，在上线一段时间后，其它同学在图片后面加上了oss参数，结果发现title字段为undefined了，导致了展示错误

```javascript
  const { id, cover, title = '123' } = this.data
  wx.navigateTo({
    url: `/pages/group/result?id=${id}&cover=${cover}&title=${title}`
  })
  // cover参数url地址'https://test.baidu.com/20210926/f91e96d8ef22988d26e63c13bf1d3068_99x93x27.png?x-oss-process=image/resize,m_mfit,h_360,w_360/format,jpg/quality,Q_70'

  // group/result.js
  onLoad(options) {
    console.log(cover) // https://test.baidu.com/20210926/f91e96d8ef22988d26e63c13bf1d3068_99x93x27.png
    console.log(title) // undefined
  }
```

会发现再跳转的url参数中添加了包含特殊字符?的情况下，会出现参数丢失的情况

解决方案：**使用encodeURIComponent()与decodeURIComponent()对url参数进行编码与解码**

```javascript
  const { id, cover, title = '123' } = this.data
  wx.navigateTo({
    url: `/pages/group/result?id=${id}&cover=${encodeURIComponent(cover)}&title=${title}`
  })
  // cover参数url地址'https://test.baidu.com/20210926/f91e96d8ef22988d26e63c13bf1d3068_99x93x27.png?x-oss-process=image/resize,m_mfit,h_360,w_360/format,jpg/quality,Q_70'

  // group/result.js
  onLoad(options) {
    console.log(decodeURIComponent(cover)) // https://test.baidu.com/20210926/f91e96d8ef22988d26e63c13bf1d3068_99x93x27.png?x-oss-process=image/resize,m_mfit,h_360,w_360/format,jpg/quality,Q_70
    console.log(title) // 123
  }
```
