<template>
  <div>
    <div class="underline-purple" style="color: black; text-decoration: none; font-size: xx-large; font-family: 'NanumSquareExtraBold'; margin-top:70px; display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, #9042f569 30%);">
      Sign-in
    </div>
    <b-container class="mt-5 login d-flex justify-content-center">
      <b-card class="text-center mt-3 shadow" style="width:70%;">
        <div style="font-size: xx-large;">Hello!</div>
        <b-form class="m-5">
          <b-alert show variant="danger" v-if="isLoginError">아이디 또는 비밀번호를 확인하세요.</b-alert>
          <b-form-group label-for="userid">
            <b-form-input id="userid" v-model="user.userid" required placeholder="아이디" @keyup.enter="confirm">
            </b-form-input>
          </b-form-group>
          <b-form-group label-for="userpwd">
            <b-form-input type="password" id="userpwd" v-model="user.userpwd" required placeholder="비밀번호"
              autoComplete="on" @keyup.enter="confirm"></b-form-input>
          </b-form-group>
          <div class="text-left" style="color:#9042f5;" @click="moveFindPwd">비밀번호를 잊으셨나요?</div>
          <!-- <b-button type="button" variant="info" class="mt-3 p-2"
            style="width: 100%; font-size: larger; border-radius: 24px;" @click="confirm">Sign in
          </b-button> -->
          <button
            style="width:100%; font-size: larger; border-radius: 24px; color:white; background-color:#9042f5; margin-top: 10px; padding: 10px; border: none;"
            @click.prevent="confirm">Sign in</button>
        </b-form>
        <div>구해줘 홈즈가 처음이신가요? <b style="color: #9042f5;" @click="moveJoin">회원가입</b></div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    log(){
        console.log(this.user.userid);
        console.log(this.user.userpwd);
    },
    async confirm() {
      this.log();
      if(this.user.userid == null || this.user.userpwd == null){
        alert("ID 혹은 Password를 입력해주세요");
        return;
      }
      
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("accessToken");
      console.log(token);
      console.log(this.isLogin);
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "main" });
      }
    },
    movePage() {
      this.$router.push({ name: "main" });
    },
    moveJoin() {
      this.$router.push({ name: "join" });
    },
    moveFindPwd(){
      this.$router.push({name : "findPwd"})
    }, 
  },
};
</script>

<style>
.login {
  font-family: "NanumSquare";
}
</style>
