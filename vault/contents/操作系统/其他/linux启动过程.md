---
created_at: 2024-07-15
modified_at: 2024-07-15
description: 
aliases: 
tags:
  - 操作系统
  - 计算机组成原理
  - linux
title: linux启动过程
---
## 过程
1. 固件阶段（**bios, uefi**）以bios为例
	- 上电复位
	- 开机自检
	- 初始化相关硬件
	- 移交控制权把控制权移交给有下一阶段启动程序的设备 优先级由启动顺序指定（**Boot Sequence**）
2. 主引导记录（**MBR**）或者**GPT** [[../../计算机组成原理/io/机械硬盘#分区]]
	- mbr结构
		- 第1-446字节：调用操作系统的机器码。
		- 第447-510字节：分区表（Partition table）。
		- 第511-512字节：主引导记录签名（0x55和0xAA）。
	- BIOS 启动在“BIOS 硬盘顺序”中第一块硬盘上的前 440 字节代码
	- 把控制权移交给启动分区或者是引导加载器
3. 引导加载器（**bootloader**）比如**grub**
	它负责用想要的[内核参数](https://wiki.archlinuxcn.org/wiki/%E5%86%85%E6%A0%B8%E5%8F%82%E6%95%B0 "内核参数")加载内核，并根据配置文件[初始化 RAM 磁盘](https://wiki.archlinuxcn.org/wiki/Mkinitcpio "Mkinitcpio")，移交控制权给操作系统内核
4. 启动内核
	- 挂载**initramfs**，从而能加载必要的模块
	- 执行initramfs中的 **/init**（通常是**systemd**）进入早期用户空间（**early userspace**）
5. init
	- init进程加载必要的内核模块，并把根文件系统换成真正的根文件系统 操作系统启动完成
	- init启动守护进程成为所有一般进程的祖先
## 0号进程、1号进程、2号进程
- idle进程(PID = 0)：由系统自动创建, 运行在内核态。其前身是系统创建的第一个进程，也是唯一一个没有通过fork或者kernel_thread产生的进程。
- init进程(PID = 1)：由idle通过kernel_thread创建，在内核空间完成初始化后, 加载init程序, 并最终运行在用户空间
- kthreadd(PID = 2)：由idle通过kernel_thread创建，并始终运行在内核空间, 负责所有内核线程的调度和管理。
## 其他
- [[../../计算机组成原理/存储系统/ddr#内存初始化|内存初始化]]
## 参考
[archwiki对启动过程的介绍](https://wiki.archlinux.org/title/Arch_boot_process)
https://www.zhihu.com/people/mikewolfwoo
https://zhuanlan.zhihu.com/p/25281151
https://wiki.archlinuxcn.org/wiki/UEFI
https://www.ruanyifeng.com/blog/2013/02/booting.html
https://www.ruanyifeng.com/blog/2013/08/linux_boot_process.html