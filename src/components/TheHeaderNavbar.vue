<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="white">
      <b-navbar-brand href="#">
        <router-link :to="{ name: 'main' }" class="m-5 title">
          MoYeoBang
          <!-- <b-img
            :src="require('@/assets/ssafy_logo.png')"
            id="logo"
            class="d-inline-block align-top"
            alt="logo"
          ></b-img> -->
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">
            <!-- <router-link :to="{ name: 'main' }" class="link">
              <b-icon icon="house-door" animation="fade" font-scale="2"></b-icon>
              메인
            </router-link> -->
            <router-link :to="{ name: 'house' }" class="m-5 link">
              <!-- <b-icon icon="house-fill" animation="fade" font-scale="2"></b-icon> -->
              HOUSE
            </router-link>
            <router-link :to="{ name: 'board' }" class="m-5 link">
              <!-- <b-icon icon="journal" animation="fade" font-scale="2"></b-icon> -->
              NOTICE
            </router-link>
            <router-link :to="{ name: 'qna' }" class="m-5 link">
              <!-- <b-icon icon="patch-question" animation="fade" font-scale="2"></b-icon> -->
              QNA
            </router-link>
            <!-- <router-link :to="{ name: 'todo' }" class="m-5 link">
              TODOLIST
            </router-link> -->
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <template #button-content>
            <b-icon icon="people" font-scale="2"></b-icon>
          </template>
          <div v-if="!isLogin">
            <router-link :to="{ name: 'join' }" class="mr-5 link">
              <!-- <b-icon icon="person-circle"></b-icon> -->
              SIGN-UP
            </router-link>
            <router-link :to="{ name: 'login' }" class="mr-5 link">
              <!-- <b-icon icon="key"></b-icon> -->
              SIGN-IN
            </router-link>
          </div>
          <!-- <button @click.prevent="onClickLogout" v-else>sign-out</button> -->
          <div v-else>
            <!-- <div>{{ sessionStorage.getItem("userInfo.userName") }} 님 안녕하세요?</div> -->
            <div class="mr-5 link" @click.prevent="onClickLogout">SIGN-OUT</div>
            <router-link :to="{ name: 'mypage' }" class="mr-5 link">
              My Page
            </router-link>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    onClickLogout() {
      console.log(this.userInfo.userId);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("accessToken"); //저장된 토큰 없애기
      sessionStorage.removeItem("refreshToken"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style scoped>
#logo {
  width: 120px;
}

.link {
  color: black;
  text-decoration: none;
  font-size: large;
  font-family: "NanumSquareBold";
}

.title {
  color: black;
  text-decoration: none;
  font-size: x-large;
  font-family: "NanumSquareExtraBold";
}
</style>
