<template>
  <v-container fluid>
    <h1>공통코드관리</h1>
    <SearchBar :fields="searchFields" @update:searchQueries="handleSearch" />
    <v-row dense>
      <v-col cols="12" md="6">
        <v-row class="d-flex justify-end mt-3">
          <v-col class="d-flex justify-end">
            <v-btn>초기화</v-btn>
            <v-btn class="mx-1">행 추가</v-btn>
            <v-btn>행 삭제</v-btn>
            <v-btn class="mx-1">저장</v-btn>
          </v-col>
        </v-row>
        <RealGrid
          :gridTitle="'공통 그룹코드'"
          :gridId="firstGridId"
          :width="gridWidth"
          :height="gridHeight"
          :data="data"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row class="d-flex justify-end mt-3">
          <v-col class="d-flex justify-end">
            <v-btn>초기화</v-btn>
            <v-btn class="mx-1">행 추가</v-btn>
            <v-btn>행 삭제</v-btn>
            <v-btn class="mx-1">저장</v-btn>
          </v-col>
        </v-row>
        <RealGrid
          :gridTitle="'공통 코드'"
          :gridId="secondGridId"
          :width="secondGridWidth"
          :height="secondGridHeight"
          :data="data"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import RealGrid from "@/components/RealGrid.vue";
import { columns, fields, rows } from "@/components/demo/commonGroupCode-data";

const firstGridId = ref("commonGroupCode");
const gridWidth = ref("100%");
const gridHeight = ref("400px");

const secondGridId = ref("commonCode");
const secondGridWidth = ref("100%");
const secondGridHeight = ref("200px");

const searchFields = ref([
  {
    name: "commonGroupCode",
    label: "공통 그룹코드",
    type: "text",
    props: { variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "commonGroupCodeName",
    label: "공통 그룹코드명",
    type: "text",
    props: { variant: "outlined" },
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
