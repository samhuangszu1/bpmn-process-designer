<template>
  <div class="containers">
    <div ref="canvas" class="canvas"></div>
    <!-- <div ref="canvas1" class="canvas"></div> -->
  </div>
</template>

<script>
import BpmnViewer from "bpmn-js/lib/NavigatedViewer";

export default {
  name: "MyProcessViewer",
  props: {
    value: String,
    taskData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      taskList: [],
      bpmnViewer: undefined,
    };
  },
  mounted() {
    if (this.value !== "") {
      this.renderProcess(this.value);
    }
  },
  watch: {
    value: function() {
      this.renderProcess();
    },
  },
  methods: {
    async renderProcess() {
      this.taskList = this.taskData;
      if (!this.bpmnViewer) {
        this.bpmnViewer = new BpmnViewer({
          container: this.$refs["canvas"],
          bpmnRenderer: {
            // defaultFillColor: "rgba(30,30,30,1)",
            // defaultStrokeColor: "red"
          },
        });
      }

      try {
        const { warning } = await this.bpmnViewer.importXML(this.value);
        let canvas = this.bpmnViewer.get("canvas");
        if (this.taskList && this.taskList.length > 0) {
          this.bpmnViewer
            .getDefinitions()
            .rootElements[0].flowElements.forEach((n) => {
              console.log("node: ", n);
              if (/^(bpmn:.*Task)$/.test(n.$type)) {
                console.log(`draw: ${n.id}`);
                let completeTask = this.taskList.find((m) => m.key === n.id);
                let todoTask = this.taskList.find((m) => !m.completed);
                let endTask = this.taskList[this.taskList.length - 1];
                console.log("complete task: ", completeTask);
                if (completeTask) {
                  canvas.addMarker(
                    n.id,
                    completeTask.completed ? "highlight" : "highlight-todo"
                  );
                  n.outgoing.forEach((nn) => {
                    let targetTask = this.taskList.find(
                      (m) => m.key === nn.targetRef.id
                    );
                    if (targetTask) {
                      canvas.addMarker(
                        nn.id,
                        targetTask.completed ? "highlight" : "highlight-todo"
                      );
                    } else if (nn.targetRef.$type === "bpmn:ExclusiveGateway") {
                      // canvas.addMarker(nn.id, 'highlight');
                      canvas.addMarker(
                        nn.id,
                        completeTask.completed ? "highlight" : "highlight-todo"
                      );
                      canvas.addMarker(
                        nn.targetRef.id,
                        completeTask.completed ? "highlight" : "highlight-todo"
                      );
                    } else if (nn.targetRef.$type === "bpmn:EndEvent") {
                      if (!todoTask && endTask.key === n.id) {
                        canvas.addMarker(nn.id, "highlight");
                        canvas.addMarker(nn.targetRef.id, "highlight");
                      }
                      if (!completeTask.completed) {
                        canvas.addMarker(nn.id, "highlight-todo");
                        canvas.addMarker(nn.targetRef.id, "highlight-todo");
                      }
                    }
                  });
                }
              } else if (n.$type === "bpmn:ExclusiveGateway") {
                n.outgoing.forEach((nn) => {
                  let targetTask = this.taskList.find(
                    (m) => m.key === nn.targetRef.id
                  );
                  if (targetTask) {
                    canvas.addMarker(
                      nn.id,
                      targetTask.completed ? "highlight" : "highlight-todo"
                    );
                  }
                });
              }
              if (n.$type === "bpmn:StartEvent") {
                n.outgoing.forEach((nn) => {
                  let completeTask = this.taskList.find(
                    (m) => m.key === nn.targetRef.id
                  );
                  if (completeTask) {
                    console.log("highlight start event: ", n);
                    canvas.addMarker(nn.id, "highlight");
                    canvas.addMarker(n.id, "highlight");
                    return;
                  }
                });
              }
            });
        }
      } catch (err) {
        console.log("error rendering", err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.containers {
  position: absolute;
  background-color: #ffffff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.canvas {
  width: 100%;
  height: 100%;
}
::v-deep .highlight.djs-shape .djs-visual > :nth-child(1) {
  fill: green !important;
  stroke: green !important;
  fill-opacity: 0.2 !important;
}
// ::v-deep .highlight.djs-shape .djs-visual > :nth-child(2) {
//   fill: green !important;
// }
::v-deep .highlight.djs-shape .djs-visual > path {
  fill: green !important;
  fill-opacity: 0.2 !important;
  stroke: green !important;
}
::v-deep .highlight.djs-connection .djs-visual > path {
  stroke: green !important;
}
::v-deep .highlight-todo.djs-connection .djs-visual > path {
  stroke: orange !important;
  stroke-dasharray: 4px !important;
  fill-opacity: 0.2 !important;
  marker-end: url(#sequenceflow-end-_E7DFDF-_E7DFDF-803g1kf6zwzmcig1y2ulm5egr);
}
::v-deep .highlight-todo.djs-shape .djs-visual > :nth-child(1) {
  fill: orange !important;
  stroke: orange !important;
  stroke-dasharray: 4px !important;
  fill-opacity: 0.2 !important;
}
// ::v-deep .highlight-todo.djs-shape .djs-visual > :nth-child(2) {
//   fill: orange !important;
// }
::v-deep .overlays-div {
  font-size: 10px;
  color: red;
  width: 100px;
  top: -20px !important;
}
</style>
