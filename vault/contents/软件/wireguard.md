---
created_at: 2024-02-25
modified_at: 2024-02-25
description: 
aliases: 
tags:
  - 网络
  - vpn
title: WireGuard
---

## 安装 
`apt install wireguard`


## 配置
### 生成服务器和客户端的私钥与公钥
```bash
root@VM-4-5-debian:~/wireguard# wg genkey | tee pri-server | wg pubkey > pub-server
root@VM-4-5-debian:~/wireguard# for i in {0..3}; do wg genkey | tee pri-client-${i} | wg pubkey > pub-client-${i}; done
root@VM-4-5-debian:~/wireguard# ls
pri-client-0  pri-client-1  pri-client-2  pri-client-3  pri-server  pub-client-0  pub-client-1  pub-client-2  pub-client-3  pub-server
```

### 服务器端配置文件
```
# /etc/wireguard/wg0.conf
[Interface]
PrivateKey = iGLBif5e92Ck3TraUh748ZFuguVUc84YoDQaL4J5mns= # 填写本机的privatekey 内容
Address = 192.168.254.1/24 #本机虚拟局域网IP
ListenPort = 52018

#注意eth0需要为本机网卡名称
PostUp   = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -A FORWARD -o wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -D FORWARD -o wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

# laptop
[Peer]
PublicKey = k+IKnRC/GedWjJyUVzW+Qc0MnLvzCImYp4/ZOs8J7Fc= #自动client1的公钥
AllowedIPs = 192.168.254.2/32 #客户端所使用的IP
```


### 客户端配置文件
```
[Interface]
Address = 192.168.254.2/24 # 你的节点IP
PrivateKey = SCMs9Qi873TkgsHVoOblBoQoNs9XsUpL9DEjwLbBq1M= # 你生成的私钥

[Peer]
PublicKey = urHDgSx3WFQC9vKFJVft1aqJjKu5XGOMcWNdkiBsNVU= # 对方的公钥
AllowedIPs = 192.168.254.0/24 # 路由IP，指示指定的网段走这个端口
Endpoint = 192.168.254.1:52018 # 对面的IP 不是虚拟局域网的ip
PersistentKeepalive = 25
```

### 运行配置
```bash
root@VM-4-5-debian:~/wireguard# wg-quick up wg0 #用down子命令来关闭虚拟局域网
[#] ip link add wg0 type wireguard
[#] wg setconf wg0 /dev/fd/63
Warning: AllowedIP has nonzero host part: 192.168.254.2/24
[#] ip -4 address add 192.168.254.1/24 dev wg0
[#] ip link set mtu 1420 up dev wg0
[#] iptables -A FORWARD -i wg0 -j ACCEPT; iptables -A FORWARD -o wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```
### 添加到守护进程
```bash
root@VM-4-5-debian:~/wireguard# systemctl enable wg-quick@wg0.service
Created symlink /etc/systemd/system/multi-user.target.wants/wg-quick@wg0.service → /lib/systemd/system/wg-quick@.service.
```

### 使用wg查看状态
```bash
root@VM-4-5-debian:~/wireguard# wg
interface: wg0
  public key: urHDgSx3WFQC9vKFJVft1aqJjKu5XGOMcWNdkiBsNVU=
  private key: (hidden)
  listening port: 52018
peer: k+IKnRC/GedWjJyUVzW+Qc0MnLvzCImYp4/ZOs8J7Fc=
  endpoint: 112.12.195.236:14017
  allowed ips: 192.168.254.2/32
  latest handshake: 1 minute, 47 seconds ago
  transfer: 47.60 KiB received, 1.04 MiB sent
```

### ios连接到WireGuard
使用官方app

## 问题
服务器节点和客户端节点之间可以ping通，但是客户端节点之间不可达。
原因没有内核没有开启路由转发
方法修改`/etc/sysctl.conf`添加`net.ipv4.ip_forward = 1`执行`sysctl -p`