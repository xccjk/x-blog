# 基于CI/CD快速部署项目

## 发布流程

记得以前做发布时，是在本地运行构建命令，打包好后把打包的文件夹通过ftp之类的工具上传到服务器指定目录，配置nginx，域名及服务器相关即可，流程如下：  

```
编写代码 -> 测试 -> 提交代码到仓库 -> 打包构建 -> ftp上传到服务器指定目录 -> 配置代理，域名，服务器相关
```

当项目在频繁的发布时，`打包构建 -> ftp上传到服务器指定目录`流程需要每次手动操作，不仅容易出现人为操作失误，而且效率低下，CI/CD的出现就是为了解决重复的手动操作 


---


## 了解什么是CI/CD

CI指的持续集成，会将指定分支提交的代码进行构建、测试
CD指的持续交付/持续部署，会将指定分支的新更改，在执行了自动构建、测试流程后，自动部署项目到指定的环境  

```
  CI/CD 是一种通过在应用开发阶段引入自动化来频繁向客户交付应用的方法。CI/CD 的核心概念是持续集成、持续交付和持续部署。作为一个面向开发和运营团队的解决方案，CI/CD 主要针对在集成新代码时所引发的问题（亦称：“集成地狱”）
```

## 服务器选购

该项目主要是平时用来做做测试之类的，买个普通的服务器就行了。我自己是购买了个1核2G的云服务器，3年253
购买服务器时选择一个机遇linux环境即可，我选购的是Linux服务器nodejs镜像的(活动期间没有其他镜像的了)

[腾讯云服务器选购地址](https://cloud.tencent.com/act/double11?from=13605)

## 服务器登录相关

在腾讯云控制台里可以登录，也可以通过ssh进行登录
[ssh登录Linux实例文档](https://cloud.tencent.com/document/product/1207/44643)
我采用的是ssh的密码登录，命令行功工具指定`ssh <username>@<IP address or domain name>`，username即用户名称，后面是服务器公网IP，比如我的`[root@VM-8-2-centos ~]# `，ip为`120.53.247.128`，命令就为`ssh root@120.53.247.128`，密码为配置的服务器登录密码

## 可视化的服务器界面

很多同学不熟悉Linux命令，可以采用可视化的服务器面板，推荐`宝塔Linux面板`
- [官方宝塔面板安装文档](https://cloud.tencent.com/document/product/213/45550)
- [写的非常全的宝塔面板安装教程](非常全的宝塔面板安装教程)
- 可能会遇到的问题
  - 权限不足，导致安装失败的情况，通过在命令行输入`sudo yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh`
  - `服务器未开启8888端口`，在服务器控制台的`防火墙 -> 添加规则 -> TCP 8888端口`
- `注意事项`
  - 在安装成功，命令行中会显示宝塔面板的链接与用户名+密码

## LNMP

在宝塔面板登录成功够，会出现推荐安装的套件，安装官方推荐就行，安装过程中可能会出现安装失败的问题，多试几次就好了

## jenkins安装及配置

首先检查服务器是否安装Java环境，终端输入`java --version`，如果出现对应版本即安装了，不存在的时候`sudo yum install java`

安装下载工具wget
```
  wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
```

导入下载秘钥

```
  rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

安装Jenkins

安装过程中会提示是否继续安装之类的，输入yes就可以了

```
  sudo yum install jenkins
```

## jenkins常用命令

启动Jenkins

`start jenkins service`

设置Jenkins开机自启动 

`enable jenkins service`

关闭Jenkins

`stop jenkins service`

查看jenkins状态

`status jenkins service`

查看Jenkins相关文件路径

`rpm -ql jenkins`

查看Jenkins端口号

`cat /etc/sysconfig/jenkins `

修改Jenkins端口号

`vi /etc/sysconfig/jenkins`

## 初始化jenkins

- 启动jenkins，`start jenkins service`
- 服务器开启8080端口，同之前的8888端口
- 打开`<ip>:8080`端口及可看到jenkins登录面板
