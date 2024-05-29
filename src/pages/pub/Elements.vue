<template>

  <ul :class="['pubGuideList', themeClass]" >
    <li>

      <h2>ELEMENTS</h2>

      <p class="t-ex">
        body태그에 .theme-b 클래스가 추가되면 <span class="primary-g"></span> -> <span class="primary-b"></span> 주조색 변경 
      </p>
      <div class="pubGuideBox">
        <br>
        <v-btn class="btn-theme-change" @click="changeTheme"><span class="txt">테마 <br>변경</span></v-btn>
      </div>
    </li>

    <!-- 아이콘14 -->
    <li>
      <h2 class="pubGuidetit">아이콘 - 14</h2>
      <div class="pubGuideBox bgBlack">
        <i class="icon i-14 i-14-arrow-right-primary"></i>
        <i class="icon i-14 i-14-arrow-right-white"></i>
        <i class="icon i-14 i-14-arrow-right-red"></i>
        <i class="icon i-14 i-14-arrow-right-black"></i>
      </div>
    </li>

    <!-- 아이콘16 -->
    <li>
      <h2 class="pubGuidetit">아이콘 - 16</h2>
      <div class="pubGuideBox bgBlack">
        <i class="icon i-16 i-16-arrow-right-primary"></i>
        <i class="icon i-16 i-16-arrow-right-white"></i>
        <i class="icon i-16 i-16-arrow-right-red"></i>
        <i class="icon i-16 i-16-arrow-right-black"></i>
      </div>
    </li>

    <!-- 아이콘18 -->
    <li>
      <h2 class="pubGuidetit">아이콘 - 18</h2>
      <div class="pubGuideBox bgBlack">
        <i class="icon i-18 i-18-arrow-right-primary"></i>
        <i class="icon i-18 i-18-arrow-right-white"></i>
        <!-- <i class="icon i-18 i-18-arrow-right-red"></i> -->
        <i class="icon i-18 i-18-arrow-right-black"></i>
      </div>
    </li>

    <!-- 버튼 - 높이40 -->
    <li>
      <h2 class="pubGuidetit">버튼 - 높이40 (size:default)</h2>
      <div class="pubGuideBox">
        <v-btn class="btn bgc-primary"><span class="txt">bgc-primary</span></v-btn>
        <v-btn class="btn bgc-red"><span class="txt">bgc-red</span></v-btn>
        <v-btn class="btn bgc-primary" disabled><span class="txt">bgc-primary disabled</span></v-btn>

        <v-btn class="btn line-primary"><span class="txt">line-primary</span></v-btn>
        <v-btn class="btn line-black"><span class="txt">line-black</span></v-btn>
        <v-btn class="btn line-red"><span class="txt">line-red</span></v-btn>
        <v-btn class="btn line-primary" disabled><span class="txt">line-primary disabled</span></v-btn>

        <v-btn class="btn txt-primary"><span class="txt">txt-primary</span></v-btn>
        <v-btn class="btn txt-red"><span class="txt">txt-red</span></v-btn>
        <v-btn class="btn txt-black"><span class="txt">txt-black</span></v-btn>
        <v-btn class="btn txt-primary" disabled><span class="txt">txt-primary disabled</span></v-btn>
      </div>
    </li>

    <!-- 버튼 - 높이36 -->
    <li>
      <h2 class="pubGuidetit">버튼 - 높이36 (.size-md)</h2>
      <div class="pubGuideBox">
        <v-btn class="btn size-md bgc-primary"><span class="txt">bgc-primary</span></v-btn>
        <v-btn class="btn size-md bgc-red"><span class="txt">bgc-red</span></v-btn>
        <v-btn class="btn size-md bgc-primary" disabled><span class="txt">bgc-primary disabled</span></v-btn>

        <v-btn class="btn size-md line-primary"><span class="txt">line-primary</span></v-btn>
        <v-btn class="btn size-md line-black"><span class="txt">line-black</span></v-btn>
        <v-btn class="btn size-md line-red"><span class="txt">line-red</span></v-btn>
        <v-btn class="btn size-md line-primary" disabled><span class="txt">line-primary disabled</span></v-btn>

        <v-btn class="btn size-md txt-primary"><span class="txt">txt-primary</span></v-btn>
        <v-btn class="btn size-md txt-red"><span class="txt">txt-red</span></v-btn>
        <v-btn class="btn size-md txt-black"><span class="txt">txt-black</span></v-btn>
        <v-btn class="btn size-md txt-primary" disabled><span class="txt">txt-primary disabled</span></v-btn>
      </div>
    </li>

    <!-- 버튼 - 높이28 -->
    <li>
      <h2 class="pubGuidetit">버튼 - 높이28 (.size-s)</h2>
      <div class="pubGuideBox">
        <v-btn class="btn size-s bgc-primary"><span class="txt">bgc-primary</span></v-btn>
        <v-btn class="btn size-s bgc-red"><span class="txt">bgc-red</span></v-btn>
        <v-btn class="btn size-s bgc-primary" disabled><span class="txt">bgc-primary disabled</span></v-btn>
        <v-btn class="btn size-s line-primary"><span class="txt">line-primary</span></v-btn>
        <v-btn class="btn size-s line-black"><span class="txt">line-black</span></v-btn>
        <v-btn class="btn size-s line-red"><span class="txt">line-red</span></v-btn>
        <v-btn class="btn size-s line-primary" disabled><span class="txt">line-primary disabled</span></v-btn>
        <v-btn class="btn size-s txt-primary"><span class="txt">txt-primary</span></v-btn>
        <v-btn class="btn size-s txt-red"><span class="txt">txt-red</span></v-btn>
        <v-btn class="btn size-s txt-black"><span class="txt">txt-black</span></v-btn>
        <v-btn class="btn size-s txt-primary" disabled><span class="txt">txt-primary disabled</span></v-btn>
      </div>
    </li>

    <!-- 버튼 - 높이24 -->
    <li>
      <h2 class="pubGuidetit">버튼 - 높이24 (.size-xs)</h2>
      <div class="pubGuideBox">
        <v-btn class="btn size-xs bgc-primary"><span class="txt">bgc-primary</span></v-btn>
        <v-btn class="btn size-xs bgc-red"><span class="txt">bgc-red</span></v-btn>
        <v-btn class="btn size-xs bgc-primary" disabled><span class="txt">bgc-primary disabled</span></v-btn>
        <v-btn class="btn size-xs line-primary"><span class="txt">line-primary</span></v-btn>
        <v-btn class="btn size-xs line-black"><span class="txt">line-black</span></v-btn>
        <v-btn class="btn size-xs line-red"><span class="txt">line-red</span></v-btn>
        <v-btn class="btn size-xs line-primary" disabled><span class="txt">line-primary disabled</span></v-btn>
        <v-btn class="btn size-xs txt-primary"><span class="txt">txt-primary</span></v-btn>
        <v-btn class="btn size-xs txt-red"><span class="txt">txt-red</span></v-btn>
        <v-btn class="btn size-xs txt-black"><span class="txt">txt-black</span></v-btn>
        <v-btn class="btn size-xs txt-primary" disabled><span class="txt">txt-primary disabled</span></v-btn>
      </div>
    </li>

    <!-- 버튼 - 아이콘+텍스트 -->
    <li>
      <h2 class="pubGuidetit">버튼 - 아이콘+텍스트</h2>
      <div class="pubGuideBox">
        <v-btn class="btn bgc-primary"><i class="icon i-14 i-14-arrow-right-white"></i><span class="txt">bgc-primary</span></v-btn>
        <v-btn class="btn bgc-primary" disabled><i class="icon i-14 i-14-arrow-right-white"></i><span class="txt">bgc-primary</span></v-btn>

        <v-btn class="btn line-black"><span class="txt">line-black</span></v-btn>
        <v-btn class="btn line-primary"><span class="txt">line-blue</span></v-btn>
      </div>
    </li>

    <!-- 버튼 - 아이콘,알파벳 -->
    <li>
      <h2 class="pubGuidetit">버튼 - 아이콘, 알파벳</h2>
      <div class="pubGuideBox">
        <v-btn class="btn bgc-round-primary only-i"><i class="icon i-18 i-18-arrow-right-white"></i></v-btn>
        <v-btn class="btn bgc-round-primary only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn line-round-gray only-i"><i class="icon i-18 i-18-arrow-right-black"></i></v-btn>
        <v-btn class="btn line-round-gray only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn line-round-primary only-i"><i class="icon i-18 i-18-arrow-right-primary"></i></v-btn>
        <v-btn class="btn line-round-primary only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn line-round-primary only-i" disabled><i class="icon i-18 i-18-arrow-right-blue"></i></v-btn>
        <v-btn class="btn line-round-primary only-i" disabled><span class="txt">A</span></v-btn>

        <br/>

        <v-btn class="btn size-md bgc-round-primary only-i"><i class="icon i-18 i-18-arrow-right-white"></i></v-btn>
        <v-btn class="btn size-md bgc-round-primary only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn size-md line-round-gray only-i"><i class="icon i-18 i-18-arrow-right-black"></i></v-btn>
        <v-btn class="btn size-md line-round-gray only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn size-md line-round-primary only-i"><i class="icon i-18 i-18-arrow-right-primary"></i></v-btn>
        <v-btn class="btn size-md line-round-primary only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn size-md line-round-primary only-i" disabled><i class="icon i-18 i-18-arrow-right-blue"></i></v-btn>
        <v-btn class="btn size-md line-round-primary only-i" disabled><span class="txt">A</span></v-btn>

        <br>

        <v-btn class="btn size-xs bgc-round-primary only-i"><i class="icon i-18 i-18-arrow-right-white"></i></v-btn>
        <v-btn class="btn size-xs bgc-round-primary only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn size-xs line-round-gray only-i"><i class="icon i-18 i-18-arrow-right-black"></i></v-btn>
        <v-btn class="btn size-xs line-round-gray only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn size-xs line-round-primary only-i"><i class="icon i-18 i-18-arrow-right-primary"></i></v-btn>
        <v-btn class="btn size-xs line-round-primary only-i"><span class="txt">A</span></v-btn>
        <v-btn class="btn size-xs line-round-primary only-i" disabled><i class="icon i-18 i-18-arrow-right-blue"></i></v-btn>
        <v-btn class="btn size-xs line-round-primary only-i" disabled><span class="txt">A</span></v-btn>
      </div>
    </li>

    <!-- 라디오 -->
    <li>
      <h2 class="pubGuidetit">라디오</h2>

      <div class="pubGuideBox">
        <v-radio-group
          class="radio-border-wrap"
          name="radio-name1"
          model-value="week1"
        >
          <v-radio label="1주일" value="week1"></v-radio>
          <v-radio label="1개월" value="month1"></v-radio>
          <v-radio label="3개월" value="month3"></v-radio>
        </v-radio-group>
      </div>
    </li>

    <!-- 체크박스 -->
    <li>
      <h2 class="pubGuidetit">체크박스 : v-checkbox 태그 내에 v-model 변수넣고 script 태그에서 변수선언</h2>
      <div class="pubGuideBox">
        <v-checkbox
          class="check-box"
          name="name-1"
          label="Primary"
          value="val1"
          hide-details
        ></v-checkbox>

        <v-checkbox
          class="check-box"
          name="name-1"
          label="readonly"
          value="val3"
          hide-details
          readonly
        ></v-checkbox>

        <v-checkbox
          class="check-box"
          name="name-1"
          label="readonly checked"
          value="val4"
          hide-details
          readonly
          checked
          model-value="val4"
        ></v-checkbox>

        <v-checkbox
          class="check-box"
          name="name-1"
          label="disabled"
          value="val5"
          hide-details
          disabled
        ></v-checkbox>

        <v-checkbox
          class="check-box"
          name="name-1"
          label="disabled checked"
          value="val6"
          hide-details
          disabled
          model-value="val6"
        ></v-checkbox>

        <br><br><br>

        <v-checkbox
          class="check-box"
          name="name-1"
          value="val7"
          hide-details
        ></v-checkbox>

      </div>
    </li>

    <!-- 셀렉트 -->
    <li>
      <h2 class="pubGuidetit">셀렉트</h2>

      <div class="pubGuideBox">

        <div class="flex-area">
          <v-select
            class="select-box"
            variant="outlined"
            label="default"
            :items="['11','22','33','44']"
            :rules="[value => !!value]"
          ></v-select>
          <v-select
            class="select-box type-green"
            variant="outlined"
            :items="['11','22','33','44']"
            :rules="[value => !!value]"
          >
            <template v-slot:label>type-green <span class="essential">*</span></template>
          </v-select>
          <v-select
            class="select-box"
            variant="outlined"
            label="readonly"
            readonly
            model-value="11"
          ></v-select>
          <v-select
            class="select-box"
            variant="outlined"
            label="disabled"
            disabled
            model-value="11"
          ></v-select>
        </div>

      </div>
    </li>

    <!-- 인풋 -->
    <li>
      <h2 class="pubGuidetit">인풋</h2>

      <div class="pubGuideBox">
        <div class="flex-area">
          <v-text-field
          class="input-box"
          variant="outlined"
          placeholder=""
          label="label"
          persistent-clear
          clearable
          :rules="[value => !!value]"
        ></v-text-field>

        <v-text-field
          class="input-box"
          variant="outlined"
          placeholder=""
          label="label"
          persistent-clear
          :rules="[value => !!value]"
          model-value="test"
        >
          <template v-slot:label>필수요소 <span class="essential">*</span></template>
        </v-text-field>

        <v-text-field
          class="input-box"
          variant="outlined"
          placeholder=""
          label="label"
          persistent-clear
          readonly
          model-value="readonly"
        ></v-text-field>

        <v-text-field
          class="input-box"
          variant="outlined"
          placeholder=""
          label="label"
          persistent-clear
          disabled
          model-value="Disabled"
        ></v-text-field>
        </div>

      </div>
    </li>
    
    <!-- 인풋 : date -->
    <li>
      <h2 class="pubGuidetit">인풋 데이트</h2>

      <div class="pubGuideBox">
        <div class="flex-area">

          <!-- input:date는 .date-box로 감싸서 사용 -->
          <div class="date-box">
            <v-date-input
              label="Label"
              placeholder="YYYY-MM-DD"
              locale="ko"
              variant="outlined"
              prepend-icon=""
              append-inner-icon="mdi-calendar"
              hide-actions
            ></v-date-input>
          </div>

          <div class="date-box">
            <v-date-input
              label="Label"
              placeholder="YYYY-MM-DD"
              locale="ko"
              variant="outlined"
              prepend-icon=""
              append-inner-icon="mdi-calendar"
              hide-actions
            ></v-date-input>
          </div>

          <!--
          readonly 기능 오류남
          <div class="date-box">
            <v-date-input
              model-value="2024-01-24"
              label="Readonly"
              placeholder="YYYY-MM-DD"
              locale="ko"
              variant="outlined"
              prepend-icon=""
              append-inner-icon="mdi-calendar"
              hide-actions
              readonly
            ></v-date-input>
          </div>
          -->

          <div class="date-box">
            <v-date-input
              model-value="2024-01-24"
              label="Disabled"
              placeholder="YYYY-MM-DD"
              locale="ko"
              variant="outlined"
              prepend-icon=""
              append-inner-icon="mdi-calendar"
              hide-actions
              disabled
            ></v-date-input>
          </div>

        </div>

      </div>
    </li>

  </ul>
</template>

<route lang="yaml">
  meta:
    layout: Blank
    bgColor: yellow
</route>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";


const themeClass = ref('')

const checkVal1 = ref(['val4', 'val6']);

function changeTheme () {
  (themeClass.value == '') ? themeClass.value = 'theme-b' : themeClass.value = ''
}

// 셀렉트
// 인풋
const inputRules = ref([
  value => !!value , // 에러규칙
]);

const inputDate1 = ref('');

</script>
