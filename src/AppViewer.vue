<template>
  <div id="app">
    <my-process-viewer
      :key="`viewer-${reloadIndex}`"
      v-model="xmlString"
      :taskData="taskData"
    />
  </div>
</template>

<script>
import translations from "@/translations";
// 自定义渲染（隐藏了 label 标签）
import CustomRenderer from "@/modules/custom-renderer";
// 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
import CustomContentPadProvider from "../package/process-designer/plugins/content-pad";
// 自定义左侧菜单（修改 默认任务 为 用户任务）
import CustomPaletteProvider from "../package/process-designer/plugins/palette";
import xmlObj2json from "./utils/xml2json";
// 自定义侧边栏
// import MyProcessPanel from "../package/process-panel/ProcessPanel";

export default {
  name: "AppViewer",
  components: {},
  data() {
    return {
      taskData: [
        {
          key: "Activity_0em2f9a",
          completed: true,
        },
        {
          key: "Activity_07gjyq9",
          completed: true,
        },
        {
          key: "Activity_1ljnih3",
          completed: true,
        },
      ],
      xmlString: "",
      modeler: null,
      reloadIndex: 0,
      controlDrawerVisible: false,
      translationsSelf: translations,
      controlForm: {
        processId: "",
        processName: "",
        simulation: true,
        labelEditing: false,
        labelVisible: false,
        prefix: "activiti",
        headerButtonSize: "mini",
        // additionalModel: []
        additionalModel: [CustomContentPadProvider, CustomPaletteProvider],
      },
      addis: {},
    };
  },
  created() {
    // console.log(this.translationsSelf);
    this.requestUserInfo();
  },
  methods: {
    initModeler(modeler) {
      setTimeout(() => {
        this.modeler = modeler;
        console.log(modeler);
      }, 10);
    },
    reloadProcessDesigner() {
      this.controlForm.additionalModel = [];
      for (let key in this.addis) {
        if (this.addis[key]) {
          this.controlForm.additionalModel.push(this.addis[key]);
        }
      }
      this.reloadIndex += 1;
      this.modeler = null; // 避免 panel 异常
    },
    changeLabelEditingStatus(status) {
      this.addis.labelEditing = status
        ? { labelEditingProvider: ["value", ""] }
        : false;
      this.reloadProcessDesigner();
    },
    changeLabelVisibleStatus(status) {
      this.addis.customRenderer = status ? CustomRenderer : false;
      this.reloadProcessDesigner();
    },
    elementClick(element) {
      this.element = element;
      // console.log(xmlObj2json(this.xmlString));
      // console.log(this.modeler);
      // if (element.type === "bpmn:UserTask") {
      //   const moddle = window.bpmnInstances.moddle;
      //   const modeling = window.bpmnInstances.modeling;
      //   const child1 = moddle.create("flowable:ChildField", {
      //     id: "child1",
      //     name: "1",
      //     readable: true
      //   });
      //   const child2 = moddle.create("flowable:ChildField", {
      //     id: "child2",
      //     name: "2",
      //     type: "string",
      //     required: true
      //   });
      //   const formProperty = moddle.create("flowable:FormProperty", {
      //     children: [child1, child2]
      //     // children: []
      //   });
      //   const extensionElements = moddle.create("bpmn:ExtensionElements", {
      //     values: [formProperty]
      //   });
      //   modeling.updateProperties(element, {
      //     extensionElements
      //   });
      // }
    },
    requestUserInfo() {
      // this.$axios.get("/user/userInfo").then((res) => {
      //   console.log(res);
      // });
      setTimeout(() => {
        this.xmlString = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" id="diagram_Process_1631771171164" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1631771171164" name="业务流程_1631771171164" isExecutable="true">
    <bpmn2:startEvent id="Event_0thv7ce">
      <bpmn2:extensionElements>
        <camunda:formData />
      </bpmn2:extensionElements>
      <bpmn2:outgoing>Flow_1pkp5w9</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:exclusiveGateway id="Gateway_09lyl61" name="天数&#62;5?">
      <bpmn2:incoming>Flow_0jdfmem</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0m5zgwc</bpmn2:outgoing>
      <bpmn2:outgoing>Flow_01w5yi9</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:endEvent id="Event_10d4kyy" name="结束">
      <bpmn2:incoming>Flow_0zhyy7k</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="Flow_1pkp5w9" sourceRef="Event_0thv7ce" targetRef="Activity_0em2f9a" />
    <bpmn2:sequenceFlow id="Flow_0jdfmem" sourceRef="Activity_0em2f9a" targetRef="Gateway_09lyl61" />
    <bpmn2:userTask id="Activity_0em2f9a" name="确认请假">
      <bpmn2:extensionElements>
        <camunda:formData />
      </bpmn2:extensionElements>
      <bpmn2:incoming>Flow_1pkp5w9</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0jdfmem</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Flow_0m5zgwc" name="&#60;=5" sourceRef="Gateway_09lyl61" targetRef="Activity_07gjyq9" />
    <bpmn2:sequenceFlow id="Flow_01w5yi9" name="&#62;5" sourceRef="Gateway_09lyl61" targetRef="Activity_13u22fn" />
    <bpmn2:exclusiveGateway id="Gateway_1phnldu" name="是否通过">
      <bpmn2:incoming>Flow_1404seh</bpmn2:incoming>
      <bpmn2:incoming>Flow_1ybu3uo</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1qv5ag8</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="Flow_1404seh" sourceRef="Activity_07gjyq9" targetRef="Gateway_1phnldu" />
    <bpmn2:sequenceFlow id="Flow_1ybu3uo" sourceRef="Activity_13u22fn" targetRef="Gateway_1phnldu" />
    <bpmn2:sequenceFlow id="Flow_1qv5ag8" sourceRef="Gateway_1phnldu" targetRef="Activity_1ljnih3" />
    <bpmn2:userTask id="Activity_07gjyq9" name="主管审批">
      <bpmn2:extensionElements>
        <camunda:formData />
      </bpmn2:extensionElements>
      <bpmn2:incoming>Flow_0m5zgwc</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1404seh</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:userTask id="Activity_13u22fn" name="经理审批">
      <bpmn2:extensionElements>
        <camunda:formData />
      </bpmn2:extensionElements>
      <bpmn2:incoming>Flow_01w5yi9</bpmn2:incoming>
      <bpmn2:outgoing>Flow_1ybu3uo</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="Flow_0zhyy7k" sourceRef="Activity_1ljnih3" targetRef="Event_10d4kyy" />
    <bpmn2:serviceTask id="Activity_1ljnih3" name="服务任务">
      <bpmn2:incoming>Flow_1qv5ag8</bpmn2:incoming>
      <bpmn2:outgoing>Flow_0zhyy7k</bpmn2:outgoing>
    </bpmn2:serviceTask>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1631771171164">
      <bpmndi:BPMNEdge id="Flow_1pkp5w9_di" bpmnElement="Flow_1pkp5w9">
        <di:waypoint x="238" y="430" />
        <di:waypoint x="340" y="430" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0jdfmem_di" bpmnElement="Flow_0jdfmem">
        <di:waypoint x="440" y="430" />
        <di:waypoint x="515" y="430" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0m5zgwc_di" bpmnElement="Flow_0m5zgwc" bioc:stroke="#000" bioc:fill="#fff">
        <di:waypoint x="540" y="405" />
        <di:waypoint x="540" y="290" />
        <di:waypoint x="700" y="290" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="546" y="345" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_01w5yi9_di" bpmnElement="Flow_01w5yi9" bioc:stroke="#000" bioc:fill="#fff">
        <di:waypoint x="540" y="455" />
        <di:waypoint x="540" y="550" />
        <di:waypoint x="700" y="550" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="549" y="500" width="13" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1404seh_di" bpmnElement="Flow_1404seh">
        <di:waypoint x="800" y="290" />
        <di:waypoint x="960" y="290" />
        <di:waypoint x="960" y="405" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ybu3uo_di" bpmnElement="Flow_1ybu3uo">
        <di:waypoint x="800" y="550" />
        <di:waypoint x="960" y="550" />
        <di:waypoint x="960" y="455" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qv5ag8_di" bpmnElement="Flow_1qv5ag8">
        <di:waypoint x="985" y="430" />
        <di:waypoint x="1090" y="430" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0zhyy7k_di" bpmnElement="Flow_0zhyy7k">
        <di:waypoint x="1190" y="430" />
        <di:waypoint x="1242" y="430" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_0thv7ce_di" bpmnElement="Event_0thv7ce">
        <dc:Bounds x="202" y="412" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0opic72_di" bpmnElement="Activity_0em2f9a">
        <dc:Bounds x="340" y="390" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_09lyl61_di" bpmnElement="Gateway_09lyl61" isMarkerVisible="true" bioc:stroke="#000" bioc:fill="#fff">
        <dc:Bounds x="515" y="405" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="600" y="420" width="40" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1phnldu_di" bpmnElement="Gateway_1phnldu" isMarkerVisible="true" bioc:stroke="#000" bioc:fill="#fff">
        <dc:Bounds x="935" y="405" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="858" y="420" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0tb141a_di" bpmnElement="Activity_07gjyq9">
        <dc:Bounds x="700" y="250" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1lo74e4_di" bpmnElement="Activity_13u22fn">
        <dc:Bounds x="700" y="510" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_10d4kyy_di" bpmnElement="Event_10d4kyy" bioc:stroke="#000" bioc:fill="#fff">
        <dc:Bounds x="1242" y="412" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1249" y="455" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1e5pkmq_di" bpmnElement="Activity_1ljnih3">
        <dc:Bounds x="1090" y="390" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
      `;
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: inline-grid;
  grid-template-columns: auto max-content;
}
.demo-control-bar {
  position: fixed;
  right: 8px;
  bottom: 8px;
  z-index: 1;
  .open-control-dialog {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 32px;
    background: rgba(64, 158, 255, 1);
    color: #ffffff;
    cursor: pointer;
  }
}
.control-form {
  .el-radio {
    width: 100%;
    line-height: 32px;
  }
}
body,
body * {
  /* 滚动条 */
  &::-webkit-scrollbar-track-piece {
    background-color: #fff; /*滚动条的背景颜色*/
    -webkit-border-radius: 0; /*滚动条的圆角宽度*/
  }
  &::-webkit-scrollbar {
    width: 10px; /*滚动条的宽度*/
    height: 8px; /*滚动条的高度*/
  }
  &::-webkit-scrollbar-thumb:vertical {
    /*垂直滚动条的样式*/
    height: 50px;
    background-color: rgba(153, 153, 153, 0.5);
    -webkit-border-radius: 4px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条的hover样式*/
    background-color: rgba(159, 159, 159, 0.3);
    -webkit-border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    /*滚动条的hover样式*/
    background-color: rgba(159, 159, 159, 0.5);
    -webkit-border-radius: 4px;
  }
}
</style>
