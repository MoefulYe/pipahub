---
created_at: 2024-07-25
modified_at: 2024-07-25
description: 
aliases: 
tags:
  - 计算机网络
title: MAC地址
---
Media Access Control Address，MAC地址用于在网络中唯一标示一个网卡，一台设备若有一或多个网卡，则每个网卡都需要并会有一个唯一的MAC地址。
MAC地址6字节=48位。第一个byte的最低有效位元(LSB)为单播地址(0)/多播地址(1)，第一个byte从最低有效位元数去第2个bit为广域地址(0)/区域地址(1)。前3~24位元由IEEE决定如何分配给每一家制造商，且不重复，后24位元由实际生产该网路设备的厂商自行指定且不重复。
## 特殊的MAC地址
- `ff:ff:ff:ff:ff:ff`广播地址
- 组播地址 [[../网络层/组播#MAC组播|IGMP与组播]]