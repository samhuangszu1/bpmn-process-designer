# Bpmn Process Designer

fork from [miyuesc/bpmn-process-designer](https://github.com/miyuesc/bpmn-process-designer)

### 友情链接

1. vue-bpmn-modeler： [vue-bpmn-modeler](https://github.com/evanyangg/vue-bpmn-modeler)


## 1. 安装依赖 Installation

```shell
npm install
// or yarn install
```

## 2. 运行 Quick Start

```shell
npm run demo
// or yarn run demo
```

## 3. 文档说明 Documentation

### 3.1 MyProcessDesigner

#### 3.1.1 Attributes

| Attribute             | Description                                               | Type        | Accepted Values                        | Default                                                      |
| --------------------- | --------------------------------------------------------- | ----------- | -------------------------------------- | ------------------------------------------------------------ |
| `value/v-model`       | 初始化流程对应的 `xml` 字符串                             | String      | -                                      | -                                                            |
| `translations`        | 翻译文件                                                  | Object      | -                                      | [zh.js](https://github.com/miyuesc/bpmn-process-designer/blob/main/package/process-designer/plugins/translate/zh.js) |
| `additionalModel`     | 自定义的附加模块                                          | Object[] / Object | -                                      | -                                                            |
| `moddleExtension`     | 自定义的扩展模块                                          | Object      | -                                      | -                                                            |
| `onlyCustomizeAddi`   | 仅使用开发时的自定义附加模块 | Boolean     | -                                      | `false`                                                      |
| `onlyCustomizeModdle` | 仅使用开发时的自定义扩展模块        | Boolean     | -                                      | `false`                                                      |
| `prefix`              | 流程引擎对应扩展属性前缀                         | String      | `camunda`, `activiti`, `flowable`      | `camunda`                                                    |
| `events`              | 需要使用的事件列表，可用事件见 [Bpmn.js 中文文档](https://github.com/miyuesc/blog/blob/master/bpmn/docs/Bpmn.js%20document.md#%E4%B8%89-%E4%BA%8B%E4%BB%B6) | Array       | -                                      | `[element.click]`                                            |
| `headerButtonSize`    | 头部按钮组的大小                          | String      | `"default", "medium", "small", "mini"` | `small`                                                      |

#### 3.1.2 Events

| Event Name      | Description                                                  | Callback Parameters              |
| --------------- | ------------------------------------------------------------ | -------------------------------- |
| `init-finished` | 流程实例等初始化完成之后                                     | `modeler`                        |
| `change`        | 流程发生可监听的改变时 ( `EventBus.on("commandStack.changed")`) | `XMLString`                      |
| `destroy`       | 组件准备销毁时，此时流程实例已经销毁                         | `modeler`                        |
| `BpmnEvents`    | Like `element.click`, will replace `.` to `-` (`ex: "element.click" => "element-click"` ). If you want to use an event, you must add the event name to the "`events`" parameter<br />传入参数 `events` 对应的事件发生时触发，会将 `events` 数组内部的事件名称中的 `.` 替换成 `-` 来适配 `vue` 的自定义监听事件。比如 `"element.click"` 会变成 `element-click` | `element, InternalEventInstance` |

#### 3.1.3 Methods

| Method Name             | Parameters                     | Description                              |
| ----------------------- | ------------------------------ | ---------------------------------------- |
| `downloadProcessAsXml`  | `name: string = "diagram"` | 下载文件为 `${name}.xml` 格式的文件  |
| `downloadProcessAsBpmn` | `name: string = "diagram"` | 下载文件为 `${name}.bpmn` 格式的文件 |
| `downloadProcessAsSvg`  | `name: string = "diagram"` | 下载文件为 `${name}.svg` 格式的文件  |
| `processRedo`           | -                              | 恢复上次操作 |
| `processUndo`           | -                              | 撤销本次操作 |
| `processZoomIn`         | `newZoom: number = 0.1`       | 按照指定倍率缩小视图（小数点后两位） |
| `processZoomOut`        | `newZoom: number = 1`         | 按照指定倍率放大视图（小数点后两位） |
| `processZoomTo` | `newZoom: number = 1` | 缩放视图到指定倍率 |
| `processReZoom`         | -                              | 重置缩放倍率并居中显示全部元素 |
| `processRestart`        | -                              | 重置所有编辑过程并清空画布 |
| `createNewDiagram` | `xml: string` | 重新导入新的xml字符串 |

### 3.2 MyProcessPenal

#### 3.2.1 Attributes

| Attribute      | Description                       | Type   | Accepted Values                   | Default   |
| -------------- | --------------------------------- | ------ | --------------------------------- | --------- |
| `bpmn-modeler` | 初始化生成的 `modeler` 实例，必须 | Object | -                                 | -         |
| `prefix`       | 流程引擎对应扩展属性前缀          | String | `camunda`, `activiti`, `flowable` | `camunda` |
| `width`        | 侧边栏宽度                        | Number | -                                 | 480       |


## 4. 功能说明

1. 工具栏：包含常见操作，比如打开文件、下载文件、预览、对齐方式、缩放管理、撤销删除等
2. 常规信息：id、名称、扩展属性、元素文档
3. 特殊节点属性：
   1. 流程全局消息与信号
   2. 执行监听器
   3. 用户任务节点 任务监听器
   4. 表单配置
   5. 任务配置
   6. 多实例任务
   7. 流转条件
4. 内置常用 `camunda` ，`flowable`，`activiti` 解析文件
5. 自定义左侧元素栏 `platte` 与弹出菜单 `contentPad` 示例模块
6. 自定义渲染方法 `renderer` 模块实例


## 5. 运行截图

### 5.1 初始界面

![image-20210422140659561](screenshot/image-20210422140659561.png)

### 5.2 监听器

![image-20210422140728176](screenshot/image-20210422140728176.png)



![image-20210422140805725](screenshot/image-20210422140805725.png)

### 5.3 扩展属性

![image-20210422140906725](screenshot/image-20210422140906725.png)

### 5.4 流转路径配置

![image-20210422140924114](screenshot/image-20210422140924114.png)


### 5.5 任务配置

![image-20210422141009316](screenshot/image-20210422141009316.png)

### 5.6 多实例任务

![image-20210422141035638](screenshot/image-20210422141035638.png)

### 5.8 表单配置

![image-20210422141220571](screenshot/image-20210422141220571.png)

![image-20210422141354311](screenshot/image-20210422141354311.png)

### 5.9 预览

![image-20210422140939414](screenshot/image-20210422140939414.png)
