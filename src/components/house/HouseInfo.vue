<template>
  <div>
    <b-container>
      <div class="m-5">
        <div id="aptName">{{ this.house.apartmentName }}</div>
        <div id="buildYear" style="text-align: left">건축년도 : {{ this.house.buildYear }}</div>
        <div id="address">{{ this.house.roadNameAddress }}</div>
        <div id="address">{{ this.house.jibunNameAddress }}</div>
      </div>
      <div id="title">매매 정보</div>
      <div class="m-5">
        <div id="text" style="margin-bottom: 10px" v-if="areas.length == 0">
          매매 정보가 없습니다 (┬┬﹏┬┬)
        </div>
        <b-tabs content-class="mt-3" pills fill>
          <b-tab v-for="(area, index) in areas" :key="index" :title="String(area)" @click="disableMore">
            <div v-if="!more">
              <b-table id="infoTable" hover :items="dealListByArea[index].slice(0, 5)" :fields="fields">
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
      </div>

      <div id="title">통계 정보</div>
      <div>
        <house-security class="mb-5"></house-security>
      </div>
    </b-container>
  </div>
</template>

<script>
// charts.js
import { mapState } from "vuex";
import HouseSecurity from "./HouseSecurity.vue";

export default {
  data() {
    return {
      more: false,
      fields: [
        {
          key: "dealAmount",
          label: "매매가(만원)",
          sortable: true,
        },
        {
          key: "date",
          label: "매매일",
          sortable: true,
        },
        {
          key: "floor",
          label: "층",
          sortable: true,
        },
      ],
    };
  },
  components: {
    HouseSecurity,
  },
  methods: {
    moreInfo() {
      this.more = !this.more;
    },
    disableMore() {
      this.more = false;
    },
  },
  computed: {
    ...mapState(["house"]),
    info() {
      return this.house;
    },
    houseDealList() {
      return this.house.houseDealList.slice(0, 5);
    },
    houseDealList2() {
      return this.house.houseDealList;
    },
    areas() {
      let areaArray = [];
      this.houseDealList2.forEach((deal) => {
        areaArray.push(parseFloat(deal["area"]));
      });

      // 배열에서 중복 값 제거
      areaArray = Array.from(new Set(areaArray));
      // 배열 오름차순으로 정렬
      areaArray.sort(function (a, b) {
        if (a > b) return 1;
        if (a === b) return 0;
        if (a < b) return -1;
      });
      return areaArray;
    },
    dealListByArea() {
      let dl = [];
      for (let i = 0; i < this.areas.length; i++) {
        let temp = [];
        for (let j = 0; j < this.houseDealList2.length; j++) {
          if (this.areas[i] === this.houseDealList2[j].area) {
            temp.push(this.houseDealList2[j]);
          }
        }
        dl.push(temp);
      }
      return dl;
    },
  },
};
</script>

<style>
#title {
  font-family: "NanumSquareExtraBold";
  font-size: xx-large;
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

#infoTable {
  font-family: "NanumSquare";
}

#text {
  font-family: "NanumSquare";
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
