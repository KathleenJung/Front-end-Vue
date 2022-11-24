<template>
  <div>
    <div>하이</div>
    <!-- <div id="title">매매 정보</div>
    <div>
      <div id="text" style="margin-bottom: 10px" v-if="areas.length == 0">
        매매 정보가 없습니다 (┬┬﹏┬┬)
      </div>
      <b-tabs content-class="mt-3" pills fill>
        <b-tab
          v-for="(area, index) in areas"
          :key="index"
          :title="String(area)"
          @click="disableMore"
        >
          <div v-if="!more">
            <b-table
              id="infoTable"
              hover
              :items="dealListByArea[index].slice(0, 5)"
              :fields="fields"
            >
            </b-table>
          </div>
          <div v-if="more">
            <b-table id="infoTable" hover :items="dealListByArea[index]" :fields="fields"></b-table>
          </div>
          <div id="text" @click="moreInfo" v-if="!more && dealListByArea[index].length > 5">
            더보기
          </div>
          <div id="text" @click="moreInfo" v-if="more">접기</div>
        </b-tab>
      </b-tabs>
    </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style>
#infoTable {
  font-family: "NanumSquare";
}

#text {
  font-family: "NanumSquare";
}
</style>
