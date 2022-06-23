# CSS实现水平垂直居中的几种常见 方式

相关demo查看[codesandbox](https://codesandbox.io/s/csschui-zhi-shui-ping-ju-zhong-de-ji-zhong-fang-shi-ivdz27)

## 定宽高

1. flex布局
2. grid布局
    1. grid + margin: auto
    2. grid + place-items: center
3. 绝对定位
    1. transform
    2. top + left + right + bottom
    3. margin + padding
    4. left/top 50% + margin负值
4. table-cell
    1. vertical-align + text-align + inline-block
    2. vertical-align + margin

## 不定宽高

1. flex布局
2. grid布局
    1. grid + flex
    2. grid + margin
3. 绝对定位
    1. transform
4. writing-mode

## 总结

在考虑兼容性的情况下，并且子元素宽高不用固定的情况下，使用下面两种布局方式比较合适

- flex布局
- position + transform