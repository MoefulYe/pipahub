---
created_at: 2024-08-10
modified_at: 2024-08-10
description: 
aliases: 
tags: 
title: clang
---
## man clang中的说明

![Pasted image 20240810171216](https://r2.pipago360.site/pupahub/2024/09/66d9e0faf0f26a6f44b850ed26bf5764.png)
- 预处理 通常会处理代码中的 `#`开头的预编译指令，对源代码做分词处理，得到token流
- 语法分析与语义分析 把token流解析成语法树，并对语法树做语义分析，输出是抽象语法树
- 代码生成与优化 把ast进一步降解成llvm ir，并在llvm ir层面对代码做优化，处理目标相关的代码生成，输出汇编文件（也可以直接调用内部的汇编器直接生成目标文件）
- 汇编 运行汇编器把汇编代码转换成目标代码
- 链接 把多个目标文件链接成一个可执行文件或者动态库
### 跟编译流程相关的参数
![Pasted image 20240810172845](https://r2.pipago360.site/pupahub/2024/09/127a0f57670bb6f42e096acba1a34c03.png)
- `-E` 运行预处理器
- `-fsyntax-only` 只作语法检查
- `-S`生成汇编
- `-c`生成目标文件
- `-S --emit-llvm` 生成llvm ir 
	![Pasted image 20240810173447](https://r2.pipago360.site/pupahub/2024/09/595da188a27fd4ee4c42b1101d9835ce.png)
- `-emit-llvm -c` 生成llvm字节码，可以看成有一个虚拟的指令集能够执行llvm字节码，生成了这个虚拟平台的目标文件，llvm字节码能用`lli`解释器解释执行
![Pasted image 20240810173858](https://r2.pipago360.site/pupahub/2024/09/84871e710ffbdb351f69cdd54ed111de.png)
- 不指定上述选项，所有的阶段都会运行生成可执行文件或者动态库文件
## 一些操作
### 生成动态库
`clang -shared -fPIC files...`
### 生成静态库
- 生成目标文件
`clang -c tmp.c -o tmp.o`
- 生成静态归档库
`ar [...options] libfile files...`
	- c 如果需要生成新的库文件，不要警告
	- r 代替库中现有的文件或者插入新的文件
	- v 输出详细信息
查看静态归档库内容
```
❯ ar t libtmp.a
tmp.o
```
