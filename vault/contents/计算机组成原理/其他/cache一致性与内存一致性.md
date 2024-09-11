---
created_at: 2024-07-19
modified_at: 2024-07-19
description: 
aliases: 
tags:
  - 计算机组成原理
  - 内存一致性
  - cache
  - cache一致性
title: cache一致性与内存一致性
---
## cache一致性
在多层级的cache系统值保证缓存透明性 
- 任何CPU所发出的访存操作被存储器所观察到的顺序必须与CPU发出操作的顺序相同 
- 每个读操作所返回的值必须是最后一次对该存储位置的写操作的值
实现：事务串行化 写传播
## 总线嗅探

## 内存可见性
## MESI协议

### 状态
M(modified): 该行刚被 CPU 改过，并且保证不会出现在其它CPU的Cache Line中。即CPU是该行的所有者。CPU持有该行的唯一正确参照。  
E(exclusive): 和M类似，但是未被修改，即和内存是一致的，CPU可直接对该行执行修改(修改之后为modified状态)。  
S(shared): 该行内容至少被一个其它CPU共享，因此该CPU不能直接修改该行。而需要先与其它CPU协商。  
I(invalid): 该行为无效行，即为空行，前面提到Cache策略会优先填充Invalid行。
### 事件
Read: CPU发起读取数据请求，请求中包含需要读取的数据地址。  
Read Response: 作为Read消息的响应，该消息可能是内存响应的，也可能是某CPU响应的(比如该地址在某CPU Cache Line中为Modified状态，该CPU必须返回该地址的最新数据)。  
Invalidate: 该消息包含需要失效的地址，所有的其它CPU需要将对应Cache置为Invalid状态  
Invalidate Ack: 收到Invalidate消息的CPU在将对应Cache置为Invalid后，返回Invalid Ack  
Read Invalidate: 相当于Read消息+Invalidate消息，即取得数据并且独占它，将收到一个Read Response和所有其它CPU的Invalid Ack  
Writeback: 写回消息，即将状态为Modified的行写回到内存，通常在该行将被替换时使用。现代CPU Cache基本都采用”写回(Write Back)”而非”直写(Write Through)”的方式。
### 状态转换
https://zh.wikipedia.org/zh-hans/MESI%E5%8D%8F%E8%AE%AE#%E6%93%8D%E4%BD%9C
## StoreBuffer
### 引入原因
MESI协议足够简单，并且能够满足我们对Cache一致性的需求，它在单个CPU对指定地址的反复读写方面有很好的性能表现，但在某个CPU尝试修改在其它CPU Cache Line中存在的数据时，性能表现非常糟糕，因为它需要发出Invalidate消息并等待Ack，这个延迟(Stall)对CPU来说对难以忍受的并且有时是无必要的，比如执行写入的CPU可能只是简单的给这个地址赋值(而不关心它的当前值是什么)。解决这类不必要的延迟的一个方案就是在CPU和Cache之间加一个Store Buffer: CPU可以先将要写入的数据写到Store Buffer，然后继续做其它事情。等到收到其它CPU发过来的Cache Line(Read Response)，再将数据从Store Buffer移到Cache Line
### 内存可见性
引入storebuffer后之前指令执行的结果可见性不能保证
- 保证同一个CPU内采用Store Forwarding
- 不同CPU的可见性由[[#MemoryBarrier]]保证
在需要保证可见性的地方插入一条内存屏障指令
```c
void foo() {  
    a = 1;  
    smp_mb()  
    b = 1;  
}  
void bar() {  
    while (b == 0) continue;  
    assert(a == 1)  
}
```
这里的屏障写写屏障，是当CPU看到内存屏障`smp_mb()`时，会先刷新当前(屏障前)的Store Buffer，然后再执行后续(屏障后)的Cache写入， 简单地来说是将后续的写入也写到Store Buffer中，直到屏障前的条目全部应用到Cache Line(可以通过给屏障前的Store Buffer中的条目打个标记来实现)。这样别的CPU观察到`b==1`是也能够保证`a=1`对他们也是可见的
## InvalidQueue
### 引入原因
引入了Store Buffer，再辅以Store Forwarding，Memory Barrier，看起来好像可以自洽了，然而还有一个问题没有考虑: Store Buffer的大小是有限的，所有写入操作的Cache Missing都会使用Store Buffer，特别是出现内存屏障时，后续的所有写入操作(不管是否Cache Miss)都会挤压在Store Buffer中(直到Store Buffer中屏障前的条目处理完)，因此Store Buffer很容易会满，当Store Buffer满了之后，CPU还是会卡在等对应的Invalid Ack以处理Store Buffer中的条目。因此还是要回到Invalid Ack中来，Invalid Ack耗时的主要原因是CPU要先将对应的Cache Line置为Invalid后再返回Invalid Ack，一个很忙的CPU可能会导致其它CPU都在等它回Invalid Ack。解决思路还是化同步为异步: CPU不必要处理了Cache Line之后才回Invalid Ack，而是可以先将Invalid消息放到某个请LSB求队列Invalid Queue，然后就返回Invalid Ack。CPU在处理任何Cache Line的MSEI状态前，都必须先看Invalid Queue中是否有该Cache Line的Invalid消息没有处理。
### false sharing

### 内存可见性
其他CPU发出的invalidate请求在queue里没有被处理，而此时cpu读取要被invalidate的缓存行，那么此时别的CPU发出的invalidate请求对于该CPU来说是不可见的，如果要保证可见性那么要插入一条（写读）[[#MemoryBarrier]]指令来保证可见性。具体的做法是CPU看到哲别指令后处理invalidate请求，把对应的缓存行失效，执行之后的指令就能从独占了该缓存行的CPU中获取，这样就能保证修改的可见性
## Instruction Reordering
编译期间重排: 编译器在编译期间，可能对指令进行重排，以使其对CPU更友好
运行期间重排: CPU在执行指令的过程中，可能乱序执行以更好地利用流水线。超标量流水线多发射也会破坏顺序关系。
重排的前提是对于单线程程序而言，重排前后的程序是等价的（都是偏序列的一个拓扑排序）即不会改变单线程程序的行为，大可以认为程序还是按照程序语句顺序执行。而对于多线程程序而言，就再也不能利用语句执行顺序来保证可见性。
```c
a = 1;  
b = 2;
```
对于不同的地址的内存访问，CPU不能判断依赖关系，可能乱序执行。那么别的线程如果依赖于a先于b赋值这个事实，那么就必须要应用程序告诉CPU/编译器，a和b有依赖关系，不要重排。限制CPU指令重排就是靠内存屏障指令来实现的
## MemoryBarrier
### 功能
- 限制屏障两侧的指令重排
- 保证内存可见性
- 内存屏障不仅影响运行时的行为还影响编译器编译时的行为
### 四种屏障
- LoadLoad: 任何该屏障前的读操作都会先于该屏障后的读操作完成
- LoadStore: 任何该屏障前的读操作都会先于该屏障后的写操作完成
- StoreLoad: 任何该屏障前的写操作都会先于该屏障后的读操作完成
- StoreStore: 任何该屏障前的写操作都会先于该屏障后的写操作完成
### 两个语义
- acquire语义
- release语义
## 编程语言提供的工具
### volatile
java、c、c++通过volatile关键字来保证变量的可见性，并限制局部的指令重排。它的实现原理是在每个volatile变量写操作前插入StoreStore屏障，在写操作后插入StoreLoad屏障，在每个volatile变量读操作前插入LoadLoad屏障，在读操作后插入LoadStore屏障来完成。
### atomic
atomic本身的职责是保证原子性，与volatile定位不太一样，后者本身是不保证原子性的，C++ atomic允许在保证原子的基础上，指定内存顺序，即使用哪种内存屏障。
[[内存序]]

## 内存一致性
Cache一致性，内存屏障，指令重排，乱序执行等，都属于内存一致性的范畴。内存一致性也叫做内存模型(Memory Model)或内存一致性模型(Memory Consistency Model)，**内存一致性模型规定了程序员和系统之间的契约，其中系统保证，如果程序员遵循内存操作规则，内存将是一致的，读取、写入或更新内存的结果将是可预测的。**
### 内存一致性模型
- `Weak Memory Model`: 如DEC Alpha是弱内存模型，它可能经历所有的四种内存乱序(LoadLoad, LoadStore, StoreLoad, StoreStore)，任何Load和Store操作都能与任何其它的Load或Store操作乱序，只要其不改变单线程的行为。
- `Weak With Date Dependency Ordering`: 如ARM, PowerPC, Itanium，在Aplpha的基础上，支持数据依赖排序，如C/C++中的`A->B`，它能保证加载B时，必定已经加载最新的A
- `Strong Memory Model`: 如X86/64，强内存模型能够保证每条指令`acquire and release`语义，换句话说，它使用了LoadLoad/LoadStore/StoreStore三种内存屏障，即避免了四种乱序中的三种，仍然保留StoreLoad的重排，对于代码片段7来说，它仍然可能出现r1=r2=42的情况
- `Sequential Consistency`: 最强的一致性，理想中的模型，在这种内存模型中，没有乱序的存在。如今很难找到一个硬件体系结构支持顺序一致性，因为它会严重限制硬件对CPU执行效率的优化(对寄存器/Cache/流水线的使用)。
## 参考
https://zh.cppreference.com/w/cpp/atomic/memory_order
https://wudaijun.com/2019/04/cache-coherence-and-memory-consistency/
https://xiaolincoding.com/os/1_hardware/cpu_mesi.html#cpu-cache-%E7%9A%84%E6%95%B0%E6%8D%AE%E5%86%99%E5%85%A5
