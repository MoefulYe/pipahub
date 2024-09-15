---
created_at: 2024-09-13
title: 
tags: 
---
## 概念
- (真)前缀
- (真)后缀
- 最长前后缀长度

```
make_next(s) {
	next := [0; s.len] //next第i个元素表示0到i这一段子串的最长前后缀长度,包括i
	next[0] = 0 //对于长度为1的串前后缀长度为0故填入0，即相同前后缀不存在
	for i in 1..s.len - 1 {
		j := next[i-1] //j是自己去掉尾部的子串最长前后缀长度, j指向最长前缀的后一个位置
		//那么s[j]就是下一个待比较的值
		//如果s[j] === s[i]那么最长前后缀长度就是j+1
		//如果不相等那么这两个相同前后缀子串
		//自身可能还有两个相同的前后缀子串那么比较前缀的前缀的后面一个元素是否与s[i]相等
		//这样的过程是能一直迭代下去的，迭代的终止条件是j===0,此时不存在相同的前后缀
		while j > 0 and s[j] !== s[i] { j = next[j-1] }
		if j = 0 { next[i] = 0 }
		else { next[i] = j + 1 }
	}
	return next
}
```

```
// 返回匹配开始的主串的下标
kmp(s, pat) {
	next = make_next(pat)
	i := 0 // 主串的游标
	j := 0 // 模式串的游标
	while i < s.len {
		if s[i] === pat[j] {
			i++
			j++
			if j === pat.len {
				return i - pat.len
			}
		} else {
			if j === 0 {
				i++
			} else {
				j = next[j-1]
			}
		}
	}
	return NOT_FOUND
}
```
## 复杂度
空间$O(pat.len)$
时间$O(pat.len + s.len)$
