---
created_at: 2024-03-26
modified_at: 2024-03-26
description: 
aliases: 
tags:
  - 前端
  - html
  - 标记语言
title: html
---
## html头`<head>`
`<title>` 标题
`<meta>` 元信息
`<link>` 链接

## 网页结构

`<header>`
`<nav>`
`<main>`
`<aside>`
`<footer>`
`<section>`通用独立章节
`<article>`
`<br/>`换行
`<hr/>` 水平分割线 [[markdown#分割线]]

## 无语义元素
`<span>` `<div>`
## 文本结构
- 标题 `<hN>` $N \in [1,6]$ [[markdown#标题]]
- 段落 `<p>` [[markdown#段落]]
- 列表 [[markdown#列表]]
```html
<ol>
	<li>a</li>
	<li>b</li>
</ol>
```
<ol>
	<li>a</li>
	<li>b</li>
</ol>
```html
<ul>
	<li>a</li>
	<li>b</li>
</ul>
```
<ul>
	<li>a</li>
	<li>b</li>
</ul>
### 嵌套列表

```html
<ol>
  <li>
    先用蛋白一个、盐半茶匙及淀粉两大匙搅拌均匀，调成“腌料”，鸡胸肉切成约一厘米见方的碎丁并用“腌料”搅拌均匀，腌渍半小时。
  </li>
  <li>
    用酱油一大匙、淀粉水一大匙、糖半茶匙、盐四分之一茶匙、白醋一茶匙、蒜末半茶匙调拌均匀，调成“综合调味料”。
  </li>
  <li>
    鸡丁腌好以后，色拉油下锅烧热，先将鸡丁倒入锅内，用大火快炸半分钟，炸到变色之后，捞出来沥干油汁备用。
  </li>
  <li>
    在锅里留下约两大匙油，烧热后将切好的干辣椒下锅，用小火炒香后，再放入花椒粒和葱段一起爆香。随后鸡丁重新下锅，用大火快炒片刻后，再倒入“综合调味料”继续快炒。
    <ul>
      <li>
        如果你采用正宗川菜做法，最后只需加入花生米，炒拌几下就可以起锅了。
      </li>
      <li>如果你在北方，可加入黄瓜丁、胡萝卜丁和花生米，翻炒后起锅。</li>
    </ul>
  </li>
</ol>


```

<ol>
  <li>
    先用蛋白一个、盐半茶匙及淀粉两大匙搅拌均匀，调成“腌料”，鸡胸肉切成约一厘米见方的碎丁并用“腌料”搅拌均匀，腌渍半小时。
  </li>
  <li>
    用酱油一大匙、淀粉水一大匙、糖半茶匙、盐四分之一茶匙、白醋一茶匙、蒜末半茶匙调拌均匀，调成“综合调味料”。
  </li>
  <li>
    鸡丁腌好以后，色拉油下锅烧热，先将鸡丁倒入锅内，用大火快炸半分钟，炸到变色之后，捞出来沥干油汁备用。
  </li>
  <li>
    在锅里留下约两大匙油，烧热后将切好的干辣椒下锅，用小火炒香后，再放入花椒粒和葱段一起爆香。随后鸡丁重新下锅，用大火快炒片刻后，再倒入“综合调味料”继续快炒。
    <ul>
      <li>
        如果你采用正宗川菜做法，最后只需加入花生米，炒拌几下就可以起锅了。
      </li>
      <li>如果你在北方，可加入黄瓜丁、胡萝卜丁和花生米，翻炒后起锅。</li>
    </ul>
  </li>
</ol>

- 强调 `<em>` <em>强调</em> `<strong>` <strong>非常强调</strong>
- <b>粗体</b> `<b>`<i>斜体</i> `<i>` <u>下划线</u> `<u>` [[markdown#字体]]
- 描述列表
```markdown
<dl>
  <dt>内心独白</dt>
  <dd>
    戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。
  </dd>
  <dt>语言独白</dt>
  <dd>
    戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。
  </dd>
  <dt>旁白</dt>
  <dd>
    戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。
  </dd>
</dl>

```
<dl>
  <dt>内心独白</dt>
  <dd>
    戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。
  </dd>
  <dt>语言独白</dt>
  <dd>
    戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。
  </dd>
  <dt>旁白</dt>
  <dd>
    戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。
  </dd>
</dl>
- 引用 [[markdown#块引用]]
<blockquote cite="https://baike.baidu.com/item/%E6%BB%A1%E6%B1%9F%E7%BA%A2%C2%B7%E5%92%8C%E9%83%AD%E6%B2%AB%E8%8B%A5%E5%90%8C%E5%BF%97/5958646">
多少事，从来急；天地转，光阴迫。
</blockquote>
```html
<blockquote cite="https://baike.baidu.com/item/%E6%BB%A1%E6%B1%9F%E7%BA%A2%C2%B7%E5%92%8C%E9%83%AD%E6%B2%AB%E8%8B%A5%E5%90%8C%E5%BF%97/5958646">
多少事，从来急；天地转，光阴迫。
</blockquote>
```

<q cite="https://baike.baidu.com/item/%E8%B4%BA%E6%96%B0%E9%83%8E%C2%B7%E8%AF%BB%E5%8F%B2/5961892">人猿相揖别</q>,精炼写出从猿到人的进化过程
```html
<q cite="https://baike.baidu.com/item/%E8%B4%BA%E6%96%B0%E9%83%8E%C2%B7%E8%AF%BB%E5%8F%B2/5961892">人猿相揖别</q>,精炼写出从猿到人的进化过程
```
- 缩略语 `<abbr title="Kubernetes">k8s</abbr>` <abbr title="Kubernetes">k8s</abbr>
- 联系方式 `<address>` <address>email: luren145@gmail.com</address>
- 上标 `<sup>` e<sup>x</sup> 下标 `<sub>` C<sub>m</sub>
- 代码 `<code>` <code>int a = 1;</code> [[markdown#代码]]
- 保留空白字符`<pre>` <div>                         不用pre</div><pre>                         用了pre </pre>
- 变量名`<var>` <var>var</var>
- 标注日期 `<time datetime="2016-01-20">2016 年 1 月 20 日</time>` <time datetime="2016-01-20">2016 年 1 月 20 日</time>
## 链接 [[markdown#链接]]
`<a href="https://www.mozilla.org/zh-CN/" title="title">Mozilla 主页</a>的链接。`
<a href="https://www.mozilla.org/zh-CN/" title="title">Mozilla 主页</a>的链接。
target属性
download属性

## 多媒体
### 图片 [[markdown#图片]]
`<img>`
`<figure>`
`<figcaption>`
alt
title
### 视频
`<video>`

### 音频
`<audio>`
### 嵌入网页
`<iframe>`
### 嵌入外部内容
`<embed>` `<object>`
## 表格 [[markdown#表格]]
`<table>`
`<th>`
`<tr>`
`<td>`
使用col应用样式
`<col>`
`<colgroup>`
`<caption>`添加标题
`<thead>`
`<hbody>`
`<hfoot>`

## 表单
- `<form>`
- `<input>`  
	- text <input type="text" placeholder="please input">
	- checkbox 多选题 <label>A</label><input type="checkbox" ><label>B</label><input type="checkbox" ><label>C</label><input type="checkbox" >
	- radio 单选题  <label>A</label><input type="radio" name="radio" ><label>B</label><input type="radio" name="radio"><label>C</label><input type="radio" name="radio" >
	- color 提色器 <input type="color" >
	- date  <input type="date">
	- datetime-local <input type="datetime-local">
	- email <input type="email">
	- file <input type="file" >
	- month <input type="month" >
	- password <input type="password">
	- number <input type="number" >
	- range <input type="range" >
	- search <input type="search" >
	- tel <input type="tel" >
	- text <input type="text">
	- time <input type="time">
	- url <input type="url">
`<textarea>` <textarea> </textarea>

`<label>`
- `<button>`<button ></ button>
- `<select>` 
<select >
<option value=""> 1月29日</option>
<option value="option1">我爱着雪菜</option>
<option value="option2">我无法对和纱说谎</option>
</select>

<select multiple>
<optgroup>
<option value="option1">雪菜</option>
<option value="option2">和纱</option>
</optgroup>
</select>

- `<datalist>`
```
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
</datalist>

```
<datalist id="ice-cream-flavors">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
</datalist>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

- `<progress>`
<progress max="100" value="75">

- `<fieldset> <legend>`
- `<meter>`
<meter min="0" max="100" low="40"  optimum="90" value="100"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="90"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="80"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="70"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="60"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="50"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="40"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="30"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="20"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="10"></meter>
<meter min="0" max="100" low="40"  optimum="90" value="0"></meter>