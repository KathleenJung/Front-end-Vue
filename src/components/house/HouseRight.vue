<template>
  <div style="width: 500px; max-width: 80%; padding: 20px">
    <!-- <b-img :src="require('@/assets/happyhouse.png')" style="width: 400px"></b-img> -->
    <div id="roadview" style="height: 300px"></div>
    <div id="aptName">{{ aptInfomation.apartmentName }}</div>
    <div id="buildYear" style="text-align: left">건축년도 : {{ aptInfomation.buildYear }}</div>
    <div id="address">{{ aptInfomation.roadNameAddress }}</div>
    <div id="address">{{ aptInfomation.jibunNameAddress }}</div>
    <div id="title">매매 정보</div>
    <div id="title">통계 정보</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roadview: "",
      roadviewClient: "",
    };
  },
  mounted() {
    const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    /* global kakao */
    this.roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    const position = new kakao.maps.LatLng(this.aptInfomation.lat, this.aptInfomation.lng);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    const vueInstance = this;
    this.roadviewClient.getNearestPanoId(position, 50, function (panoId) {
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
}
#aptName {
  font-family: "NanumSquareExtraBold";
  font-size: xx-large;
  text-align: left;
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
[v-cloak]::before {
  content: "로딩중...";
}
</style>
