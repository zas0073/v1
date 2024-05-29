<template>
  <v-app id="inspire" class="fill-height">
    <v-main class="bg-grey-lighten-3 pa-0 ma-0 fill-height">
      <v-container fluid class="pa-0 ma-0 fill-height">
        <v-row class="fill-height no-gutters">
          <v-col cols="12" md="6" class="fill-height pa-0">
            <v-sheet
              height="100%"
              color="primary"
              class="d-flex justify-center align-center"
            >
              <h1 class="text-center">
                최고의 컨텐츠<br />소비가치를 만드는것
              </h1>
            </v-sheet>
          </v-col>

          <v-col cols="12" md="6" class="fill-height pa-0">
            <v-sheet height="100%" class="d-flex justify-center align-center">
              <!-- 두 번째 화면의 콘텐츠를 여기에 추가 -->
              <RouterView />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup></script>

<style scoped>
.fill-height {
  height: 100vh;
}
.no-gutters {
  margin: 0;
  padding: 0;
}
</style>
