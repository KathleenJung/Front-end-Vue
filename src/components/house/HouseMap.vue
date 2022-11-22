<template>
  <div>
    <!-- <div style="padding-top:200px;"></div> -->
    <b-button class="m-5" style="position: absolute; left: 0; z-index: 3" @click="openLeft">
      ◀</b-button>
    <house-left @focusDong="focusingDong" :style="
      !leftClick
        ? 'display:none;'
        : 'position:absolute; left:0; margin:25px; background-color:white; height:650px; z-index:2'
    "></house-left>
    <house-right v-if="loadViewRendering" :aptInfomation="aptInfomation" :style="
      !rightClick
        ? 'display:none;'
        : 'position:absolute; right:0; margin:25px; background-color:white; height:650px; z-index:2; overflow-y:auto;'
    ">
    </house-right>
    <b-button v-if="aptInfomation != null" class="m-5" style="position: absolute; right: 0; z-index: 3"
      @click="openRight">
      ▶</b-button>
    <!-- <house-left style="display: none; z-index: 2"></house-left> -->
    <div id="map" style="position: absolute; z-index: 1"></div>
  </div>
</template>

<script>
import http from "@/api/http";
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
      leftClick: true,
      rightClick: false,
      loadViewRendering: false,
      focusDong: { name: "", code: null },
      markers: [],
      apt: [],
      aptInfomation: null,
      // focusDongName: "",
      // focusDongCode: null,
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services`;
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
        center: new kakao.maps.LatLng(37.5666805, 126.9784147),
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

    // 사이드 컴포넌트 열기/닫기
    openLeft() {
      this.leftClick = !this.leftClick;
    },
    // 버튼 클릭 시 오른쪽 컴포넌트 열기
    openRight() {
      this.loadViewRendering = true;
      this.rightClick = !this.rightClick;
    },
    // 마커 클릭 시 오른쪽 컴포넌트 열기
    openRightCom() {
      if (this.loadViewRendering == false) {
        this.loadViewRendering = true;
      }
      this.rightClick = true;
    },

    // 검색한 곳에서 데이터 받아오기
    focusingDong(dong) {
      this.rightClick = false;
      this.focusDong.name = dong.dongAdd;
      this.focusDong.code = dong.dongCode;
      this.focusDongCreate();
    },

    focusDongCreate() {
      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      const vueInstance = this;

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(this.focusDong.name, placesSearchCB);

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          var bounds = new kakao.maps.LatLngBounds();

          for (var i = 0; i < data.length; i++) {
            // displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          vueInstance.map.setBounds(bounds);
        }
      }
      this.aptInfo();
    },

    async aptInfo() {
      await http.get(`/houses/tempList?dongCode=${this.focusDong.code}`).then(({ data }) => {
        this.apt = data;
        console.log(data);
      });

      // TODO : 마커 넣기
      // https://apis.map.kakao.com/web/sample/removableCustomOverlay/

      this.deleteMarkers();
      this.markers = [];
      for (let i = 0; i < this.apt.length; i++) {
        // 마커가 표시될 위치입니다
        let markerPosition = new kakao.maps.LatLng(this.apt[i].lat, this.apt[i].lng);

        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          // map: this.map,
          position: markerPosition,
        });
        this.markers.push(marker);

        const vueInstance = this;
        kakao.maps.event.addListener(marker, "click", function () {
          vueInstance.openRightCom();
          vueInstance.aptInfomation = vueInstance.apt[i];
          console.log(vueInstance.aptInfomation);
          vueInstance.map.setCenter(markerPosition);
        });
      }
      // this.setMarkers();
      this.showMarkers();
    },
    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    setMarkers() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(this.map);
      }
    },

    // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
    showMarkers() {
      this.setMarkers(this.map);
    },

    // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
    deleteMarkers() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      // this.setMap(null);
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
