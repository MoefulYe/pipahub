---
created_at: 2024-08-10
modified_at: 2024-08-10
description: 
aliases: 
tags: 
title: pic调用
---
![Pasted image 20240810192421](https://r2.pipago360.site/pupahub/2024/09/dc7a5fd556096ab7d82cae0dafc29068.png)
- 过程链接表(PLT)。PLT是一个数组，其中每个条目是16字节代码。PLT[0]是一
个特殊条目，它跳转到动态链接器中。每个被可执行程序调用的库函数都有它自己
的 PLT条目。每个条日都负责调用一个具体的函数。PLT[1](图中未显示)调用系
统启动函数(__libc_startmain),它初始化执行环境，调用main函数并处理其
返回值。从 PLT[2]开始的条目调用用户代码调用的函数。在我们的例子中，PLT
[2]调用 addvec,PLT[3](图中未显示)调用printf。
