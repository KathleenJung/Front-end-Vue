<template>
  <div><div class="underline-purple" style="color: black; text-decoration: none; font-size: xx-large; font-family: 'NanumSquareExtraBold'; margin-top:70px; display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, #9042f569 30%);">
     아이디/비밀번호 찾기
    </div>
    <b-container class="mt-5 login d-flex justify-content-center">
      <b-card class="text-center mt-3 shadow" style="width:70%;">
        <div style="font-size: xx-large;">비밀번호 찾기</div>
        <b-form class="m-5">
        <b-alert show variant="primary">비밀번호를 찾을 아이디를 입력하세요</b-alert>
          <b-form-group label-for="userid">
            <b-form-input id="userid" v-model="user.userid" required placeholder="아이디" @keyup.enter="confirm">
            </b-form-input>
          </b-form-group>
          <button
            style="width:100%; font-size: larger; border-radius: 24px; color:white; background-color:#9042f5; margin-top: 10px; padding: 10px; border: none;"
            @click.prevent="find">비밀번호 찾기</button>
        </b-form>
      </b-card>
    </b-container></div>
</template>

<script>
import { findPwd } from "@/api/member";

export default {
  name: "UserFindPwd",
  data() {
    return {
      user: {
        userid: null,   
      },
    };
  },
   methods: {
    async find(){
      console.log('findPwd(randPwd 발급)! ', this.user.userid);
      await findPwd(
        this.user.userid,
        ({data}) => {
          if (data.message === "success") {
            alert(`가입시 사용한 이메일 ${data.email}으로 임시 비밀번호가 발급되었습니다.\n 미수신시 다시 요청해주세요.`);
            this.moveLogin();
          } else {
            alert("해당하는 유저 정보가 없습니다.");
          }
        },
        (error) => {
          console.log(error);
        }
      )
    },
    moveLogin(){
        this.$router.push({name : "login"})
    },
   },
};
</script>

<style>
.login {
  font-family: "NanumSquare";
}
</style>
tyle>