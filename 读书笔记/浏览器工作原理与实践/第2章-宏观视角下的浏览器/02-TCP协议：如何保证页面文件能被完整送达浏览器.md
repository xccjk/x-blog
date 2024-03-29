# TCP协议：如何保证页面文件能被完整送达浏览器

## 数据传输的方式

互联网实际上是一套理念和协议组成的体系架构。数据的传输是通过数据包的形式来传输的，如果发送的数据很大，那么该数据会被拆分为很多小数据包来传输。下面会从三个角度来讲述数据的传输过程：

- 数据包如何送达主机
- 主机如何将数据包转交给应用
- 数据是如何完整的送达应用程序

### IP：把数据包送达目的主机

数据包要在互联网上传输，需要符合**网际标准**(Internet Protocol，简称IP)标准。

每个设备都具有唯一的地址，计算机的地址称为IP地址，访问任何网站实际上只是你的计算机向另外一台计算机请求信息。

数据包的传输方式：

- 主机A应用上层将数据包传输给网络层
- 网络层将IP信息包裹在数据包上，形成新的IP数据包，并传输给底层
- 底层通过物理网络将数据包传输给主机B
- 数据包到达主机B的网络层，主机B拆下数据包中的IP信息，将数据交给应用上层
- 数据包最终到达主机B的上层

### UDP：把数据送达应用程序

**IP是非常底层的协议，只负责把数据传送到对方电脑上，但是并不知道把数据传给哪个程序**

基于IP协议上开发的**能和应用打交道的协议**，简称**用户数据包协议**，简称UDP。UDP最重要的信息就是**端口号**，每个应用程序都需要绑定一个端口号，UDP通过端口号就能把数据传输给指定的程序了。

**所以IP协议通过IP地址信息把数据包传输给指定的电脑，而UDP通过端口号把数据包分发给指定的程序**

数据包的传输方式：

- 主机A应用上层将数据传输到传输层
- 传输层添加UDP头，生成数据+目标端口的新数据包，新数据包传输到网络层
- 网络层添加IP头，新数据包传输到物理网络
- 数据包到达主机B的网络层，拆分下IP信息，其它数据传输到传输层
- 传输层拆下UDP信息，并将数据包根据端口号交给指定的上层应用
- 数据包到达指定上层应用

UDP协议可以效验数据的正确性，但是UDP不会提供从发机制，因此当出现各种外部原因导致数据包错误是，数据会出错。**UDP保证不了数据可靠性，但是传输速度非常快**

### TCP：把数据完整送达应用层程序

UDP协议存在的问题：

- 数据包传输过程容易丢失
- 当大文件拆分为很多肖文杰传输时，小的数据包会经过不同的路由，并在不同的数据到达接收端，UDP协议不知道如何组装数据包，因此不能还原整个文件

**TCP：是一种面向连接的、可靠的、基于字节流的传输层通信协议**，有下面三个特点：

- 对于数据包丢失问题，提供了重传机制
- TCP引入了数据包排序机制，用来保证把乱序的数据包组合成一个完整的文件
- TCP除了包含目标端口和本机端口号外，还提供了用于排序的序列号，用来在接收端组装数据包

数据包的传输方式：

- 主机A应用上层将数据传输到传输层
- 传输层添加TCP头，生成数据+目标端口+本机端口+序列号的新数据包，新数据包传输到网络层
- 网络层添加IP头，新数据包传输到物理网络
- 数据包到达主机B的网络层，拆分下IP信息，其它数据传输到传输层
- 传输层拆下UDP信息，并将数据包根据端口号交给指定的上层应用
- 数据包到达指定上层应用

#### TCP连接的三个阶段

- 建立连接
- 传输数据
- 断开连接

## 总结

- 互联网中的数据都是通过数据包来传输的，数据包在传输的过程中容易丢失或出错
- IP负责把数据包送达目的主机
- UDP负责把数据包送达具体应用
- TCP保证了数据的完整传输，它的连接可以分为三个阶段：建立阶段、传输数据、断开连接