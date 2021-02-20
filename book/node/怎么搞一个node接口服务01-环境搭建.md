# 怎么搞一个node接口服务01-环境搭建

背景：最近在做一个公司内部使用的内部监控系统，需要使用node写一些api接口，很久没怎么写node了，就把流程都走了一遍

这个主要针对新人来，写一个详细的入门教程。采用react+express+mongodb

## 服务器

1. 选购一台服务器，我自己购买的腾讯云nodejs服务器(没抢到其他的)，centos环境，配置信息如下👇：

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208003640838-441161437.jpg" width="500" />

2. 配置服务器登录信息，设置登录密码

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208004450335-2034723081.jpg" width="500" />

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208004501146-2002300579.jpg" width="500" />

3. 采用ssh登录Linux实例

[腾讯ssh登录实例文档](https://cloud.tencent.com/document/product/213/35700)

```
// 登录命令
ssh <username>@<hostname or IP address>

// root权限登录服务器
sudo ssh root@120.53.247.128
```

下面这样既代表登录服务器成功

<image src="https://img2020.cnblogs.com/blog/1018377/202102/1018377-20210208005854524-695139330.jpg" width="500" />

## 环境安装

因为我的是node服务器，所以node与npm不需要安装，如果是其他类型的服务器，需要安装node与npm

`如果比较熟悉Linux命令，那么通过命令安装相关依赖就可以了，如果不是特别清楚，可以通过宝塔面板来进行服务器的可视化操作`

需要安装：nvm，pm2，nginx，git，node，npm

### 安装nginx，pm2，git

```
sudo yum install -y nginx git pm2
```

### nvm安装

使用curl安装

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

使用wegt安装
```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

或者
```
git clone git://github.com/creationix/nvm.git ~/nvm
```

安装过程中遇到的问题：

`Failed connect to raw.githubusercontent.com:443; 拒绝连接`

解决方式：

[解决GitHub的raw.githubusercontent.com无法连接问题](https://www.cnblogs.com/qiu-hua/p/12815425.html)

1. 通过[IPAddress.com](https://githubusercontent.com.ipaddress.com/raw.githubusercontent.com)查询raw.githubusercontent.com对应的IP地址
2. 修改hosts文件，在Linux系统通过`sudo vi /etc/hosts`
3. 在hosts文件结尾加上查询出来的`199.232.96.133 raw.githubusercontent.com`


### nvm使用

nvm的作用是用来安装多个不同版本的nodejs，可以随时切换版本。实际工作中可能很多node项目的node版本依赖并不相同，因此需要通过nvm安装多个版本nodejs

设置nvm自动运行

```
echo "source ~/nvm/nvm.sh" >> ~/.bashrc
source ~/.bashrc
```

查看node版本列表

```
nvm list-remote
```

安装指定版本node

```
nvm install v12.16.3
```

切换node版本

```
nvm use v12.16.3
```

到了这一步，就把服务器的环境相关给安装好了，下一节介绍通过`宝塔面板`来登录及使用服务器
