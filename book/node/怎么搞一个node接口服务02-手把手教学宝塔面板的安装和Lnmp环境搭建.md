# 怎么搞一个node接口服务02-手把手教学宝塔面板的安装和Lnmp环境搭建

## 什么是宝塔面板

宝塔面板是一款使用方便、功能强大且终身免费的服务器管理软件，支持 Linux 与 Windows 系统。在宝塔面板中，您可以一键配置 LAMP、LNMP、网站、数据库、FTP、SSL，还可以通过 Web 端轻松管理服务器

## 服务器安装宝塔面板

1. 按照第一节登录服务器

2. 输入宝塔安装的命令，如果你选择的是centos系统7.x以上的版本输入以下命令👇:

```
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

其他各个版本的则需要输入以下对应版本的命令👇:

```
// Ubuntu/Deepin安装脚本
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh

// Debian安装脚本
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh

// Fedora安装脚本
wget -O install.sh http://download.bt.cn/install/install_6.0.sh && bash install.sh
```

安装的过程中，中途需要输入一次字母Y来确认安装，只需要输入Y字母回车即可继续自动安装了👇:

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208013135541-33248431.png" width="500" />

大于需要1-2分钟左右安装相关的依赖，出现下面的信息既代表成功👇:

**千万要记住登录的用户名密码相关信息**

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208013143230-1054651963.png" width="500" />

`宝塔面板默认端口为8888，需要在服务器的防火墙中放开`

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208014204216-2029598434.jpg" width="500" />

## 在宝塔面板初始化环境`LNMP`

- 打开`http://120.53.247.128:8888/soft`，输入用户名密码登录

- 首次进入面板会提示你安装套件，一般选择推荐的LNMP(推荐)，这个，nginx具有的特点是并发能力强并且占用内存小，所以一般推荐都是安装左边的这个选项了。php等信息如果不是会用到的话就去掉勾选

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208014212475-989649663.jpg" width="500" />

- 然后点击一键安装就会自动的执行安装的过程了，安装过程非常的简单只需要等待大概几分钟左右我们的网站运行环境就会自动的安装好了，这个时候宝塔面板的安装和LNMP环境的安装就完成了
- 安装以及登录成功后，还可以进入软件商店安装自己需要用到的包

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208020207456-2115843177.jpg" width="500" />


[宝塔面板官方文档](https://www.bt.cn/btcode.html)