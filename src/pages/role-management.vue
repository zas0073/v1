<template>
  <v-container fluid>
    <v-form>
      <v-tabs v-model="tab" bg-color="secondary2">
        <v-tab color="point" value="one">그룹 권한 관리</v-tab>
        <v-tab color="point" value="two">사용자 별 추가 권한 관리</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <v-row class="justify-end">
              <v-col cols="12" class="d-flex justify-end align-center">
                <v-btn
                    @click="onSearch"
                    color="primary"
                    prepend-icon="mdi-magnify"
                    class="my-2"
                >
                  조회
                </v-btn>
              </v-col>
            </v-row>
            <v-tabs v-model="group_tab">
              <v-tab value="group_one">그룹 메뉴 권한</v-tab>
              <v-tab value="group_two">그룹 팝업 권한</v-tab>
              <v-tab value="group_three">그룹 기능 권한</v-tab>
            </v-tabs>
            <v-card-text>
              <v-tabs-window v-model="group_tab">
                <v-tabs-window-item value="group_one">
                  <v-row>
                    <v-col cols="12" md="5">
                      <v-row dense>
                        <v-col class="d-flex justify-end mt-3">
                          <v-btn class="ml-2">권한 그룹 ID 변경</v-btn>
                          <v-btn class="ml-2">행추가</v-btn>
                          <v-btn class="ml-2">행삭제</v-btn>
                        </v-col>
                      </v-row>
                      <RealGrid
                        :gridTitle="'그룹메뉴 권한'"
                        :gridId="firstGridId"
                        :width="gridWidth"
                        :height="gridHeight"
                        :data="data"
                      />
                    </v-col>
                    <v-col cols="12" md="7">
                      <v-row dense>
                        <v-col class="d-flex justify-end mt-3">
                          <v-btn class="ml-2">저장</v-btn>
                        </v-col>
                      </v-row>
                      <RealTreeGrid
                        :gridTitle="'그룹메뉴 권한'"
                        :gridId="secondGridId"
                        :width="gridWidth"
                        :height="gridHeight"
                        :data="data"
                      />
                    </v-col>
                  </v-row>
                </v-tabs-window-item>
                <v-tabs-window-item value="group_two">
                  그룹 팝업 권한
                </v-tabs-window-item>
                <v-tabs-window-item value="group_three">
                  그룹 기능 권한
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            사용자 별 추가 권한 관리
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  columns,
  fields,
  rows,
} from "@/components/demo/menu-structure-management-data";
import RealTreeGrid from "@/components/RealTreeGrid.vue";
import RealGrid from "@/components/RealGrid.vue";
import SearchBar from "@/components/SearchBar.vue";

const tab = ref("null");
const group_tab = ref("null");
const firstGridId = ref("roleManagement");
const secondGridId = ref("role");
const gridWidth = ref("100%");
const gridHeight = ref("400px");
const data = ref({ columns, fields, rows });
const searchFields = ref([]);
const searchQueries = ref({});

const handleSearch = (queries) => {
  searchQueries.value = queries;
  console.log("검색 조건:", searchQueries.value);
};

onMounted(() => {});
</script>
