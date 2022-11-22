<template>
  <div style="width: 500px; max-width: 80%; padding: 20px">
    <!-- <b-img :src="require('@/assets/happyhouse.png')" style="width: 400px"></b-img> -->
    <div id="roadview" style="height: 300px"></div>
    <div id="aptName">{{ aptInfomation.apartmentName }}</div>
    <div id="buildYear" style="text-align: left">건축년도 : {{ aptInfomation.buildYear }}</div>
    <div id="address">{{ aptInfomation.roadNameAddress }}</div>
    <div id="address">{{ aptInfomation.jibunNameAddress }}</div>
    <div id="title">매매 정보</div>
    <div id="charts" style="margin-top: 10px; margin-bottom: 10px;">
      <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
        :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
        :height="height" />
    </div>
    <div>
      <b-table id="infoTable" hover :items="houseDealList" :fields="fields" v-if="!this.more"></b-table>
    </div>
    <div>
      <b-table id="infoTable" hover :items="houseDealList2" :fields="fields" v-if="this.more"></b-table>
    </div>
    <div id="text" @click="moreInfo" v-if="!this.more && houseDealList2.length > 5">더보기</div>
    <div id="text" @click="moreInfo" v-if="this.more">접기</div>
    <div id="title">통계 정보</div>
  </div>
</template>

<script>
// charts.js
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)


export default {
  data() {
    return {
      roadview: "",
      roadviewClient: "",
      more: false,
      fields: [
        {
          key: 'dealAmount',
          label: '매매가(만)',
          sortable: true,
        },
        {
          key: 'date',
          label: '매매일',
          sortable: true,
        }, {
          key: 'area',
          label: '면적(m²)',
          sortable: true,
        }, {
          key: 'floor',
          label: '층',
          sortable: true,
        },
      ],

      // charts
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: '면적',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: '층별',
            backgroundColor: '#f1849',
            data: [80, 32, 10, 45, 27, 23, 50]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }

    };
  },
  methods: {
    moreInfo() {
      this.more = !this.more;
    },
  },
  computed: {
    houseDealList() {
      return this.aptInfomation.houseDealList.slice(0, 5);
    },
    houseDealList2() {
      return this.aptInfomation.houseDealList;
    },
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
  // props: {
  // aptInfomation: Object,
  // },

  // charts.js
  components: {
    LineChartGenerator
  },
  props: {
    aptInfomation: Object,
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
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

#infoTable {
  font-family: "NanumSquare";
}

#text {
  font-family: "NanumSquare";
}

[v-cloak]::before {
  content: "로딩중...";
}
</style>
