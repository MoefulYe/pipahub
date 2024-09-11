---
created_at: 2023-09-14
modified_at: 2023-09-14
description: 
aliases: 
tags:
  - 软件
title: tmux
---
## 实现ssh会话和终端会话的解耦

|命令|效果|
|--|--|
|tmux|创建匿名会话|
|tmux new|同上|
|tmux new -s \<session-name\>|创建具名会话|
|tmux attach -t \<session-name \| session-id\>|接入会话|
|tmux ls|列出会话|
|tmux rename -t \<session-name \| session-id\>  \<new-name\>|重命名|

## 会话内（ctrl+b作为前导键）

|命令|效果|
|--|--|
|d|分离当前会话|
|b|列出所有会话|
|$|重命名|
|c|创建新会话|

## 窗格（ctrl+b作为前导键）

|命令|效果|
|--|--|
|%|左右split|
|"|上下split|
|\<arrow-key\>|移动光标|
|x|关闭窗格|
|...|...|


## 参考自
[Tmux 使用教程](https://www.ruanyifeng.com/blog/2019/10/tmux.html)