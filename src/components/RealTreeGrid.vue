<template>
  <span
  ><strong>{{ gridTitle }}: </strong> 총{{ count }}건</span
  >
  <div
      :id="gridId"
      :style="{ width: width, height: height }"
      :data="data"
  ></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {TreeView, LocalTreeDataProvider} from "realgrid";

let treeView = TreeView;
let treeProvider = LocalTreeDataProvider;

const count = ref(0);

const { width, height, gridId, data } = defineProps({
  gridTitle: {
    type: String,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "400px",
  },
  gridId: {
    type: String,
    default: "realgrid",
    required: true,
  },
  data: {
    type: Object,
  },
});

const loadData = () => {
  console.log("done!");
};

function initGrid() {
  treeProvider = new LocalTreeDataProvider(false);
  treeView = new TreeView(gridId);
  treeView.setDataSource(treeProvider);
  treeProvider.setFields(data.fields);
  treeView.setColumns(data.columns);
  treeProvider.setRows(data.rows, "treeId", true);

  count.value = treeProvider.getRowCount();

  treeView.displayOptions.fitStyle = "fill";
  treeView.expandAll();
}

onMounted(() => {
  console.log("onMounted");
  initGrid();
});
</script>

<style>
@import "../../node_modules/realgrid/dist/realgrid-style.css";
</style>
