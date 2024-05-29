<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="등록"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title>배치서비스 등록</v-card-title>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  label="배치서비스명"
                  v-model="batchServiceName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="serviceGroups"
                  label="배치서비스그룹"
                  v-model="selectedServiceGroup"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="서비스 실행 URL"
                  v-model="serviceUrl"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="클래스 변수명"
                  v-model="className"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="precedenceActions"
                  label="선후행동"
                  v-model="selectedAction"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="우선순위"
                  v-model="priority"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="파라미터"
                  v-model="parameters"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="배치서비스 설명"
                  v-model="description"
                ></v-text-field>
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

const batchServiceName = ref("");
const serviceGroups = ref(["그룹1", "그룹2", "그룹3"]);
const selectedServiceGroup = ref(null);
const serviceUrl = ref("");
const className = ref("");
const precedenceActions = ref(["선후행동", "선후행동"]);
const selectedAction = ref(null);
const priority = ref("");
const parameters = ref("");
const description = ref("");

const emit = defineEmits(["update:showModal"]);

const close = () => {
  emit("update:showModal", false);
};

const submit = () => {
  const BatchServiceData = {
    batchServiceName: batchServiceName.value,
    selectedServiceGroup: selectedServiceGroup.value,
    serviceUrl: serviceUrl.value,
    className: className.value,
    selectedAction: selectedAction.value,
    priority: priority.value,
    parameters: parameters.value,
    description: description.value,
  };
  console.log("등록 데이터:", BatchServiceData);
  close();
};
</script>
