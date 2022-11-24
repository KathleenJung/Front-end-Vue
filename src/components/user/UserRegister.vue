<template>
  <div>
    <div
      class="underline-steelblue"
      style="
        color: black;
        text-decoration: none;
        font-size: xx-large;
        font-family: 'NanumSquareExtraBold';
        margin-top: 70px;
      "
    >
      Sign-Up
    </div>
    <b-container class="mt-5 signin d-flex justify-content-center">
      <b-card class="text-center mt-3 shadow" style="width: 70%" bg-variant="light">
        <div style="font-size: xx-large">회원가입</div>
        <b-form-group class="m-5">
          <b-form-group label-for="nested-ID" label-align-sm="right">
            <b-form-input id="nested-ID" placeholder="아이디" v-model="user.userId"></b-form-input>
          </b-form-group>
          <b-form-group label-for="nested-ID" label-align-sm="right">
            <b-form-input id="nested-ID" placeholder="이름" v-model="user.userName"></b-form-input>
          </b-form-group>
          <b-form-group label-for="nested-password" label-align-sm="right">
            <b-form-input
              id="nested-password"
              type="password"
              placeholder="비밀번호"
              v-model="user.userPwd"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-for="nested-confirm-password" label-align-sm="right">
            <b-form-input
              id="nested-confirm-password"
              type="password"
              placeholder="비밀번호 확인"
            ></b-form-input>
          </b-form-group>

          <b-form inline>
            <b-form-input
              id="inline-form-input-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="이메일 아이디"
              v-model="user.emailId"
            >
            </b-form-input>
            <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                id="inline-form-input-username"
                placeholder="ssafy.com"
                v-model="user.emailDomain"
              >
              </b-form-input>
            </b-input-group>
          </b-form>
          <b-button
            class="mt-3 p-2"
            variant="primary"
            style="width: 100%; font-size: larger; border-radius: 24px"
            @click="signup"
          >
            Sign-up</b-button
          >
        </b-form-group>
        <div>이미 계정이 있으신가요? <b style="color: blue" @click="moveLogin">로그인</b></div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  name: "UserRegister",
  data() {
    return {
      user: {
        userId: "",
        userName: "",
        userPwd: "",
        emailId: "",
        emailDomain: "",
      },
    };
  },
  methods: {
    signup() {
      http.post(`/user`, this.user).then(() => {
        this.movePage();
      });
    },
    movePage() {
      this.$router.push({ name: "main" });
    },
    moveLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
.signin {
  font-family: "NanumSquare";
}

.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
</style>
