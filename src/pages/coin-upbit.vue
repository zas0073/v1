<template>
    <v-container fluid>
        <RealGrid
          :gridTitle="'공통 코드'"
          :gridId="firstGridId"
          :width="gridWidth"
          :height="gridHeight"
          :data="data"
        />
    </v-container>
  </template>
  
<script setup>
import {ref, onMounted} from "vue";
import RealGrid from "@/components/RealGrid.vue";
import { columns, fields, rows } from "@/components/demo/commonGroupCode-data";
  
  const firstGridId = ref("coinUpbit");
  const gridWidth = ref("100%");
  const gridHeight = ref("400px");
  
  const data = ref({columns, fields, rows});
  
  onMounted(() => {
  });
</script>
  