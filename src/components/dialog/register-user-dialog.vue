<template>
  <v-dialog v-model="isActive" max-width="960">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="신규등록"></v-btn>
    </template>

    <template v-slot:default>
      <v-card title="사용자 등록/수정" max-height="840">
        <template v-slot:text>
          <v-container class="mb-6">
            <p class="pa-2">
              사용자 정보를 등록 혹은 수정 하세요.<br />
              소속회사 선택 시, 위임사 여부는 자동 적용(키다리스튜디오외
              위임사로 간주)
            </p>
            <v-row no-gutters>
              <v-col cols="6" class="pa-2">
                <v-sheet border rounded class="pa-2">
                  <v-row>
                    <v-col cols="9">
                      <v-text-field label="*사용자ID"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-btn
                        @click="handleUserIdButtonClick"
                        text="중복체크"
                      ></v-btn>
                    </v-col>
                  </v-row>
                  <v-select
                    label="*메뉴권한번호"
                    :items="[
                      'California',
                      'Colorado',
                      'Florida',
                      'Georgia',
                      'Texas',
                      'Wyoming',
                    ]"
                  ></v-select>
                  <v-select
                    label="직급"
                    :items="[
                      'California',
                      'Colorado',
                      'Florida',
                      'Georgia',
                      'Texas',
                      'Wyoming',
                    ]"
                  ></v-select>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="phonePart1"
                        label="회사전화"
                        maxlength="3"
                        placeholder="010"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="phonePart2"
                        maxlength="4"
                        placeholder="1234"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="phonePart3"
                        maxlength="4"
                        placeholder="5678"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field label="내선번호"></v-text-field>
                  <v-text-field label="이메일 주소"></v-text-field>
                  <v-text-field label="FIS ID"></v-text-field>
                </v-sheet>
              </v-col>
              <v-col cols="6" class="pa-2">
                <v-sheet border rounded class="pa-2">
                  <v-text-field label="사용자이름"></v-text-field>
                  <v-row>
                    <v-col cols="7">
                      <v-menu
                        v-model="isMenuOpen"
                        :close-on-content-click="true"
                      >
                        <template v-slot:activator="{ props }">
                          <v-text-field
                            label="생년월일"
                            :model-value="selectedDate"
                            readonly
                            v-bind="props"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="selectedDate"></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="5">
                      <v-radio-group inline>
                        <v-radio label="양력" value="one"></v-radio>
                        <v-radio label="음력" value="two"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-radio-group v-model="status">
                    <v-row>
                      <v-col cols="4">*사용여부</v-col>
                      <v-col cols="4">
                        <v-radio label="사용" value="one"></v-radio>
                      </v-col>
                      <v-col cols="4">
                        <v-radio label="미사용" value="two"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <v-select
                    label="사업부/부서/팀"
                    :items="[
                      'California',
                      'Colorado',
                      'Florida',
                      'Georgia',
                      'Texas',
                      'Wyoming',
                    ]"
                  ></v-select>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="phonePart1"
                        label="핸드폰번호"
                        maxlength="3"
                        placeholder="010"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="phonePart2"
                        maxlength="4"
                        placeholder="1234"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="phonePart3"
                        maxlength="4"
                        placeholder="5678"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field label="비밀번호 오입력 횟수"></v-text-field>
                  <v-text-field label="IP"></v-text-field>
                </v-sheet>
              </v-col>
            </v-row>
            <p class="text-red-lighten-1 pa-2">
              사용자 신규 등록시, 비밀번호는 []로 초기세팅 됩니다.
              <strong class="grey--text text--darken-2">inciderint</strong>
            </p>
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

const isActive = ref(false);
const isMenuOpen = ref(false);
const selectedDate = ref();

function openDialog() {
  isActive.value = true;
}

function closeDialog() {
  isActive.value = false;
}

function handleUserIdButtonClick() {
  // 사용자 아이디 버튼 클릭 시 처리할 로직
  console.log("사용자 ID 버튼 클릭");
}
</script>
