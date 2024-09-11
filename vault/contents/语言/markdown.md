---
created_at: 2024-03-26
modified_at: 2024-03-26
description: 
aliases: 
tags:
  - 标记语言
title: Markdown
---
## 标题
```markdown
#
##
###
####
#####
######
```
## 段落
段落没有特殊的格式，直接编写文字就好，**段落的换行是使用两个以上空格加上回车**

## 字体
*斜体* 
**加粗** 
***粗斜体***  
~~删除线~~ 
```markdown
~~删除~~
*斜体*
**加粗**
***加粗斜体***
```
## 分割线
---
\-\-\-

## 脚注

创建脚注格式类似这样 [^RUNOOB]。

[^RUNOOB]: 菜鸟教程 -- 学的不仅是技术，更是梦想！！！
```markdown
创建脚注格式类似这样 [^引用的标识符]。

[^引用的标识符]: 菜鸟教程 -- 学的不仅是技术，更是梦想！！！
```
## 列表
### 无序列表
- a
- b
- c
```markdown
- a
- b
- c
```
### 有序列表
1. a
2. b
3. c
```markdown
1. a
2. b
3. c
```
### 嵌套列表

## 块引用

> 区块引用
> 菜鸟教程
> 学的不仅是技术更是梦想

> 最外层
> > 第一层嵌套
> > > 第二层嵌套


```markdown
> 区块引用
> 菜鸟教程
> 学的不仅是技术更是梦想

> 最外层
> > 第一层嵌套
> > > 第二层嵌套
```

## 代码

```c
int a = 1;
```

```markdown
```c
int a = 1;
`` `
```

```
### 行内代码
`inline`
```markdown
`inline`
```

## 链接

[百度](https://www.baidu.com)
<https://www.baidu,com>

```markdown
[百度](https://www.baidu.com)
<https://www.baidu,com>
```

### 高级链接

```markdown
这个链接用 1 作为网址变量 [Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）

  [1]: http://www.google.com/
  [runoob]: http://www.runoob.com/
```
这个链接用 1 作为网址变量 [Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）

  [1]: http://www.google.com/
  [runoob]: http://www.runoob.com/

## 图片
```
![alt](url title)
```

![百度](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png "baidu")
### 使用变量
[百度][baidu_img]
  [baidu_img]: https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png
  

## 表格

```markdown
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

| 左对齐   aaaaa | aaaaa  右对齐 | aaaaaa 居中对齐 |
| :---------- | ---------: | :---------: |
| 单元格         |        单元格 |     单元格     |
| 单元格         |        单元格 |     单元格     |
## 公式
latex语法

## markdown是html的超集
