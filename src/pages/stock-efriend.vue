<template>
    <v-container fluid>
      <v-form>
        <!-- <SearchBar :fields="searchFields" @update:searchQueries="handleSearch"/>
        <v-row dense>
          <v-col class="d-flex justify-end mt-3">
            <v-btn class="ml-2">복사등록</v-btn>
            <MenuStructureDialog :dialogTitle="'등록'"/>
            <MenuStructureDialog :dialogTitle="'수정'"/>
            <v-btn class="ml-2">사용정지</v-btn>
          </v-col>
        </v-row> -->
        <RealTreeGrid
            :gridTitle="'메뉴 구조 조회'"
            :gridId="firstGridId"
            :width="gridWidth"
            :height="gridHeight"
            :data="data"
        />
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import {ref, onMounted} from "vue";
  import RealTreeGrid from "@/components/RealTreeGrid.vue";
  import MenuStructureDialog from "@/components/dialog/menu-structure-dialog.vue";
  import {
    columns,
    fields,
    rows,
  } from "@/components/demo/menu-structure-management-data";
  import SearchBar from "@/components/SearchBar.vue";
  
  const firstGridId = ref("commonGroupCode");
  const gridWidth = ref("100%");
  const gridHeight = ref("400px");
  const searchFields = ref([
    {
      name: "TopMenu",
      label: "상위메뉴",
      type: "select",
      props: {
        items: [
          {label: "전체", value: "all"},
          {label: "항목 1", value: "item1"},
          {label: "항목 2", value: "item2"},
          {label: "항목 3", value: "item3"},
        ], variant: "outlined"
      },
      cols: 12,
      sm: 6,
      md: 3,
    },
  ]);
  
  const searchQueries = ref({});
  
  const data = ref({columns, fields, rows});
  
  const handleSearch = (queries) => {
    searchQueries.value = queries;
    console.log("검색 조건:", searchQueries.value);
  };
  onMounted(() => {
  });
  </script>
  