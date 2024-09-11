---
created_at: 2024-07-29
modified_at: 2024-07-29
description: 
aliases: 
tags: 
title: HTTP
---
## Hyper Text Transfer Protocol
`url ::= <Protocol>://[<user>:<passwd>@]<hostname>:<port>/<path>[?<queries>][#<fragment>]`
## 报文结构
![[../../../assets/img/Pasted image 20240729205208.png]]
## 连接方式
- 非持久连接：每一次的传输都需要先进行HTTP握手
    - 传输时间为2×RTT+文件传输时间
	![[../../../assets/img/Pasted image 20240729205318.png]]
- 持久连接：连接建立后会保持一段时间，可以继续传输后续的请求
    - 非流水线式连接：类似停等协议，每一个请求按序发送
    - [[../../考研408/流水线与空间时间并行技术|流水线与空间时间并行技术]]式连接：类似GBN和SR协议，请求可以一起发送
	![[../../../assets/img/Pasted image 20240729205323.png]]
## 历史
### HTTP0.9
- 已过时。只接受GET一种请求方法，没有在通讯中指定版本号，且不支持请求头。由于该版本不支持POST方法，因此客户端无法向服务器传递太多信息。
### HTTP1.0
- 非持续连接
### HTTP1.1
- 长连接
- 管线化 实现并行传输 
### HTTP2.0
- 多路复用
- 头部压缩
- 二进制分帧
- 服务器推送
### HTTP3.0
下层使用**QUIC（Quick UDP Internet Connections）** 协议
