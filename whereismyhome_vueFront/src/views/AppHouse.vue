<template>
    <div>
    <the-header-navbar style="position: absolute; width:100%; z-index: 2;"></the-header-navbar>
  <b-container class="bv-example-row text-center" style="padding-top: 100px;">
    <h3 class="underline-orange"><b-icon icon="house-fill"></b-icon> House Service</h3>
    <b-row>
      <b-col>
        <b-img alt="Happy House" :src="require('@/assets/happyhouse.png')" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" align="left">
        <house-list />
      </b-col>
      <b-col cols="6">
        <house-detail />
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>
<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseList from "@/components/house/HouseList.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";

export default {
  name: "AppHouse",
  components: {
    HouseSearchBar,
    HouseList,
    HouseDetail,
    TheHeaderNavbar,
  },
};
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 149, 27, 0.3) 30%);
}
</style>
