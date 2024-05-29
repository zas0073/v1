<template>
  <div class="page-wrap">
    <!-- page-header : 1뎁스 제목영역 -->
    <div class="page-header">
      <h2>레이아웃 (기본화면) : SubSearch</h2>
    </div>

    <!-- page-container : 페이지 컨텐츠 영역 -->
    <div class="page-container">

      <!--aside-wrap : 사이드 -->
      <!--//aside-wrap : 사이드 -->

      <!-- contents-wrap : 컨텐츠 영역 -->
      <div class="contents-wrap">
        <!-- contents-body : 컨텐츠 내용 영역 -->
        <div class="contents-body"> 
          
          <!-- search-wrap : 조회영역 -->
          <section class="search-wrap">
            <div class="search-form-area">
              <v-form class="form-list">
                <div class="form-box">폼요소</div>
                <div class="form-box">폼요소</div>
                <div class="form-box">폼요소</div>
                <div class="form-box">폼요소</div>
                <div class="form-box">폼요소</div>
              </v-form> 
              
              <div class="section-btn-area">
                <div class="right-area">
                  <v-btn class="btn bg-green"><span class="txt">초기화</span></v-btn>
                  <v-btn class="btn bg-green"><span class="txt">조회</span></v-btn>
                </div>
              </div>
            </div>

            <div class="search-result-area">
              <div class="" style="width:100%; height:400px; background:#ddd;">
                검색 결과 영역
              </div>
            </div>
          </section>

          <!-- section-area -->
          <!--// section-area -->

        </div>

        <!-- contents-footer : 컨텐츠 하단 영역 (있을경우 사용) -->
        <!--// contents-footer : 컨텐츠 하단 영역 (있을경우 사용) -->

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

</script>
