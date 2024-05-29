<template>
  <v-dialog v-model="isActive" max-width="960">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="등록"></v-btn>
    </template>

    <template v-slot:default>
      <v-card title="화면관리 정보 등록/수정" max-height="840">
        <template v-slot:text>
          <v-container class="mb-6">
            <v-row no-gutters>
              <v-col cols="6" class="pa-2">
                <v-sheet border rounded class="pa-2">
                  <v-row>
                    <v-col cols="9">
                      <v-text-field
                        label="*화면관리번호"
                        v-model="manageScreenNo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-btn
                        @click="handleManageScreenNoClick"
                        text="중복체크"
                      ></v-btn>
                    </v-col>
                  </v-row>
                  <v-text-field label="화면명"></v-text-field>
                  <v-radio-group
                    v-model="divComponent"
                    inline
                    label="*컴포넌트구분"
                  >
                    <v-radio label="마스터" value="1"></v-radio>
                    <v-radio label="팝업" value="2"></v-radio>
                    <v-radio label="탭" value="3"></v-radio>
                    <v-radio label="리포트" value="4"></v-radio>
                    <v-radio label="기능" value="5"></v-radio>
                  </v-radio-group>

                  <v-select label="상위메뉴번호" v-model="topMenuNo"></v-select>
                  <v-text-field
                    label="화면 ID"
                    v-model="screenId"
                  ></v-text-field>
                </v-sheet>
              </v-col>
              <v-col cols="6" class="pa-2">
                <v-sheet border rounded class="pa-2">
                  <v-radio-group v-model="status">
                    <v-row>
                      <v-col cols="4">*사용여부</v-col>
                      <v-col cols="4">
                        <v-radio label="사용" value="Y"></v-radio>
                      </v-col>
                      <v-col cols="4">
                        <v-radio label="미사용" value="N"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <v-text-field
                    label="화면 설명"
                    v-model="screenInfo"
                  ></v-text-field>
                  <v-text-field
                    label="*컴포넌트 파일명"
                    v-model="componentFileName"
                  ></v-text-field>
                  <v-select
                    label="컴포넌트 그룹 경로"
                    v-model="componentGroupPath"
                  ></v-select>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="popupXRatio"
                        label="팝업가로비율"
                        maxlength="6"
                        placeholder=""
                      ></v-text-field>
                    </v-col>
                    <v-col cols="">
                      <v-text-field
                        v-model="popupYRatio"
                        label="팝업세로비율"
                        maxlength="6"
                        placeholder=""
                      ></v-text-field>
                    </v-col>
                  </v-row>
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

const isActive = ref(false);
const isMenuOpen = ref(false);
const selectedDate = ref();

const manageScreenNo = ref("");
const divComponent = ref("1");
const topMenuNo = ref("");
const screenId = ref("");
const status = ref("Y");
const screenInfo = ref("");
const componentFileName = ref("");
const componentGroupPath = ref("");
const popupXRatio = ref("");
const popupYRatio = ref("");

function openDialog() {
  isActive.value = true;
}

function closeDialog() {
  isActive.value = false;
}

const submit = () => {
  const manageScreenData = {
    manageScreenNo: manageScreenNo.value,
    divComponent: divComponent.value,
    topMenuNo: topMenuNo.value,
    screenId: screenId.value,
    status: status.value,
    screenInfo: screenInfo.value,
    componentFileName: componentFileName.value,
    componentGroupPath: componentGroupPath.value,
    popupXRatio: popupXRatio.value,
    popupYRatio: popupYRatio.value,
  };
  console.log("등록 데이터:", manageScreenData);
  close();
};

function handleManageScreenNoClick() {}
</script>
