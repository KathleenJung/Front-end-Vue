<template>
  <div style="max-width: 80%">
    <b-img :src="require('@/assets/happyhouse.png')" style="width: 400px"></b-img>
    <div id="aptName">아파트 이름</div>
    <div id="text">지번 주소</div>
    <div id="text">도로명 주소</div>
    <div id="text">건축년도</div>
    <div id="text">매매 정보</div>
    <div id="text">통계 정보</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#text {
  font-family: "NanumSquare";
}
#aptName {
  font-family: "NanumSquareExtraBold";
  font-size: xx-large;
  text-align: left;
  margin: 10px;
}
</style>
