<template>
  <v-container fluid>
    <h1>배치서비스관리</h1>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-row class="d-flex justify-end mt-3">
          <v-col class="d-flex justify-end">
            <v-btn>등록</v-btn>
            <v-btn class="mx-1">수정</v-btn>
            <v-btn>삭제</v-btn>
          </v-col>
        </v-row>
        <RealGrid
          :gridTitle="'배치 그룹'"
          :gridId="firstGridId"
          :width="gridWidth"
          :height="gridHeight"
          :data="data"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row class="d-flex justify-end mt-3">
          <v-col class="d-flex justify-end">
            <RegistBatchServiceDialog v-model:showModal="showModal" />
            <v-btn class="mx-1">수정</v-btn>
            <v-btn>삭제</v-btn>
          </v-col>
        </v-row>
        <RealGrid
          :gridTitle="'배치 서비스'"
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
import RegistBatchServiceDialog from "@/components/dialog/register-batch-service-dialog.vue";

const firstGridId = ref("commonGroupCode");
const gridWidth = ref("100%");
const gridHeight = ref("400px");

const secondGridId = ref("commonCode");
const secondGridWidth = ref("100%");
const secondGridHeight = ref("400px");

const searchQueries = ref({});

const handleSearch = (queries) => {
  searchQueries.value = queries;
  console.log("검색 조건:", searchQueries.value);
};

const data = ref({ columns, fields, rows });
</script>
