<template>
  <!-- progress circle -->
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
  <!-- alert -->
  <v-dialog v-model="dialog.open" width="auto" persistent>
    <v-card
      max-width="400"
      :prepend-icon="dialog.icon"
      :text="dialog.text"
      :title="dialog.title"
    >
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" @click="closeAlertBus"></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <router-view />
</template>

<script setup>
import { inject, ref, onMounted, onBeforeUnmount } from "vue";

const overlay = ref(false);
const dialog = ref({
  open: false,
  title: "",
  text: "",
  icon: "mdi-alert",
});

const alertBus = inject("alertBus");
const progressBus = inject("progressBus");

function openAlertBus(args) {
  dialog.value.open = true;
  dialog.value.title = args.title;
  dialog.value.text = args.text;
  dialog.value.icon = args.icon;
}

function closeAlertBus() {
  dialog.value.open = false;
  dialog.value.title = "";
  dialog.value.text = "";
  dialog.value.icon = "";
}

function handleProgress(type, args) {
  console.log(type, args);
  if (type === "progress-start") {
    overlay.value = true;
  } else if (type === "progress-end") {
    overlay.value = false;
  }
}

function handleAlert(type, args) {
  console.log(type, args);
  if (type === "alert-open") {
    openAlertBus(args);
  }
}

onMounted(() => {
  // 진행 표시줄
  progressBus.on("*", handleProgress);
  // 경고창
  alertBus.on("*", handleAlert);
});

onBeforeUnmount(() => {
  progressBus.off("*", handleProgress);
  alertBus.off("*", handleAlert);
});
</script>
