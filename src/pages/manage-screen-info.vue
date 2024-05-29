<template>
  <v-container fluid>
    <h1>화면정보관리</h1>
    <SearchBar :fields="searchFields" @update:searchQueries="handleSearch" />
    <v-row dense>
      <v-col class="d-flex justify-end mt-3">
        <RegisterManageScreenInfo v-model:showModal="showModal" />
        <v-btn class="mx-1">수정</v-btn>
        <v-btn>삭제</v-btn>
      </v-col>
    </v-row>
    <RealGrid
      :gridTitle="'화면정보관리'"
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
import RegisterManageScreenInfo from "@/components/dialog/register-manage-screen-info.vue";
import { columns, fields, rows } from "@/components/demo/commonGroupCode-data";

const firstGridId = ref("commonGroupCode");
const gridWidth = ref("100%");
const gridHeight = ref("400px");

const searchFields = ref([
  {
    name: "MenuGroup",
    label: "메뉴그룹",
    type: "select",
    props: { items: ["메뉴1", "메뉴2"], variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "ScreenName",
    label: "화면명",
    type: "text",
    props: { variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "Use",
    label: "사용여부",
    type: "select",
    props: { items: ["사용", "미사용"], variant: "outlined" },
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
