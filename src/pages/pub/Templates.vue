<template>
  <ul class="pubGuideList">
    <!-- 스텝퍼 -->
    <li>
      <h2 class="pubGuidetit">템플릿</h2>
      <div class="pubGuideBox">
        
        <ul class="stepper-wrap">
          <!-- 스텝 [현재스텝- .active, 완료스텝- .complete] -->
          <li class="complete">
            <div class="num">
              <span>1</span>
            </div>
            <p>계약 기본정보 <br/> 등록</p>
          </li>
          <li class="active">
            <div class="num">
              <span>2</span>
            </div>
            <p>컨텐츠 기본정보 <br/> 등록</p>
          </li>
          <li class="">
            <div class="num">
              <span>3</span>
            </div>
            <p>정산 정보 <br/> 등록</p>
          </li>
        </ul>

      </div>
    </li>
    
    <li>
      <h2 class="pubGuidetit">test</h2>
      <div class="pubGuideBox">
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
import { ref } from 'vue'

const selectVal = ref(null);
const selectVal2 = ref(null);
const selectRules = ref([
  value => !!value , // 선택되지 않으면 에러 메시지
]);

</script>
