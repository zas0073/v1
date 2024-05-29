<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="등록"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title>부서관리 등록</v-card-title>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field label="부서명" v-model="deptName"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="deptDepth" inline label="부서 Depth">
                  <v-radio label="1" value="1"></v-radio>
                  <v-radio label="2" value="2"></v-radio>
                  <v-radio label="3" value="3"></v-radio>
                  <v-radio label="4" value="4"></v-radio>
                  <v-radio label="5" value="5"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="상위부서명"
                  v-model="topDeptName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="정렬순서" v-model="sortSeq"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="닫기" @click="isActive.value = false"></v-btn>
          <v-btn color="primary" text="등록" @click="submit"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  showModal: Boolean,
});

const deptName = ref("");
const deptDepth = ref("1");
const topDeptName = ref("");
const sortSeq = ref("");

const emit = defineEmits(["update:showModal"]);

const close = () => {
  emit("update:showModal", false);
};

const submit = () => {
  const manageDeptData = {
    deptName: deptName.value,
    deptDepth: deptDepth.value,
    topDeptName: topDeptName.value,
    sortSeq: sortSeq.value,
  };
  console.log("등록 데이터:", manageDeptData);
  close();
};
</script>
