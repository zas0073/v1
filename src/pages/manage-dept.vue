<template>
  <v-container fluid>
    <h1>부서관리</h1>
    <SearchBar :fields="searchFields" @update:searchQueries="handleSearch" />
    <v-row dense>
      <v-col class="d-flex justify-end mt-3">
        <RegisterManageDeptDialog v-model:showModal="showModal" />
        <v-btn>수정</v-btn>
      </v-col>
    </v-row>
    <RealGrid
      :gridTitle="'부서조회'"
      :gridId="firstGridId"
      :width="gridWidth"
      :height="gridHeight"
      :data="data"
    />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import RealGrid from "@/components/RealGrid.vue";
import RegisterManageDeptDialog from "@/components/dialog/register-manage-dept-dialog.vue";
import { columns, fields, rows } from "@/components/demo/commonGroupCode-data";

const firstGridId = ref("commonGroupCode");
const gridWidth = ref("100%");
const gridHeight = ref("400px");

const searchFields = ref([
  {
    name: "Topdept",
    label: "최상위부서",
    type: "select",
    props: { items: ["최상위부서1", "최상위부서2"], variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
]);

const searchQueries = ref({});

const handleSearch = (queries) => {
  searchQueries.value = queries;
  console.log("검색 조건:", searchQueries.value);
};

const data = ref({ columns, fields, rows });
</script>
