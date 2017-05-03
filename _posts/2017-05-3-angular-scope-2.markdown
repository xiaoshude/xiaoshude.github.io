---
  layout: post
title: angular scope(2)
author: "fjywan"
header-img: "img/post-bg-02.jpg"
date:   2017-05-03 16:50:00 +0800
---

### $watchGroup

使用一些指令比如ng-bind, ng-class, ng-if...  , angular会内部帮我们注册watch，监听数据变动，改变UI

$watch, 监听某个数据变动，执行一些自定义逻辑。
如果我们需要监听一组数据变动，当其中任何一个变动，即执行某个函数。这个需求并非不常见。

- 一种办法：依然可以使用 $watch，只需要监听这一组值组合起来的某个值即可, eg:
```
scope.$watch(function (scope) {return scope.a + '-' + scope.b}, listenerFunction);
```
当scope.a 和 scope.b 任何一个变动， 都会引起最后拼接的字符串变化，然后执行监听函数;
这样做的弊端也很明显：1. 要确保任何一个值变动组合后的值都会变化 2. listenerFunction中得到的新值和旧值也是拼接后，需要处理
- $watchGroup 解决了上面两个问题，它是这样使用的：
```
scope.$watchGroup([function (scope) {return scope.a}, function (scope) { return scope.b}], listenerFunction);
```
当scope.a 和 scope.b 任何一个变动，都会执行listenerFunction, listenerFunction也会以数组的形式得到新值和旧值

所以这篇文章的关键，$watchGroup怎样实现的

  ```
var collectAllWatchFns = function (watchFns) {
    var results = watchFns.map(watchFn => watchFn(scope));
    return results.join();
}

var wrappedListenerFn = function (listenerFn, newVal, oldVal, scope) {
    listenerFn(newVal.split(','), oldVal.split(','), scope);
}

scope.$watchGroup = function (watchFns, listenerFn) {
    scope.$watch(collectAllWatchFns(watchFns), wrappedListenerFn.bind(null, listenerFn));
}
```
这种实现办法是可以的，但同样会遇到上面的问题，怎样保证任何一个值变动组合后的值都会变化？恐怕要对不同值类型做不同的组合处理

来看另一种实现办法：

```
scope.$watchGroup = function (watchFns, listenerFn) {
    watchFns.forEach(watchFn => {
        scope.$watch(watchFn, listenerFn);
    });
}
```
如果每个watch的值都改变，listenerFn会被调用多次，而希望的是只调用一次。
可以用个代理函数，调用实际的listenerFn之前先调用代理函数；
这个代理函数搜集所有值变动结果，最后调用listenerFn

  ```
scope.$watchGroup = function (watchFns, listenerFn) {
    var hasRegistered = false;
    var newVals = [];
    var oldVals = [];
    var proxyToListener = function (i, newVal, oldVal) {
         newVals[i] = newVal;
         oldVals[i] = oldVal;
         if (hasRegistered) {
            hasRegistered = true;
            listenerFn(newVals, oldVals);
         }
    }
    watchFns.forEach((watchFn, i) => {
        scope.$watch(watchFn, proxyToListener.bind(null, i));
    });
}
```
还有一个问题，调用listenerFn的时机不对，我们需要的是当watchFns 所有变动发生完后调用 listenerFn，
确切的说，延迟调用 listenerFn 到 proxyToListener 搜集完所有新旧值；
$evalAsync 正好符合这个需求，它把当前函数延迟到一次脏检查最后，并开始另一次脏检查
  ```
scope.$watchGroup = function (watchFns, listenerFn) {
    var hasRegistered = false;
    var newVals = [];
    var oldVals = [];
    var proxyToListener = function (i, newVal, oldVal) {
         newVals[i] = newVal;
         oldVals[i] = oldVal;
         if (hasRegistered) {
            hasRegistered = true;
            scope.$evalAsync(() => listenerFn(newVals, oldVals));
         }
    }
    watchFns.forEach((watchFn, i) => {
        scope.$watch(watchFn, proxyToListener.bind(null, i));
    });
}
```


