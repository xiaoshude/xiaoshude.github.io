---
# 基本信息
- 手机：18612692383
- Email：i@fjywan.com
- 付志远 / 男 / 1992
- 本科 / 河南理工大学
- 工作年限：3年
- 博客：http://fjywan.com/
- Github：https://github.com/xiaoshude

---
# 个人简介
15年7月毕业于河南理工大学，三年web开发经验。参与过中后台管理系统开发、PC和移动站开发，熟练使用的技能：

- Web开发：HTML5 / CSS3 / **JavaScript** / ES.Next
- 库和框架：jQuery / **Angular 1**
- 工具：Gulp / **webpack** / Git

# 主要项目经历
## 前端工程师 - 万达网络科技集团 （2016年2月 - 至今）

### 支付营销后台
使用 Angular 1 + ES6 + gulp + webpack，从支付营销后台的一系列项目中，加深了对Angular怎样组件化的理解。
团队很多人参与不同的Angular后台项目，每个项目都有头部导航，树形菜单，查询列表等，为了在团队内共享这些通用的代码，积累并形成了组件库FancyUI，涵盖功能性组件、容器性组件、服务性组件和页面化组件。

### Beacon设计部署平台
负责项目的前端部分，使用Angular。从这个项目中，对使用Angular的中后台项目如何组织和复用代码有了更深刻的理解。

Beacon设计是基于室内地图的，每个Controller基本都包含这个过程: 地图的实例化->拉取地图相关数据->配置->渲染地图->加载Beacon->绑定事件->添加Beacon交互。

为了简化Controller：提炼地图相关项目的情景库和功能库供团队在不同地图项目共享。通用的一系列执行流程抽象为情景，实现为一个基类Controller，使用时通过配置和添加钩子函数自定义情景；通用的功能抽象为Controller的装饰器，实现为一个service，使用时注入Controller来附加功能

### 广场室内地图移动端导览
使用 jQuery + Handlebars + webpack。从这个项目中加深了对单页面应用的理解。
项目起初功能简单，采用jQuery快速实现，但随着功能的添加，页面交互越来越复杂，开始思考怎样组织代码易于维护。
解决办法：把一组div的显示抽象为一个状态，一组div的隐藏到另一组div的显示抽象为一个状态的切换，基于这个想法，实现了一个状态管理器，定义每个状态的生命周期，从状态进入到状态销毁，把代码按状态分割，按生命周期顺序组织。

### 室内定位 SDK
对接微信和后端为地图提供精准的室内位置；
兼容不同OS和硬件下微信获取位置晃动、方向偏差过大的问题。细分微信内获取位置发生的异常，返回有意义的提示。

### 广场地图大屏导览和停车场寻车H5
使用Vue1 + ES6 + webpack。项目有弱网环境下的使用需求，优化资源加载、渲染和请求成为关键。
解决办法：开发一个请求的库，解决缓存和请求的次序依赖问题（a[sync-queue](https://github.com/xiaoshude/async-queue)）

从项目中还加深了对前端测试的理解。如果无法在本地通过运行整个项目得到即时反馈，这时编写单元测试是必要的，而且编写单测会促使尽可能书写纯函数，让代码组织更清晰可预测。

## 全栈工程师 - 好未来（2015年2月 - 2016年2月）

### 案例库 / 院校库
负责前端，使用Angular，体会到Angular + RESTful API 编写富表单应用的快速。

### 找顾问
负责前后端开发。jQuery + Bootstrap + PHP + MySQL, 实现顾问多维度检索，及顾问个人信息页展示。

### 官网CMS
使用Django，Django自带的admin对数据库进行可视化增删改时很方便，满足了运营频繁发布活动，更改图片的需求。

---
# 个人开源项目
 - [FancyUI](https://github.com/ffan-fe/fancyui)：FancyUI是一套AngularJs(1.5.X)的组件库，用于快速构建后台管理系统
 - [ng-include-loader](https://github.com/xiaoshude/ng-include-loader)：解决Angular项目中webpack无法打包ng-include指令引入的HTML
 - [form-tpl](http://www.fancyui.org/bp-utils/#/generator/list)：表单生成器, 用于快速生成有验证的表单
 - [js-tree](https://github.com/xiaoshude/js-tree)：为JS增加树形数据结构，支持深度优先的向上向下遍历、节点查找

