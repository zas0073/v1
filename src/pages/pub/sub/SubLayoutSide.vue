<template>
  <div class="page-wrap">
    <!-- page-header : 1뎁스 제목영역 -->
    <div class="page-header">
      <h2>레이아웃 (계약등록)</h2>
    </div>

    <!-- page-container : 페이지 컨텐츠 영역 -->
    <div class="page-container">

      <!--aside-wrap : 사이드 (있을경우 사용) -->
      <div class="aside-wrap">

        <!-- 임시사용 (삭제예정) -->
        <div style="width:100%; height:500px; background:#fff">aside-wrap</div>
        <!--// 임시사용 (삭제예정) -->

      </div>

      <!-- contents-wrap : 컨텐츠 영역 -->
      <div class="contents-wrap">
        <!-- contents-body : 컨텐츠 내용 영역 -->
        <div class="contents-body"> 

          <!-- 임시사용 (삭제예정) -->
          <div style="width:100%; height:500px; background:#fff">contents-body</div>
          <!--// 임시사용 (삭제예정) -->

        </div>

        <!-- contents-footer : 컨텐츠 하단 영역 (있을경우 사용) -->
        <div class="contents-footer">
          <div class="contents-btn-area">
            <div class="left-area">
              <v-btn class="btn line-black"><span class="txt">이전</span></v-btn>
            </div>
            <div class="right-area">
              <v-btn class="btn bg-green"><span class="txt">저장</span></v-btn>
              <v-btn class="btn bg-green" disabled><span class="txt">다음</span></v-btn>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

</script>
