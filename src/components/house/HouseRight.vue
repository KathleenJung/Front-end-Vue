<template>
  <div style="max-width: 50%">
    <div id="roadview" style="height: 300px"></div>
    <div id="aptName">{{ aptInfomation.apartmentName }}</div>
    <div id="buildYear" style="text-align: left">건축년도 : {{ aptInfomation.buildYear }}</div>
    <div id="address">{{ aptInfomation.roadNameAddress }}</div>
    <div id="address">{{ aptInfomation.jibunNameAddress }}</div>
    <div id="text" style="color:blue;" @click="viewInfo">자세히보기</div>
    <div id="infra" v-if="isSeoul">
      <b-alert show variant="success" v-if="isGood">
        <div id="infocontent">아파트의 총 평가 인프라 지수는 {{ this.aptGrade.total }}등급입니다.</div>
      </b-alert>
      <b-alert show variant="warning" v-else>
        <div id="infocontent">아파트의 총 평가 인프라 지수는 {{ this.aptGrade.total }}등급입니다.</div>
      </b-alert>
      <div id="infra">
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <div id="infoline">
              <div id="infocontent">관광/여가/오락</div>
              <div id="infocontent">{{ this.aptGrade.entertainmentGrade }}등급</div>
            </div>
            <div id="infoline">
              <div id="infocontent">부동산</div>
              <div id="infocontent">{{ this.aptGrade.realEastateGrade }}등급</div>
            </div>
            <div id="infoline">
              <div id="infocontent">생활 서비스</div>
              <div id="infocontent">{{ this.aptGrade.livingServiceGrade }}등급</div>
            </div>
            <div id="infoline">
              <div id="infocontent">소매</div>
              <div id="infocontent">{{ this.aptGrade.retailSaleGrade }}등급</div>
            </div>
            <div id="infoline">
              <div id="infocontent">숙박</div>
              <div id="infocontent">{{ this.aptGrade.accommodationGrade }}등급</div>
            </div>
            <div id="infoline">
              <div id="infocontent">스포츠</div>
              <div id="infocontent">{{ this.aptGrade.sportsGrade }}등급</div>
            </div>
            <div id="infoline">
              <div id="infocontent">음식</div>
              <div id="infocontent">{{ this.aptGrade.foodGrade }}등급</div>
            </div>
            <div id="infoline">
              <div id="infocontent">학문/교육</div>
              <div id="infocontent">{{ this.aptGrade.educationGrade }}등급</div>
            </div>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
    </div>
    <div v-if="!isSeoul">
      <b-alert show variant="danger">
        <div id="infocontent">인프라 지수 서비스는 현재 서울 지역에서만 가능합니다.</div>
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      roadview: "",
      roadviewClient: "",
      totalGrade: null,
    };
  },
  created() {
    // console.log('총 인프라 점수 ' + this.aptGrade.total);
  },
  methods: {
    ...mapActions(["setAptStore", "getAptGrade"]),
    viewInfo() {
      let routeUrl = this.$router.resolve({
        path: "/house/info",
      });
      window.open(routeUrl.href, "_blank");
    },
    moreInfo() {
      this.more = !this.more;
    },
    disableMore() {
      this.more = false;
    },
  },
  computed: {
    ...mapState(["house", "aptGrade"]),
    isGood() {
      if (this.aptGrade.total == "A" || this.aptGrade.total == "B") {
        return true;
      } else {
        return false;
      }
    },
    isSeoul() {
      const code = parseInt(this.house.aptCode / 1000000000000);
      if (code == 11) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    const roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    /* global kakao */
    this.roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    this.roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

    const position = new kakao.maps.LatLng(this.aptInfomation.lat, this.aptInfomation.lng);

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    const vueInstance = this;
    this.roadviewClient.getNearestPanoId(position, 100, function (panoId) {
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

#text {
  font-family: "NanumSquare";
  margin-top: 10px;
  margin-bottom: 10px;
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
