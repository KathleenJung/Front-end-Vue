<template>
  <div style="max-width: 80%; padding: 20px">
    <!-- <b-img :src="require('@/assets/happyhouse.png')" style="width: 400px"></b-img> -->
    <div id="roadview" style="height: 300px"></div>
    <div id="aptName">햇빛아파트</div>
    <div id="buildYear" style="text-align: left">건축년도 : 2023</div>
    <div id="address">서울특별시 광진구 구의동 120-12</div>
    <div id="address">서울특별시 광진구 구로산단로2번길 23</div>
    <div id="title">매매 정보</div>
    <div id="title">통계 정보</div>
  </div>
</template>

<script>
export default {
  mounted() {
    const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    /* global kakao */
    const roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    const roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    const position = new kakao.maps.LatLng(33.450701, 126.570667);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    });
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
</style>
