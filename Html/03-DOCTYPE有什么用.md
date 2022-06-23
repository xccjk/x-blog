## DOCTYPE有什么用

DOCTYPE是`document type`的缩写。它是用来在HTML中区分**标准模式**和**怪异模式**的声明，用来**告诉浏览器已哪种方式来解析文档**，必须声明在HTML文档的第一行

使用方式：

```html
<!DOCTYPE html>
...
```

可以通过`document.compatMode`来获取文档使用的那种模式

```javascript
document.compatMode // CSS1Compat
```

### 文档模式

#### 标准模式-CSS1Compat

让浏览器使用W3C的标准来解析渲染页面，在标准模式中，浏览器将会已它支持的最高标准来渲染页面

#### 怪异模式-**BackCompat**

怪异模式下，浏览器会以向后兼容的方式来渲染页面