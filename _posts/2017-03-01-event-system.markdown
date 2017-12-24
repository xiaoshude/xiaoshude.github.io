---
layout: post
title: 实现一个简易的事件系统
author: "fjywan"
header-img: "img/post-bg-02.jpg"
date:   2017-01-06
---

对于异步编程来说，事件是一个传递回调的好办法，可以轻松解耦代码。
虽然已经有一些成熟的事件库，但自己实现一个依然是理解事件的最佳途径

### 思路

一个事件系统需要提供的基础功能：
绑定事件、移除事件绑定、绑定单次触发的事件、触发事件

首先设计下API：
绑定事件: on
移除事件绑定: off
绑定单次触发的事件: once
触发事件: trigger

### 实现

绑定事件其实是记录事件触发时的回调函数和回调执行的环境。
具体实现：用一个对象来记录，key是事件、value是回调函数数组

```
class Event {
  constructor() {
      this._events = {};
  }
  on(type, fn, context = this) {
      // 没有绑定过先初始化
      if (!this._events[type]) {
        this._events[type] = []
      }

      this._events[type].push([fn, context])
    }
}
```

移除事件绑定其实从回调数组里删除特定回调

```
// 要指定删除的事件和具体哪个回调
off(type, fn) {
    let _events = this._events[type];
    if (!_events) {
      return
    }

    let count = _events.length;
    while (count--) {
      if (_events[count][0] === fn) {
        _events[count][0] = undefined
      }
    }
  }
```

绑定单次触发的事件其实是一个回调一旦触发异常就会被移除

```
不同于on，储存的回调其实是经过包装的函数
once(type, fn, context = this) {
    function magic() {
      this.off(type, magic);
      fn.apply(context, arguments);
    }

    // 需要保存原始回调，不然移除不了 所以上面的off要修正一下
    magic.originFn = fn;

    this.on(type, magic)
  }
// 修正后的off
off(type, fn) {
       let _events = this._events[type]
          if (!_events) {
            return
          }

          let count = _events.length
          while (count--) {
            // 移除on 、 once绑定的回调
            if (_events[count][0] === fn || (_events[count][0] && _events[count][0].fn === fn)) {
              _events[count][0] = undefined
            }
          }
 }
```

触发事件其实是把该事件对应的一组回调拿出来依次执行

```
trigger(type) {
    let events = this._events[type];
    if (!events) {
      return
    }

    let len = events.length;
    let eventsCopy = [...events];
    for (let i = 0; i < len; i++) {
      let event = eventsCopy[i];
      let [fn, context] = event;
      if (fn) {
        fn.apply(context, [].slice.call(arguments, 1))
      }
    }
  }
```





