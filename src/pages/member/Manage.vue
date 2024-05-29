<template>
  <v-container fluid>
    <SearchBar :fields="searchFields" @update:searchQueries="handleSearch" />
    <v-row>
      <v-col>
        <v-btn @click="openAlert" text="경고창 오픈"></v-btn>
        <v-btn @click="startProgress" text="진행 표시줄 start"></v-btn>
      </v-col>
    </v-row>
    <RealGrid
      :gridTitle="'사용자목록'"
      :gridId="'userList'"
      :width="'100%'"
      :height="'400px'"
      :data="data"
    />
  </v-container>
</template>

<script setup>
import { ref, inject } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import RealGrid from "@/components/RealGrid.vue";
import RegisterUserDialog from "@/components/dialog/register-user-dialog.vue";
import { columns, fields, rows } from "@/components/demo/user-data";

const date = ref(null);
const alertBus = inject("alertBus");
const progressBus = inject("progressBus");

const searchFields = ref([
  {
    name: "userName",
    label: "사용자이름",
    type: "text",
    props: { variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "userId",
    label: "사용자ID",
    type: "text",
    props: { variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "useYn",
    label: "사용여부",
    type: "select",
    props: {
      items: [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
      ],
      variant: "outlined",
    },
    cols: 12,
    sm: 6,
    md: 3,
  },
]);

const searchQueries = ref({});

function openAlert() {
  alertBus.emit("alert-open", {
    icon: "mdi-alert",
    title: "Update",
    text: "집에 가고싶다.",
  });
}

function startProgress() {
  progressBus.emit("progress-start");
}

const handleSearch = (queries) => {
  searchQueries.value = queries;
  console.log("검색 조건:", searchQueries.value);
};

const data = ref({ columns, fields, rows });
</script>
