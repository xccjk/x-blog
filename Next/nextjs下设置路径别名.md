# nextjs下设置路径别名的方式

## 项目使用了ts

新建tsconfig.json
```
{
  "compilerOptions": {
    ...
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 未使用ts

新建jsconfig.json

```
{
  "compilerOptions": {
    ...
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
