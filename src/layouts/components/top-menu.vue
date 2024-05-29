<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="handleClick"></v-app-bar-nav-icon>

    <v-app-bar-title class="mr-3">키다리스튜디오</v-app-bar-title>

    <v-btn size="small" to="/" exact class="mr-3">Home</v-btn>
    <v-btn variant="outlined" size="small" to="/dashboard" exact class="mr-3"
      >Dashboard</v-btn
    >
    <v-btn variant="outlined" size="small" to="/login" exact class="mr-3"
      >Login</v-btn
    >
    <v-btn
      variant="outlined"
      size="small"
      to="/member/manage"
      exact
      class="mr-3"
      >사용자 페이지(리얼그리드 테스트)</v-btn
    >
  </v-app-bar>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["toggleDrawer"]);
const router = useRouter();

const handleClick = () => {
  console.log("Child button clicked", props.toggleDrawer);
  props.toggleDrawer();
};
</script>

<style lang="scss" scoped>
// .v-toolbar-title {
//   flex: none;
// }
</style>
