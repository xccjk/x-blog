# 动态读取及写入json

读取：

```javascript
const getPackageJson = (path) => {
  const packageJson = fs.readFileSync(path);
  return JSON.parse(packageJson);
}
packageJson('./package.json');
```

写入：

```javascript
const writePackageJson = ({ path, json }) => {
  fs.writeFile(path, JSON.stringify(json, null, '\t'), (err) => {
    if (err) console.log('package.json修改失败: ', err);
    console.log('package.json修改成功!');
  })
}
writePackageJson({ path: './package.json', json: packageJson('./package.json') })
```