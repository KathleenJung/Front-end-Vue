<template>
  <div style="max-width: 80%">
    <div class="m-5">
      <div id="title">동으로 검색</div>
      <b-form-group id="input-sido">
        <b-form-select
          ref="test"
          id="input-sido"
          v-model="form.sido"
          :options="sido"
          @change="setGugun"
          required
        >
        </b-form-select>
      </b-form-group>
      <b-form-group id="input-gugun">
        <b-form-select
          id="input-gugun"
          v-model="form.gugun"
          :options="gugun"
          @change="setDong"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-dong">
        <b-form-select
          id="input-dong"
          v-model="form.dong"
          :options="dong"
          @change="getDongName"
          required
        ></b-form-select>
      </b-form-group>
      <b-button variant="outline-primary" @click.prevent="focusDong">검색</b-button>
    </div>
    <div class="m-5">
      <div id="title">아파트 이름으로 검색</div>
      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="아파트명"
          required
        ></b-form-input>
      </b-form-group>
      <b-button variant="outline-primary">검색</b-button>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "HouseLeft",
  data() {
    return {
      test: null,
      form: {
        sido: null,
        gugun: null,
        dong: null,
      },
      selected: [{ sido: "", gugun: "", dong: "" }],
      sido: [],
      gugun: [],
      dong: [],
    };
  },
  methods: {
    setGugun() {
      this.getSidoName();

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
      const dong = {
        dongCode: this.form.dong,
        dongAdd: `${this.selected.sido} ${this.selected.gugun} ${this.selected.dong}`,
      };
      // const dongCode = this.form.dong;
      // const dongAdd = `${this.selected.sido} ${this.selected.gugun} ${this.selected.dong}`;
      // console.log(dongAdd + ` ${this.form.dong}`);
      console.log(`${dong.dongAdd} ${dong.dongCode}`);
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
};
</script>

<style>
#title {
  font-family: "NanumSquareBold";
  font-size: larger;
  margin-top: 20px;
}
</style>
