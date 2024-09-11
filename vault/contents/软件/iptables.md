---
created_at: 2024-04-03
modified_at: 2024-04-03
description: 
aliases: 
tags:
  - 网络
  - 端口转发
title: iptables
---
## 端口转发
```bash
iptables -t nat -A PREROUTING -p tcp --dport [端口号] -j DNAT --to-destination [目标IP]
iptables -t nat -A PREROUTING -p udp --dport [端口号] -j DNAT --to-destination [目标IP]
iptables -t nat -A POSTROUTING -p tcp -d [目标IP] --dport [端口号] -j SNAT --to-source [本地服务器IP]
iptables -t nat -A POSTROUTING -p udp -d [目标IP] --dport [端口号] -j SNAT --to-source [本地服务器IP]
```