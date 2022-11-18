<template>
  <div>
    <the-header-navbar-main style="position: absolute; width: 100%; z-index: 1"></the-header-navbar-main>
    <div style="z-index: 2">
      <b-img :src="require('@/assets/main.jpg')" align="left" fluid-grow alt="Fluid-grow image"></b-img>
      <b-container class="maincontents">
        <div class="title">부동산의 모든 것</div>
        <div class="title">'구해줘 홈즈'에서 쉽고 간편하게</div>
        <a class="btnScroll" href="#content">
          <b-icon icon="caret-down-fill" class="mt-5" font-scale="3" color="#f5f5f5"></b-icon>
        </a>
      </b-container>

      <!-- 
      <b-container class="contents"> </b-container>

      <b-container class="bv-example-row text-center">
        <h3 class="underline-steelblue">
          <b-icon icon="house"></b-icon> SSAFY
        </h3>

        <b-row>
          <b-col></b-col>
          <b-col cols="10">
            <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
              <template #header>SSAFY Home</template>

              <template #lead>
                슬기로운 싸피 생활 (:8기편👍)<br />
                1학기동안 모두 고생 & 수고많으셨어요😍~~<br />
                2학기 가서도 행복한 하루 ⭐️ 하루 되길 바랄께요.<br />
                7전 8~~~~~~~~~~~~~~~~~~~~~~~끼를 보여주세요.🌈<br />
                그리고 각자 생각하는 곳에 취업!!! 꼭!꼭!꼭! 하세용.🐹
              </template>

              <hr class="my-4" />

              <p>Vue + Bootstrap활용.</p>
              <p>Bootstrap-vue는 버전 <b>4.6.1</b>을 권장합니다.</p>
              <p><b>BoardList.vue</b>를 바꿔가면서 테스트하세요.</p>
              <p>Bootstrap의 <b>table</b> 사용법을 익히게됩니다.</p>
            </b-jumbotron>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container> -->
    </div>
    <div>&nbsp;</div>
    <div id="content" class="content" style="background-color: #fafafa; padding: 200px;">
      <div>이렇게 많은 집 중에 우리가 살 집 어떻게 구하지?</div>
      <div>지역 별 아파트 정보를 한 눈에 조회하고 비교하세요.</div>
      <div>신혼부부를 위한 편리한 부동산 서비스, 구해줘 홈즈입니다.</div>
    </div>
    <news-view></news-view>
  </div>
</template>

<script>
import TheHeaderNavbarMain from "@/components/TheHeaderNavbarMain";
import NewsView from "@/components/news/NewsView.vue"
export default {
  name: "AppMain",
  components: {
    TheHeaderNavbarMain,
    NewsView,
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}

.maincontents {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 30%;
  left: 50%;
  color: black;
  font-family: "NanumSquareExtraBold";
  text-decoration: none;
}

.contents {
  color: black;
  font-family: "NanumSquareExtraBold";
}

.title {
  font-size: xxx-large;
}

.content {
  color: black;
  font-size: xx-large;
  font-family: "NanumSquareExtraBold";
}
</style>
