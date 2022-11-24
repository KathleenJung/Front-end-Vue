<template>
  <div>
    <the-header-navbar-main style="position: absolute; width: 100%; z-index: 1">
    </the-header-navbar-main>
    <div style="z-index: 2">
      <b-img :src="require('@/assets/main.jpg')" align="left" fluid-grow alt="Fluid-grow image"></b-img>
      <b-container class="maincontents">
        <div class="title">아파트 구하고 싶은 사람</div>
        <div class="title">여기로 ‘모여방’!</div>
        <a class="btnScroll" href="#content">
          <b-icon icon="caret-down-fill" class="mt-5" font-scale="3" color="#b8b9e3"></b-icon>
        </a>
      </b-container>
    </div>
    <div>&nbsp;</div>
    <div id="content" class="content" style="background-color: #fafafa; padding: 200px;">
      <div data-aos="fade-down">
        <div class="content">이렇게 많은 집 중에 우리가 살 집 어떻게 구하지?</div>
        <div class="content">아파트가 있는 곳의 <span style="color: crimson;">인프라 지수</span>와 <span style="color: green;">안전
            지수</span>를 확인하고,
        </div>
        <div class="content">살고 싶은 아파트를 찾아보세요.</div>
      </div>
    </div>
    <news-view></news-view>
  </div>
</template>

<script>
import TheHeaderNavbarMain from "@/components/TheHeaderNavbarMain";
import NewsView from "@/components/news/NewsView.vue"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
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
