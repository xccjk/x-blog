# 微信小程序swiper禁止手动切换

给swiper设置catchtouchmove为true，设置swiper-item的catchtouchmove返回false

```javascript
<swiper
  class="swiper"
  indicator-dots="{{false}}"
  circular
  autoplay="{{true}}"
  vertical="{{true}}"
  interval="{{3000}}" 
  duration="{{300}}"
  easing-function="easeInOutCubic"
  catchtouchmove="true"
>
  <block wx:for="{{list}}" wx:key="index">
    <swiper-item catchtouchmove="stopChange">
      <view class="swiper-item">{{item.name}}</view>
    </swiper-item>
  </block>
</swiper>

stopChange() {
  return false
}
```

