<template>
  <div v-b-hover="handleHover" data-aos="fade-down">
    <b-navbar toggleable="lg" type="dark" :variant="isHovered ? 'white' : 'TRANSPARENT'">
      <b-navbar-brand href="#">
        <router-link :to="{ name: 'main' }" :class="isHovered ? 'm-5 title-hover' : 'm-5 title'">
          WhereIsOurHome?
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
            <router-link :to="{ name: 'insta' }" :class="isHovered ? 'm-5 link-hover' : 'm-5 link'">
              <!-- <b-icon icon="instagram" font-scale="2"></b-icon> -->
              INSTAGRAM
            </router-link>
            <router-link :to="{ name: 'board' }" :class="isHovered ? 'm-5 link-hover' : 'm-5 link'">
              <!-- <b-icon icon="journal" animation="fade" font-scale="2"></b-icon> -->
              BOARD
            </router-link>
            <router-link :to="{ name: 'house' }" :class="isHovered ? 'm-5 link-hover' : 'm-5 link'">
              <!-- <b-icon icon="house-fill" animation="fade" font-scale="2"></b-icon> -->
              HOUSE
            </router-link>
            <router-link :to="{ name: 'todo' }" :class="isHovered ? 'm-5 link-hover' : 'm-5 link'">
              <!-- <b-icon icon="calendar-check" animation="fade" font-scale="2"></b-icon> -->
              TODOLIST
            </router-link>
            <router-link :to="{ name: 'qna' }" :class="isHovered ? 'm-5 link-hover' : 'm-5 link'">
              <!-- <b-icon icon="patch-question" animation="fade" font-scale="2"></b-icon> -->
              QNA
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <template #button-content>
            <b-icon icon="people" font-scale="2"></b-icon>
          </template> -->
          <div v-if="!isLogin">
            <router-link :to="{ name: 'join' }" :class="isHovered ? 'mr-5 link-hover' : 'mr-5 link'">
              <!-- <b-icon icon="person-circle"></b-icon> -->
              SIGN-UP
            </router-link>
            <router-link :to="{ name: 'login' }" :class="isHovered ? 'mr-5 link-hover' : 'mr-5 link'">
              <!-- <b-icon icon="key"></b-icon> -->
              SIGN-IN
            </router-link>
          </div>
          <div v-else>
            <!-- <div>{{ sessionStorage.getItem("userInfo.userName") }} 님 안녕하세요?</div> -->
            <div :class="isHovered ? 'mr-5 link-hover' : 'mr-5 link'" @click.prevent="onClickLogout">SIGN-OUT</div>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
const memberStore = "memberStore";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
export default {
  name: "TheHeaderNavbar",
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo.userId);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem("accessToken"); //저장된 토큰 없애기
      sessionStorage.removeItem("refreshToken"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
    handleHover(hovered) {
      this.isHovered = hovered
    }
  }
};
</script>

<style scoped>
#logo {
  width: 120px;
}

.link {
  color: white;
  text-decoration: none;
  font-size: large;
  font-family: 'NanumSquareBold';
}

.link-hover {
  color: black;
  text-decoration: none;
  font-size: large;
  font-family: 'NanumSquareBold';
}

.title {
  color: white;
  text-decoration: none;
  font-size: x-large;
  font-family: 'NanumSquareExtraBold';
}

.title-hover {
  color: black;
  text-decoration: none;
  font-size: x-large;
  font-family: 'NanumSquareExtraBold';
}
</style>
