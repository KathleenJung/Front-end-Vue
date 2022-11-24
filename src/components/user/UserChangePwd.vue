<template>
   <div>
    <div class="underline-steelblue"
      style="color: black; text-decoration: none; font-size: xx-large; font-family: 'NanumSquareExtraBold'; margin-top:70px;">
      My Page
    </div>
    <b-container class="mt-5 signin d-flex justify-content-center">
      <b-card class="text-center mt-3 shadow" style="width:70%;" bg-variant="light">
        <div style="font-size: xx-large;">비밀번호 변경</div>
        <b-form-group class="m-5">
          <b-form-group label-for="nested-current-password" label-align-sm="right">
            <b-form-input id="nested-current-password" placeholder="현재 비밀번호" v-model="currentPassword" ></b-form-input>
          </b-form-group>
          <b-form-group label-for="nested-password" label-align-sm="right">
            <b-form-input id="nested-password" placeholder="새 비밀번호" v-model="newPassword" ></b-form-input>
          </b-form-group>
          

          <b-form-group label-for="nested-confirm-password" label-align-sm="right">
            <b-form-input id="nested-confirm-password" placeholder="새 비밀번호 확인"></b-form-input>
          </b-form-group>
            <b-button class=" mt-3 p-2" variant="success" style="width:100%; font-size: larger; border-radius: 24px;"
            @click="changePwd">
            비밀번호 변경</b-button>
        </b-form-group>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/http";
import {mapState, mapActions} from "vuex";
const memberStore = "memberStore";
export default{
  name: "UserChangePwd",
  data() {
    return {
        currentPassword : "",
        newPassword : "",
      
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    changePwd(){
      http.put(`/user/${this.userInfo.userId}/password`, {
        currentPassword : this.currentPassword,
        newPassword : this.newPassword,
      }).then((response) => {
        //console.log(response);
        if(response.status == 202){
          alert("현재 비밀번호가 일치하지 않습니다.")
        } else if(response.status == 200) {
        this.userLogout(this.userInfo.userId);
        alert('비밀번호 변경완료. 다시 로그인해주세요.');
        this.movePage();
        }
      })
    },
    movePage() {
      this.$router.push({ name: "main" });
    },
  }
}

</script>

<style>

</style>