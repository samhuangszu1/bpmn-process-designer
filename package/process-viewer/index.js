import ProcessViewer from "./ProcessViewer.vue";

// 为组件提供 install 安装方法，供按需引入
ProcessViewer.install = function(Vue) {
  Vue.component(ProcessViewer.name, ProcessViewer);
};

// 默认导出组件
export default ProcessViewer;
