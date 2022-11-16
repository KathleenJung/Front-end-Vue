<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="white">
      <b-navbar-brand href="#">
        <router-link :to="{ name: 'main' }" class="m-5 title">
          WhereIsMyHome?
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
            <router-link :to="{ name: 'insta' }" class="m-5 link">
              <!-- <b-icon icon="instagram" font-scale="2"></b-icon> -->
              INSTAGRAM
            </router-link>
            <router-link :to="{ name: 'board' }" class="m-5 link">
              <!-- <b-icon icon="journal" animation="fade" font-scale="2"></b-icon> -->
              BOARD
            </router-link>
            <router-link :to="{ name: 'house' }" class="m-5 link">
              <!-- <b-icon icon="house-fill" animation="fade" font-scale="2"></b-icon> -->
              HOUSE
            </router-link>
            <router-link :to="{ name: 'todo' }" class="m-5 link">
              <!-- <b-icon icon="calendar-check" animation="fade" font-scale="2"></b-icon> -->
              TODOLIST
            </router-link>
            <router-link :to="{ name: 'qna' }" class="m-5 link">
              <!-- <b-icon icon="patch-question" animation="fade" font-scale="2"></b-icon> -->
              QNA
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
              <router-link :to="{ name: 'join' }" class="mr-5 link">
                <!-- <b-icon icon="person-circle"></b-icon> -->
                SIGN-UP
              </router-link>
              <router-link :to="{ name: 'login' }" class="mr-5 link"> 
                <!-- <b-icon icon="key"></b-icon> -->
                SIGN-IN </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "TheHeaderNavbar",
  data() {
    return {
    };
  },
};
</script>

<style scoped>
#logo {
  width: 120px;
}

.link {
  color : black;
  text-decoration: none;
  font-size:large;
  font-family: 'NanumSquareBold';
}
.title {
  color : black;
  text-decoration: none;
  font-size: x-large;
  font-family: 'NanumSquareExtraBold';
}
</style>
