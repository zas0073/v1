<template>
  <div class="page-wrap">
    <!-- page-header : 1뎁스 제목영역 -->
    <div class="page-header">
      <h2>레이아웃 (계약등록) : SubSection</h2>
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
          
          <!-- section-wrap -->
          <section class="section-wrap">
            <div class="section-area">
              <div class="section-top">
                <h3>섹션 제목1</h3>
                <div class="btn-area">
                  <v-btn class="btn line-black"><span class="txt">계약상대방 추가</span></v-btn>
                  <v-btn class="btn line-black"><span class="txt">계약상대방 추가</span></v-btn>
                </div>
              </div>

              <!-- section-mid -->
              <div class="section-mid">

                <!-- 임시사용 (삭제예정) -->
                <div style="width:100%; height:500px; background:#ccc">섹션 내용</div>
                <!--// 임시사용 (삭제예정) -->
                
              </div>
            </div>

            <!-- 섹션 하단 버튼영역(있을경우 사용) -->
            <div class="section-btn-area">
              <div class="right-area">
                <v-btn class="btn bg-green"><span class="txt">저장</span></v-btn>
              </div>
            </div>
          </section>

          <!-- section-wrap -->
          <section class="section-wrap">
            <div class="section-area">
              <div class="section-top">
                <h3>섹션 제목2</h3>
                <div class="btn-area">
                  <v-btn class="btn line-black"><span class="txt">계약상대방 추가</span></v-btn>
                  <v-btn class="btn line-black"><span class="txt">계약상대방 추가</span></v-btn>
                </div>
              </div>

              <!-- section-mid -->
              <div class="section-mid">
                
                <!-- 임시사용 (삭제예정) -->
                <div style="width:100%; height:500px; background:#ccc">섹션 내용</div>
                <!--// 임시사용 (삭제예정) -->

              </div>
            </div>

            <!-- 섹션 하단 버튼영역(있을경우 사용) -->
            <div class="section-btn-area">
              <div class="left-area">
                <v-btn class="btn line-black"><span class="txt">임시저장</span></v-btn>
              </div>
              <div class="right-area">
                <v-btn class="btn bg-green"><span class="txt">저장</span></v-btn>
              </div>
            </div>
          </section>

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
