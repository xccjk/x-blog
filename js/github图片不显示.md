### github上图片不显示

1. 运行环境mac pro
2. 命令行输入```sudo vi /etc/hosts```，需要输入电脑密码
3. 命令行打开hosts文件后，输入```i```，下面会出现-- INSERT --后就可以输入内容了
4. 将下面内容拷贝到hosts文件最下面

```
  # GitHub Start 
  192.30.253.112    Build software better, together 
  192.30.253.119    gist.github.com
  151.101.184.133    assets-cdn.github.com
  151.101.184.133    raw.githubusercontent.com
  151.101.184.133    gist.githubusercontent.com
  151.101.184.133    cloud.githubusercontent.com
  151.101.184.133    camo.githubusercontent.com
  151.101.184.133    avatars0.githubusercontent.com
  151.101.184.133    avatars1.githubusercontent.com
  151.101.184.133    avatars2.githubusercontent.com
  151.101.184.133    avatars3.githubusercontent.com
  151.101.184.133    avatars4.githubusercontent.com
  151.101.184.133    avatars5.githubusercontent.com
  151.101.184.133    avatars6.githubusercontent.com
  151.101.184.133    avatars7.githubusercontent.com
  151.101.184.133    avatars8.githubusercontent.com
  # GitHub End
```

6. 按esc，wq保存即可