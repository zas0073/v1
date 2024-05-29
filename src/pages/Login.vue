<template>
  <v-card elevation="0" width="600">
    <v-card-title class="py-5 font-weight-black">차세대업무시스템</v-card-title>
    <v-card-text class="pa-0">
      <v-container class="pa-4">
        <v-text-field
          :label="$t('login.username')"
          variant="outlined"
          single-line
          class="mb-4"
          :rules="usernameRules"
          v-model="username"
        ></v-text-field>

        <v-text-field
          :label="$t('login.password')"
          type="password"
          variant="outlined"
          single-line
          class="mb-4"
          :rules="passwordRules"
          v-model="password"
        ></v-text-field>

        <v-btn
          :disabled="loading"
          :loading="loading"
          class="text-none mb-4"
          color="primary"
          size="x-large"
          block
          @click="verifyAndContinue"
        >
          {{ $t("login.signIn") }}
        </v-btn>

        <v-btn
          class="text-none"
          color="grey-lighten-3"
          size="x-large"
          block
          @click="goHome"
        >
          {{ $t("login.backToHome") }}
        </v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usernameRules, passwordRules } from "@/utils/validationRules"; // 유효성 검사 규칙 가져오기

const loading = ref(false);
const username = ref("");
const password = ref("");
const router = useRouter();

const goHome = () => {
  router.push("/");
};

const verifyAndContinue = () => {
  // 유효성 검사가 통과된 경우에만 loading 상태 변경
  if (
    usernameRules.every((rule) => rule(username.value) === true) &&
    passwordRules.every((rule) => rule(password.value) === true)
  ) {
    loading.value = !loading.value;
    // 인증 및 계속하기 위한 로직 추가
  }
};
</script>

<route lang="yaml">
meta:
  layout: vertical-split
  bgColor: yellow
</route>
