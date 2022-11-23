<template>
  <div style="width: 500px; max-width: 80%; padding: 20px">
    <!-- <b-img :src="require('@/assets/happyhouse.png')" style="width: 400px"></b-img> -->
    <div id="roadview" style="height: 300px"></div>
    <div id="aptName">{{ aptInfomation.apartmentName }}</div>
    <div id="buildYear" style="text-align: left">건축년도 : {{ aptInfomation.buildYear }}</div>
    <div id="address">{{ aptInfomation.roadNameAddress }}</div>
    <div id="address">{{ aptInfomation.jibunNameAddress }}</div>
    <div @click="viewDetail">자세히보기</div>
    <house-info style="position: absolute; width:100%;" v-if="viewInfo"></house-info>
    <div id="title">매매 정보</div>
    <div>
      <div id="text" style="margin-bottom:10px;" v-if="areas.length == 0">매매 정보가 없습니다 (┬┬﹏┬┬)</div>
      <b-tabs content-class="mt-3" pills fill>
        <b-tab v-for="(area, index) in areas" :key="index" :title="String(area)" @click="disableMore">
          <!-- <div id="charts" style="margin-top: 10px; margin-bottom: 10px">
            <LineChartGenerator :chart-options="chartOptions" :chart-data="dates" :chart-id="chartId"
              :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
              :width="width" :height="height" />
          </div> -->
          <div v-if="!more">
            <b-table id="infoTable" hover :items="dealListByArea[index].slice(0, 5)" :fields="fields">
            </b-table>
          </div>
          <div v-if="more">
            <b-table id="infoTable" hover :items="dealListByArea[index]" :fields="fields"></b-table>
          </div>
          <div id="text" @click="moreInfo" v-if="!more && dealListByArea[index].length > 5">더보기</div>
          <div id="text" @click="moreInfo" v-if="more">접기</div>
        </b-tab>
      </b-tabs>
    </div>




  </div>
</template>

<script>
import HouseInfo from './HouseInfo.vue';
// charts.js
// import { Line as LineChartGenerator } from "vue-chartjs/legacy";

// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   LinearScale,
//   CategoryScale,
//   PointElement,
// } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

export default {
  components: { HouseInfo },
  data() {
    return {
      roadview: "",
      roadviewClient: "",
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
      viewInfo: false,

      // charts
      // chartData: {
      //   labels: ["January", "February", "March", "April", "May", "June", "July"],
      //   datasets: [
      //     {
      //       label: "가격",
      //       backgroundColor: "#f87979",
      //       data: [40, 39, 10, 40, 39, 80, 40],
      //     },
      //   ],
      // },
      // chartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      // },
    };
  },
  methods: {
    moreInfo() {
      this.more = !this.more;
    },
    disableMore() {
      this.more = false;
    },
    viewDetail() {
      this.viewInfo = true;
    },
  },
  computed: {
    houseDealList() {
      return this.aptInfomation.houseDealList.slice(0, 5);
    },
    houseDealList2() {
      return this.aptInfomation.houseDealList;
    },
    areas() {
      let areaArray = [];
      this.houseDealList2.forEach((deal) => {
        areaArray.push(deal["area"]);
      });

      // 배열에서 중복 값 제거
      areaArray = Array.from(new Set(areaArray));
      // 배열 오름차순으로 정렬
      areaArray.sort();
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
    // dates(index) {
    //   let arr = [];
    //   this.dealListByArea[index].forEach((deal) => {
    //     arr.push(deal["date"].slice(0, 4));
    //   })
    //   // 배열에서 중복 값 제거
    //   arr = Array.from(new Set(arr));
    //   // 배열 오름차순으로 정렬
    //   arr.sort();
    //   return arr;
    // },
    // dateChart() {
    //   let dl = [];
    //   for (let i = 0; i < this.dates.length; i++) {
    //     let temp = [];
    //     for (let j = 0; j < this.dealListByArea.length; j++) {
    //       if (this.dates[i] === this.dealListByArea[j].date) {
    //         temp.push(this.dealListByArea[j]);
    //       }
    //     }
    //     dl.push(temp);
    //   }
    //   console.log(dl[0]);
    //   return dl;
    // },
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

  // charts.js
  // components: {
  //   LineChartGenerator,
  // },
  // props: {
  //   aptInfomation: Object,
  //   chartId: {
  //     type: String,
  //     default: "line-chart",
  //   },
  //   datasetIdKey: {
  //     type: String,
  //     default: "label",
  //   },
  //   width: {
  //     type: Number,
  //     default: 400,
  //   },
  //   height: {
  //     type: Number,
  //     default: 400,
  //   },
  //   cssClasses: {
  //     default: "",
  //     type: String,
  //   },
  //   styles: {
  //     type: Object,
  //     default: () => { },
  //   },
  //   plugins: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },
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

#infoTable {
  font-family: "NanumSquare";
}

#text {
  font-family: "NanumSquare";
}
</style>
