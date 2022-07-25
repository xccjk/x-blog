## HTML行内元素、块级元素、空元素

### 行内元素

一个行内元素只占据它对应标签的边框所包含的空间，不会重新起一行

常见的行内元素：

```html
<a/>
<img/>
<br/>
<span></span>
<em></em>
<strong></strong>

<button></button>
<input/>
<label></label>
<select></select>
<textarea></textarea>
```

[常见行内元素 mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Inline_elements)

### 块级元素

块级元素占据其父元素的整个水平空间，垂直空间为其高度，并且块级元素会新起一行

常见块级元素：

```html
<p></p>
<h1></h1>
<div></div>
<ul></ul>
<header></header>
<footer></footer>
...
```

[常见块级元素 mdn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)

### 空元素

空元素就是**没有内容**的 HTML 元素,是在**开始标签**中就**关闭**的元素

常见的空元素：

```html
<br/>
<img>
<input>
<link>
...
```

[常见空元素 mdn](https://developer.mozilla.org/zh-CN/docs/Glossary/empty_element)

### 行内元素与块级元素对比

1. 行内元素不会新起一行，块级元素会新起一行
2. 行内元素只能包含数据或者其他行内元素，而块级元素可以包含数据、块级元素、行内元素