---
created_at: 2023-10-05
modified_at: 2023-10-05
description: 
aliases: 
tags:
  - 软件
  - 调试
title: gdb
---

  
## 可视化前端
[gdb-dashboard](https://github.com/cyrus-and/gdb-dashboard)
## 命令
### 启动gdb
```shell
❯ gdb /path/to/executable
```
### 启动进程
```
run
r
```
### 设置启动参数
```
set args <args> ...
```
### 启动跟着启动参数
```
run <args> ...
r <args> ...
```
### attach
```
attach <pid | process###name>
```
### 单步调试
#### step in
```
step
s
```
#### step over
```
next
n
```
#### instruction level single step
```
stepi
si
```
#### instruction level single step over
```
nexti
ni
```
#### Step out of the currently selected frame
```
finish
```
#### Return immediately from the currently selected frame, with an optional return value
```
return <return-expression>
```
#### until
退出循环
```
until
u
until <line-num>
```
### 修改内存/变量
```
set <var> = <value>
set *<addr> = <value>
```

### 查看信息
#### 查看参数
```
i(info) args
```
#### 查看变量类型
```
ptype 变量或者类型
```
#### 查看寄存器
```
info registers
```
#### 查看内存
```
x
```
#### 查看源代码
```
set listsize 20
list <function-name>
```
#### 查看变量
```
p a
```
#### 查看栈帧
```
frame
```
#### display
```
display
undisplay
```
### 断点
#### 设置断点

- `(gdb) break <函数名>`：对当前正在执行的文件中的指定函数设置断点。可简写为：(gdb) b <函数名>
- `(gdb) break <行号>`：对当前正在执行的文件中的特定行设置断点。可简写为：(gdb) b <行号>
- `(gdb) break <文件名：行号>`：对指定文件的指定行设置断点。最常用的设置断点方式。可简写为：(gdb) b <文件名：行号>
- `(gdb) break <文件名：函数名>`：对指定文件的指定函数设置断点。C++类中的方法似乎不好使。可简写为：(gdb) b <文件名：函数名>
- `(gdb) break <+/-偏移量>`：当前指令行+/-偏移量出设置断点。可简写为：b <+/-偏移量>
- `(gdb) break <*地址>`：指定地址处设置断点。可简写为：b <*地址>

#### 查看、删除断点

- `(gdb) info break`：显示所有断点以及监视点。可简写为：(gdb) i b
- `(gdb) delete <编号>`：删除编号指向的断电或者监视点。可简写为：(gdb) d <编号>
- `(gdb) clear <行号>`：删除该行的断点
- `(gdb) clear <文件号：行号>`：删除该行的断点

#### 设置无效、有效断点

- `(gdb) disble <断电编号>`：当前断点设置为无效
- `(gdb) enable`：当前断点设置为有效

#### 监视点

可以监视某个变量，在变量被访问或者被修改时程序会在当前点进入断点。删除，查看监视点的方式与断点相同。设置监视点方式如下：

- `(gdb) watch <表达式>`：表达式发生变化时暂停
- `(gdb) awatch <表达式>`：表达式访问或者改变时暂停
- `(gdb) rwatch <表达式>`：表达式被访问时暂停

#### 条件断点

在调试程序过程中，有时候我们只想在某个条件下停止程序，然后进行单步调试，而条件断点就是为此而设计。下面是条件断点的操作方式：

- `(gdb) b <断点> if <条件表达式>` : 例如：b main.cpp:8 if x=10 && y=10
- `(gdb) condition <断点编号>`：删除该断点的条件。
- `(gdb) condition <断点编号> <条件表达式>`：修改断点条件。例如：condition 1 x=10 && y=10

#### 断点命令

每次断点发生时候，想要查看的变量很多时，如果每个变量都手动 print 需要浪费很多时间。断点命令可以在断点发生时批量执行GDB命令。下面是断点命令的设置方式：

- `(gdb) commands <断点编号>`
- `(gdb) >print x`
- `(gdb) >print y`
- `(gdb) >end`  
    首先输入 GDB 命令 commands <断点编号> 然后回车，这时候会出现> 提示符。出现> 提示符后可以输入断点发生时需要执行的GDB命令，每行一条，全部输入完成后输入end结束断点命令。
## 进入tui模式
`ctrl+x+a`
