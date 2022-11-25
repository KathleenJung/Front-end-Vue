<template>
  <div style="max-width: 50%">
    <div id="roadview" style="height: 300px"></div>
    <div id="aptName">{{ aptInfomation.apartmentName }}</div>
    <div id="buildYear" style="text-align: left">건축년도 : {{ aptInfomation.buildYear }}</div>
    <div id="address">{{ aptInfomation.roadNameAddress }}</div>
    <div id="address">{{ aptInfomation.jibunNameAddress }}</div>
    <div id="text" @click="viewInfo">자세히보기</div>
    <!-- <div id="infra">
      <b-alert show variant="success">Success Alert</b-alert>
    </div> -->
  </div>
</template>

<script>
import http from "@/api/http";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      roadview: "",
      roadviewClient: "",
    };
  },
  methods: {
    viewInfo() {
      let routeUrl = this.$router.resolve({
        path: "/house/info",
      });
      window.open(routeUrl.href, "_blank");
    },
    moreInfo() {
      this.more = !this.more;
    },
    disableMore() {
      this.more = false;
    },
    async getGrade(thisHouse, sidoCode) {
      let result = null;
      await http
        .get(`/infra/statistics?latitude=${thisHouse.lat}&longitude=${thisHouse.lng}&sidoCode=${sidoCode}`)
        .then(({ data }) => {
          result = data;
        });
      return result;
    }
  },
  computed: {
    ...mapState(["house"]),
  },
  mounted() {
    const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    /* global kakao */
    this.roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    const position = new kakao.maps.LatLng(this.aptInfomation.lat, this.aptInfomation.lng);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    const vueInstance = this;
    this.roadviewClient.getNearestPanoId(position, 100, function (panoId) {
      vueInstance.roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
  },
  updated() {
    const position = new kakao.maps.LatLng(this.aptInfomation.lat, this.aptInfomation.lng);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    const vueInstance = this;
    this.roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      vueInstance.roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
  },
  props: {
    aptInfomation: Object,
  },
};
</script>

<style>
#title {
  font-family: "NanumSquareBold";
  font-size: larger;
  margin-top: 20px;
  margin-bottom: 10px;
}

#aptName {
  font-family: "NanumSquareExtraBold";
  font-size: xx-large;
  text-align: left;
  margin-top: 10px;
}

#buildYear {
  font-family: "NanumSquareBold";
  font-size: larger;
}

#address {
  font-family: "NanumSquare";
  font-size: large;
  text-align: left;
}

#text {
  font-family: "NanumSquare";
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
