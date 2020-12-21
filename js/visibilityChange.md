# visibilityChange api的使用场景

## 场景

- 最近在做网页版视频编辑器相关的工作，页面视频会自动重复的播放，但是发现在页面切换后，音视频还是在自动播放，感觉非常不合理
- 在没有在当前页面停留时，页面还是不停的请求资源，造成了很大的浪费
- 后面就发现visibilityChange能够很好的解决这个问题，是用来判断是否在当前页面

## visibilityChange api 文档

- [mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)
- 提供了您可以观察的事件，以便了解文档何时可见或隐藏，以及查看页面当前可见性状态的功能
- HTML5中的新特性，如果`需要兼容老版本浏览器慎用`

## demo

- [线上地址展示](https://codesandbox.io/s/visibilitychange-api-y7nxx)

```
  // app.js
  import React from 'react'
  import useVisibility from './visibilityChange'

  export default function App() {
    const videoElement = document.getElementById('video')
    // 直接调用即可
    useVisibility(videoElement)

    return (
      <div className='App'>
        <h1>visibilityChange api在react的使用</h1>
        <video
          autoplay
          loop
          id='video'
          src={
            'https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/The%2BVillage-Mobile.mp4'
          }
          controls='controls'
          width={500}
          height={300}
        />
      </div>
    );
  }
```

```
  // visibilityChange.js

  /**
  * 处理切换页面后视频暂停播放
  * @param {视频的ele} videoElement 
  */
  function useVisibility(videoElement) {
    var hidden, visibilityChange
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
      hidden = 'hidden'
      visibilityChange = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden'
      visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden'
      visibilityChange = 'webkitvisibilitychange'
    }

    const handleVisibilityChange = () => {
      if (document[hidden]) {
        videoElement && videoElement.pause()
      } else {
        videoElement && videoElement.play()
      }
    }

    if (typeof window.document.addEventListener === 'undefined' || typeof document[hidden] === 'undefined') {
      console.log('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.')
    } else {
      // 处理页面可见属性的改变
      window.document.addEventListener(visibilityChange, handleVisibilityChange, false)

      // 当视频暂停，设置title
      // This shows the paused
      window.document.addEventListener('pause', function () {
        window.document.title = 'pause'
      }, false)

      // 当视频播放，设置title
      window.document.addEventListener('play', function () {
        window.document.title = 'play'
      }, false)
    }
  }

  export default useVisibility
```

## 其他可预测的使用场景

- 音视频的播放
- 页面中的轮询操作，比如常见的打包通过轮询接口实时展示打包报文，切换页面后也还在执行，造成资源浪费
- 轮播图是否切换
- 统计页面停留时长、在线时长及浏览量
- 聊天状态及任务完成的通知

