<template>
  <div>
    <div id="rank">{{ this.sequrityIndex.sido }} {{ this.sequrityIndex.city }} {{ this.rank }}위</div>
    <div id="content">사회안전지수 {{ this.sequrityIndex.social_safety_index }}점</div>
    <div>
      <b-row>
        <b-col></b-col>
        <b-col cols="5">
          <div id="infoline">
            <div id="infocontent">인구수</div>
            <div id="infocontent">{{ this.sequrityIndex.population }}명</div>
          </div>
          <div id="infoline">
            <div id="infocontent">면적</div>
            <div id="infocontent">{{ this.sequrityIndex.area }}m²</div>
          </div>
          <div id="infoline">
            <div id="infocontent">도시지역 인구비율(행정구역 기준)</div>
            <div id="infocontent">{{ this.sequrityIndex.per_population }}%</div>
          </div>
          <div id="infoline">
            <div id="infocontent">도시지역 면적비율</div>
            <div id="infocontent">{{ this.sequrityIndex.urban_area_ratio }}%</div>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
    <a :href="goUrl" target="_blank" style="font-family:'NanumSquare'">자세히보기</a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

// chart.js
import { Bar } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  created() {
    // 동코드
    const c = parseInt(this.house.aptCode / 10000);
    this.dongCode = c;

    const code = this.house.aptCode;
    this.getSecurityData(code);

    const arr = [];
    arr.push(this.sequrityIndex.eaps_Income);
    arr.push(this.sequrityIndex.eaps_Welfare);
    arr.push(this.sequrityIndex.eaps_Employment);
    arr.push(this.sequrityIndex.eaps_Future);
    arr.push(this.sequrityIndex.lsps);
    arr.push(this.sequrityIndex.lsps_Firefighting);
    arr.push(this.sequrityIndex.lsps_Safety_Infrastructure);
    arr.push(this.sequrityIndex.lsps_Traffic_Safety);
    arr.push(this.sequrityIndex.hhps);
    arr.push(this.sequrityIndex.hhps);
    arr.push(this.sequrityIndex.hhps);
    arr.push(this.sequrityIndex.reps_Atmospheric_conditions);
    arr.push(this.sequrityIndex.reps_Residential_Conditions);
    arr.push(this.sequrityIndex.reps_Transportation_Infrastructure);
    arr.push(this.sequrityIndex.reps_Willingness_to_continue_living);
    this.chartData.datasets[0].data = arr;
  },
  computed: {
    ...mapState(["house", "sequrityIndex"]),
    rank() {
      return parseInt(this.sequrityIndex.unknown2);
    },
    goUrl() {
      return "https://www.mt.co.kr/ksi/detail.html?no=" + this.dongCode;
    }
  },
  methods: {
    ...mapActions(["setSecurityStore", "getSecurityData"]),

  },


  // charts.js
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
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
    },
  },
  data() {
    return {
      dongCode: null,
      chartData: {
        labels: [
          '소득',
          '복지',
          '고용',
          '미래',
          '치안',
          '소방',
          '안전인프라',
          '교통안전',
          '건강상태',
          '의료접근성',
          '의료만족도',
          '대기환경',
          '주거여건',
          '교통인프라',
          '정주의향'
        ],
        datasets: [
          {
            label: '점수',
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            data: [],
          },
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  }
};
</script>

<style>
#rank {
  font-family: 'NanumSquareBold';
  font-size: xx-large;
}

#content {
  font-family: 'NanumSquareBold';
  font-size: x-large;
}

#infocontent {
  font-family: 'NanumSquare';
  font-size: large;
}

#infoline {
  display: flex;
  justify-content: space-between;
}
</style>
