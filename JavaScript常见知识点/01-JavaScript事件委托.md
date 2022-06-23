# JavaScript事件委托

## 什么是事件委托？

利用JavaScript事件冒泡动态为元素绑定事件的方法称为事件委托。

事件委托就是把原本需要绑定在子元素上的事件委托到它的父元素，让父元素监听子元素的冒泡事件，并在子元素发生事件冒泡时找到这个子元素。

## 为什么需要事件委托

页面的事件个数会直接影响页面的整体性能，因为每个事件处理程序都是对象，对象会占用内存，内存中的对象越多，页面的性能越差

事件会频繁的操作DOM元素，DOM元素的操作会引起浏览器的重绘与重排

事件委托优点：

1. 减小内存消耗
2. 动态绑定事件

## 事件委托原理

事件委托是利用事件冒泡来实现的，流程：

- 确定要添加事件的父级元素
- 给父元素定义事件，监听子元素的冒泡事件
- 通过event.target来定位触发事件冒泡的子元素

不采用事件委托绑定事件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>不采用事件委托绑定事件</title>
  </head>
  <body>
    <ul id="app">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </body>
</html>
<script>
  window.onload = () => {
    const app = document.getElementById('app')
    const children = app.getElementsByTagName('li')
    for (let i = 0; i < children.length; i++) {
      children[i].onclick = () => {
        alert(children[i].innerHTML)
      }
    }
  }
</script>
```

采用事件委托绑定事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>采用事件委托绑定事件</title>
  </head>
  <style>
    #app{
      width: 300px;
      background: yellow;
    }
    li {
      width: 30px;
      height: 30px;
      background: #ccc;
      list-style-type: none;
    }
  </style>
  <body>
    <ul id="app">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </body>
</html>
<script>
  window.onload = () => {
    const app = document.getElementById("app");
    app.onclick = (e) => {
      alert(e.target.innerHTML);
    };
  };
</script>

```

[在线demo](https://codesandbox.io/s/javascriptshi-jian-wei-tuo-demo-j8lohp?file=/index.html:365-385)

## 总结

- 只有能够发送事件冒泡的事件才可以使用事件委托
- 事件委托可以提高页面性能
- 事件委托可以实现动态绑定事件







