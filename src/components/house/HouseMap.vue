<template>
  <div>
    <!-- <div style="padding-top:200px;"></div> -->
    <b-button class="m-5" style="position: absolute; left: 0; z-index: 3" @click="openLeft">
      ▶</b-button
    >
    <house-left
      :style="
        !leftClick
          ? 'display:none;'
          : 'position:absolute; left:0; margin:25px; background-color:white; height:650px; z-index:2'
      "
    ></house-left>
    <house-right
      :style="
        !rightClick
          ? 'display:none;'
          : 'position:absolute; right:0; margin:25px; background-color:white; height:650px; z-index:2'
      "
    >
    </house-right>
    <b-button class="m-5" style="position: absolute; right: 0; z-index: 3" @click="openRight">
      ▶</b-button
    >
    <!-- <house-left style="display: none; z-index: 2"></house-left> -->
    <div id="map" style="position: absolute; z-index: 1"></div>
  </div>
</template>

<script>
import HouseLeft from "@/components/house/HouseLeft.vue";
import HouseRight from "@/components/house/HouseRight.vue";
export default {
  name: "KakaoMap",
  components: {
    HouseLeft,
    HouseRight,
  },
  data() {
    return {
      map: null,
      leftClick: false,
      rightClick: false,
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);

      // 지도에 확대 축소 컨트롤을 생성한다
      var zoomControl = new kakao.maps.ZoomControl();

      // 지도의 우측에 확대 축소 컨트롤을 추가한다
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },
    openLeft() {
      this.leftClick = !this.leftClick;
    },
    openRight() {
      this.rightClick = !this.rightClick;
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
