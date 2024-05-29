<template>
  <v-container fluid>
    <h1>배치로그조회</h1>
    <SearchBar :fields="searchFields" @update:searchQueries="handleSearch" />
    <v-row dense>
      <!-- <v-col cols="12" md="12">
          <v-row dense>
          <v-col cols="4">
            <v-text-field type="date" label="시작 날짜"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field type="date" label="종료 날짜"></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="search">검색</v-btn>
          </v-col> 

        </v-row> -->
      <v-col>
        <RealGrid
          :gridTitle="'배치로그조회'"
          :gridId="firstGridId"
          :width="gridWidth"
          :height="gridHeight"
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

const searchFields = ref([
  {
    name: "contractPeriod",
    label: "배치",
    type: "date-range",
    props: { variant: "outlined" },
    cols: 12,
    sm: 12,
    md: 6,
  },
]);

const searchQueries = ref({});

const handleSearch = (queries) => {
  searchQueries.value = queries;
  console.log("검색 조건:", searchQueries.value);
};

const data = ref({ columns, fields, rows });
</script>
