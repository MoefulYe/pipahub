---
created_at: 2024-07-29
modified_at: 2024-07-29
description: 
aliases: 
tags:
  - 计算机网络
title: UDP
---
## User Datagram Protocol
UDP只在IP数据报服务之上增加了很少功能，即复用分用和差错检测功能。
- UDP是**无连接**的
- UDP**不保证可靠交付**
- UDP**对上提供的是报文式API**
- UDP无拥塞控制，适合很多实时应用
- UDP首部开销小
## 首部格式
![Pasted image 20240729172012](https://r2.pipago360.site/pupahub/2024/09/0fb46842f549b2dc803c6b4233837a9f.png)
- 源端口号（16位，2B）：**可选填**，当需要目的主机回应时使用，**0表示为空**
- 目的端口号（16位，2B）：必要，目的进程的端口号
- UDP长度（16位，2B）：**整个UDP数据报的长度（首部字段+数据字段）**
- UDP检验和（16位，2B）：检测**整个**UDP数据报是否有错误 **全0表示跳过检验** [[../校验和|校验和]]
- 合计8B