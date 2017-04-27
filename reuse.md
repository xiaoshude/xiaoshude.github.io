##### 从一个具体的例子说起:
地图后台几乎每个页面都这样一个流程：
拉取后台地图数据，渲染地图，然后加载Beacon，绑定事件，添加Beacon交互，广场搜索时，清除已有Beacon，重新执行上面步骤。

类似这样流程称为一个情景：通用的一系列执行流程

把这一系列执行流程抽出来，在执行过程中暴露钩子函数，来嵌入自定义行为；添加常量来达到配置情景；

实现办法：base controller, 每个情景抽象为一个base controller，当自己的业务隶属于这个情景的时候，只需要用业务controller extends 这个base controller，你的controller就具有运行起整个情景的能力。

现在写controller就变成了这样两件事：
1.在情景的整个生命周期内嵌入自定义逻辑（如果需要的话）
2.声明生命周期中所需常量。

##### 再来看一个例子：
有好几个页面都需要这样一个功能：划线添加Beacon

想象如果有个化妆店，我们的业务controller经过这个化妆店处理后立马变得很美（具有了划线添加Beacon的能力），多nice

实现办法：把这种常用的功能抽象成service，只要注入相应功能的service，然后执行service.process(controller), 这个controller立马就具有了相应的功能

##### 总结下：
两个纬度的复用：
情景复用：为每个情景积累base controller；
功能复用：为每个功能积累service；





