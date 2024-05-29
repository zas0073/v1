<template>
  <v-dialog v-model="isActive" max-width="960">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" v-text="dialogTitle" class="ml-2"></v-btn>
    </template>

    <template v-slot:default>
      <v-card title="메뉴 등록/수정 화면" max-height="840">
        <template v-slot:text>
          <v-container class="mb-6">
            <v-row no-gutters>
              <v-col cols="6" class="pa-2">
                <v-sheet border rounded class="pa-2">
                  <v-row>
                    <v-col cols="9">
                      <v-text-field label="* 메뉴번호"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-btn
                          @click="handleMenuIdButtonClick"
                          text="중복체크"
                      ></v-btn>
                    </v-col>
                  </v-row>
                  <v-radio-group v-model="menuDepth">
                    <v-row>
                      <v-col cols="3">*메뉴 깊이</v-col>
                      <v-col cols="3">
                        <v-radio label="1" value="1"></v-radio>
                      </v-col>
                      <v-col cols="3">
                        <v-radio label="2" value="2"></v-radio>
                      </v-col>
                      <v-col cols="3">
                        <v-radio label="3" value="3"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <v-text-field label="* 메뉴 URL"/>
                  <v-select
                      label="* 화면그룹"
                      :items="[
                      '9000',
                      '9100',
                      '9200',
                    ]"/>
                  <v-text-field label="* 메뉴 순서"/>
                </v-sheet>
              </v-col>
              <v-col cols="6" class="pa-2">
                <v-sheet border rounded class="pa-2">
                  <v-text-field label="* 메뉴명"></v-text-field>
                  <v-text-field label="상위 메뉴번호"></v-text-field>
                  <v-radio-group v-model="status">
                    <v-row>
                      <v-col cols="4">* 사용여부</v-col>
                      <v-col cols="4">
                        <v-radio label="사용" value="Y"></v-radio>
                      </v-col>
                      <v-col cols="4">
                        <v-radio label="미사용" value="N"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <v-select
                      label="화면 ID"
                      :items="[
                      '9000',
                      '9100',
                      '9101',
                      '9102'
                    ]"
                  ></v-select>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <div class="pa-4 text-end border-t">
          <v-spacer></v-spacer>

          <v-btn text="닫기" @click="closeDialog" variant="outlined"></v-btn>

          <v-btn
              text="저장"
              class="ml-3"
              depressed
              large
              color="primary"
              @click="closeDialog"
          ></v-btn>
        </div>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const { width, height, gridId, data } = defineProps({
  dialogTitle: {
    type: String,
  }
});

const isActive = ref(false);
const menuDepth = ref("1");
const status = ref("Y");

function closeDialog() {
  isActive.value = false;
}

function handleMenuIdButtonClick() {
  // 사용자 아이디 버튼 클릭 시 처리할 로직
  console.log("사용자 ID 버튼 클릭");
}
</script>
