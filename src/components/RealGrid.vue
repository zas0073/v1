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
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields, rows } from "./demo/user-data";

let gridView = GridView;
let dataProvider = LocalDataProvider;

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
  dataProvider = new LocalDataProvider(false);
  gridView = new GridView(gridId);
  gridView.setDataSource(dataProvider);
  dataProvider.setFields(data.fields);
  gridView.setColumns(data.columns);
  dataProvider.setRows(data.rows);

  count.value = dataProvider.getRowCount();

  gridView.displayOptions.fitStyle = "fill";
}

onMounted(() => {
  console.log("onMounted");
  initGrid();
});
</script>

<style>
@import "../../node_modules/realgrid/dist/realgrid-style.css";
</style>
