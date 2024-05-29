<template>
  <v-container fluid>
    <SearchBar :fields="searchFields" @update:searchQueries="handleSearch" />
    <v-row dense>
      <v-col class="d-flex justify-end mt-3">
        <RegisterUserDialog />
        <v-btn>수정</v-btn>
        <v-btn>사용정지</v-btn>
        <v-btn>비밀번호 초기화 대상 선택</v-btn>
        <v-btn>엑셀다운로드</v-btn>
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
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import RealGrid from "@/components/RealGrid.vue";
import RegisterUserDialog from "@/components/dialog/register-user-dialog.vue";
import { columns, fields, rows } from "@/components/demo/user-data";

const date = ref(null);

const searchFields = ref([
  {
    name: "contentName",
    label: "콘텐츠명",
    type: "text",
    props: { variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "authorName",
    label: "저작자명(필명)",
    type: "text",
    props: { variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "form",
    label: "형태",
    type: "select",
    props: {
      items: [
        { label: "웹툰", value: "3" },
        { label: "소설", value: "10" },
      ],
      variant: "outlined",
    },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "genre",
    label: "장르",
    type: "select",
    props: {
      items: [
        { label: "웹툰", value: "3" },
        { label: "소설", value: "10" },
      ],
      variant: "outlined",
    },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "checkboxGroup",
    label: "체크그룹",
    type: "checkbox-group",
    props: {
      items: [
        { label: "All", value: "all" },
        { label: "체크박스01", value: "ch1" },
        { label: "체크박스02", value: "ch2" },
      ],
      variant: "outlined",
    },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "form2",
    label: "형태",
    type: "select",
    props: { items: ["웹툰", "소설"], variant: "outlined" },
    cols: 12,
    sm: 6,
    md: 3,
  },
  {
    name: "contractDate",
    label: "계약일자",
    type: "date",
    props: { variant: "outlined" },
    cols: 12,
    sm: 12,
    md: 6,
  },
  {
    name: "contractPeriod",
    label: "계약기간",
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
