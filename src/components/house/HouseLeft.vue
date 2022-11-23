<template>
  <div style="max-width: 80%">
    <div class="m-5">
      <div id="title">동으로 검색</div>
      <b-form-group id="input-sido">
        <b-form-select ref="test" id="input-sido" v-model="form.sido" :options="sido" @change="setGugun" required>
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-gugun">
        <b-form-select disabled v-if="!isSido"></b-form-select>
        <b-form-select id=" input-gugun" v-model="form.gugun" :options="gugun" @change="setDong" required v-if="isSido">
        </b-form-select>
      </b-form-group>
      <b-form-invalid-feedback :state="blockOnlySido">
        시도와 구군은 필수로 선택해야 합니다.
      </b-form-invalid-feedback>
      <b-form-select disabled v-if="!isGugun"></b-form-select>
      <b-form-group id="input-dong">
        <b-form-select id="input-dong" v-model="form.dong" :options="dong" @change="getDongName" required
          v-if="isGugun">
        </b-form-select>
      </b-form-group>
      <b-button class="m-2" variant="outline-danger" @click.prevent="clearAll">초기화</b-button>
      <b-button class="m-2" variant="outline-primary" @click.prevent="focusDong">검색</b-button>
    </div>
    <div class="m-5">
      <div id="title" style="color:blue; font-family: 'NanumSquareExtraBold';">상세 검색</div>
      <div id="title">아파트 이름으로 검색</div>
      <b-form-group id="input-group-2">
        <b-form-input id="input-2" v-model="aptName" placeholder="아파트명" required></b-form-input>
      </b-form-group>
      <div id="title">가격으로 검색</div>
      <div id="slider">
        <!-- <Slider v-model="budget" :min="5" :max="100" :format="formatB" /> -->
        <vue-slider v-model="budget" :min="5"></vue-slider>
      </div>
      <div id="content">
        <div v-if="subBudget[1] < 10 && subBudget[3] < 10">
          {{ subBudget[0] }}천만원~{{ subBudget[2] }}천만원
        </div>
        <div v-if="subBudget[1] < 10 && subBudget[3] >= 10">
          {{ subBudget[0] }}천만원~{{ subBudget[2] }}억원
        </div>
        <div v-if="subBudget[1] >= 10 && subBudget[3] >= 10">
          {{ subBudget[0] }}억원 ~ {{ subBudget[2] }}억원
        </div>
      </div>
      <div id="title">면적으로 검색</div>
      <div id="slider">
        <vue-slider v-model="area" :max="231" :interval="33" :tooltip-formatter="'{value}m²'">
        </vue-slider>
      </div>
      <div id="content">
        <div>{{ subArea[0] }}평 대 ~ {{ subArea[1] }}평 대</div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";
// import Slider from "@vueform/slider/dist/slider.vue2.js";
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: "HouseLeft",
  data() {
    return {
      test: null,
      form: {
        sido: "",
        gugun: "",
        dong: "",
      },
      aptName: "",
      selected: [{ sido: "", gugun: "", dong: "" }],
      sido: [],
      gugun: [],
      dong: [],

      // slider
      budget: [5, 100],
      area: [0, 231],
    };
  },
  computed: {
    subBudget() {
      let b = [];
      if (this.budget[0] < 10) {
        b.push(this.budget[0]);
        b.push(this.budget[0]);
      } else if (this.budget[0] >= 10) {
        b.push(this.budget[0] / 10);
        b.push(this.budget[0]);
      }
      if (this.budget[1] < 10) {
        b.push(this.budget[1]);
        b.push(this.budget[1]);
      } else if (this.budget[1] >= 10) {
        b.push(this.budget[1] / 10);
        b.push(this.budget[1]);
      }
      return b;
    },
    subArea() {
      let a = [];
      a.push(this.area[0] / 3.3);
      a.push(this.area[1] / 3.3);
      return a;
    },

    // 시, 구군까지 선택했을 때만 검색 활성화
    blockOnlySido() {
      return this.form.sido != "" && this.form.gugun != "";
    },

    // 시도가 있을 때만 구군이 선택 가능하게
    isSido() {
      if (this.form.sido == "") {
        return false;
      } else return true;
    },
    // 구군이 있을 때만 동이 선택 가능하게
    isGugun() {
      if (this.form.gugun == "") {
        return false;
      } else return true;
    }
  },
  components: { VueSlider },
  methods: {
    setGugun() {
      this.getSidoName();

      this.selected.gugun = "";
      this.selected.dong = "";

      this.form.gugun = "";
      this.form.dong = "";

      this.gugun = [];
      this.dong = [];
      http.get(`/map/gugun?sido=${this.form.sido}`).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          this.gugun.push({ text: data[i].gugunName, value: data[i].gugunCode });
        }
      });
    },
    setDong() {
      this.getGugunName();

      this.selected.dong = "";
      this.form.dong = "";

      this.dong = [];
      http.get(`/map/dong?sido=${this.form.sido}&gugun=${this.form.gugun}`).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          this.dong.push({ text: data[i].dongName, value: data[i].dongCode });
        }
      });
    },

    /* GET으로 받아온 sido 배열에서 filter로
    현재 선택된 sidoName의 value 값과 일치하는 값을 찾아서
    seleted 배열로 반환한 뒤
    받은 seleted[0].text 값을 data 배열에 저장 */
    getSidoName() {
      const selected = this.sido.filter((x) => x.value == this.form.sido);
      selected.sido = selected[0].text;
      this.selected.sido = selected.sido;
      // console.log(selected.sido);
    },
    getGugunName() {
      const selected = this.gugun.filter((x) => x.value == this.form.gugun);
      selected.gugun = selected[0].text;
      this.selected.gugun = selected.gugun;
      // console.log(selected.gugun);
    },
    getDongName() {
      const selected = this.dong.filter((x) => x.value == this.form.dong);
      selected.dong = selected[0].text;
      this.selected.dong = selected.dong;
      // console.log(selected.dong);
    },

    // HouseMap에게 주소로 검색 요청
    focusDong() {
      if (!this.blockOnlySido) {
        console.log("검색 불가능");
        return;
      }
      let code;
      console.log(`시·군구·동 코드 : ${this.form.sido} ${this.form.gugun} ${this.form.dong}`);
      if (this.form.dong != "") {
        code = this.form.dong;
      } else if (this.form.dong == "") {
        if (this.form.gugun != "") {
          code = this.form.gugun;
        } else if (this.form.gugun == "") {
          code = this.form.sido;
        }
      }

      const dong = {
        dongCode: code,
        dongAdd: `${this.selected.sido} ${this.selected.gugun} ${this.selected.dong}`,
        aptName: this.aptName,
        budgetLow: this.budget[0],
        budgetHigh: this.budget[1],
        areaLow: this.area[0],
        areaHigh: this.area[1],
      };
      if (dong.budgetLow == 5) {
        dong.budgetLow = "";
      }
      if (dong.budgetHigh == 100) {
        dong.budgetHigh = "";
      }
      if (dong.areaLow == 0) {
        dong.areaLow = "";
      }
      if (dong.areaHigh == 231) {
        dong.areaHigh = "";
      }
      // const dongCode = this.form.dong;
      // const dongAdd = `${this.selected.sido} ${this.selected.gugun} ${this.selected.dong}`;
      // console.log(dongAdd + ` ${this.form.dong}`);
      console.log(`${dong.dongAdd} ${dong.dongCode} 를 검색합니다.`);
      // console.log(`${dong.budgetLow} ${dong.budgetHigh} ${dong.areaLow} ${dong.areaHigh} ${dong.aptName}`);
      // console.log(`${this.form.dong}`);
      this.$emit("focusDong", dong);
    },
  },
  created() {
    http.get(`/map/sido`).then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        this.sido.push({ text: data[i].sidoName, value: data[i].sidoCode });
      }
    });
  },
  clearAll() {
    this.form.sido = "";
    this.form.gugun = "";
    this.form.dong = "";
    this.aptName = "";
    this.budget = [5, 100];
    this.area = [0, 231];
  },
};
</script>

<style>
#title {
  font-family: "NanumSquareBold";
  font-size: larger;
  margin-top: 20px;
}

#content {
  font-family: "NanumSquare";
  margin-top: 20px;
  margin-bottom: 10px;
}

#slider {
  margin-top: 50px;
  margin-bottom: 15px;
}
</style>
