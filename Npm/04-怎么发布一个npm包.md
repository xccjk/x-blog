# 怎么发布一个npm包

- 创建一个npm账号，一般用邮箱与密码注册登录即可。[npm注册](https://www.npmjs.com/)
- 创建一个文件夹，比如名称为xcc
  - `mkdir xcc && cd xcc`
  - `npm init`
  - 填入你希望的包的名称与版本号即可，假如包的名称为`xcc-standrad-eslint`，版本为`0.1.0`
- xcc文件夹创建index.js文件，随便写点内容即可
- 如果本机第一次发布npm包
  - `npm adduser`
  - 会要求填入用户名与密码，还有邮箱等信息，填写注册npm时的账号即可
  - 信息正确后会出现`Logged in as xxx on https://registry.npmjs.org/.`
- 如果不是第一次发布npm包
  - `npm login`
  - 登录过程同上
- 发布npm包
  - `npm publish`即可
  - 每次更新内容记得改版本号，不然会发布失败的
- 撤销已发布的npm包
  - `npm unpublish xcc-standrad-eslint@0.1.0`

[参考文章](https://zhuanlan.zhihu.com/p/147804428)
