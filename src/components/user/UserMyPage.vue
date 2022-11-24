<template>
   <div>
    <div class="underline-steelblue"
      style="color: black; text-decoration: none; font-size: xx-large; font-family: 'NanumSquareExtraBold'; margin-top:70px;">
      My Page
    </div>
    <b-container class="mt-5 signin d-flex justify-content-center">
      <b-card class="text-center mt-3 shadow" style="width:70%;" bg-variant="light">
        <div style="font-size: xx-large;">회원 정보 페이지</div>
        <b-form-group class="m-5">
          <b-form-group 
          id="fieldset-horizontal"
          label="아이디"
          label-for="nested-ID">
            <b-form-input id="nested-ID" placeholder="아이디" v-model="userDetail.userId" disabled></b-form-input>
          </b-form-group>
          <b-form-group 
          label="이름"
          label-for="nested-Name" >
            <b-form-input id="nested-Name" placeholder="이름" v-model="userDetail.userName"></b-form-input>
          </b-form-group>

          <div class=" mt-3 p-2">이메일</div>
          <b-form inline>
            <b-form-input
            id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="이메일 아이디"
            v-model="userDetail.emailId">
            </b-form-input>
            <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-username" placeholder="ssafy.com" v-model="userDetail.emailDomain" >
              </b-form-input>
            </b-input-group>
          </b-form>
          <div class=" mt-3 p-2">가입일 : {{this.userDetail.joinDate}}</div>
          <b-button class=" mt-3 p-2" variant="primary" style="width:100%; font-size: larger; border-radius: 24px;"
          @click="modifyUser">
            정보 수정하기</b-button>
            <b-button class=" mt-3 p-2" variant="success" style="width:100%; font-size: larger; border-radius: 24px;"
            @click="moveChangePwd">
            비밀번호 변경</b-button>
            <b-button class=" mt-3 p-2" variant="danger" style="width:100%; font-size: larger; border-radius: 24px;"
            @click="deleteUser">
            탈퇴하기</b-button>
        </b-form-group>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/http";
import {mapState, mapActions} from "vuex";
const memberStore = "memberStore";
import { getUserDetail} from "@/api/member";
export default{
  name: "UserMyPage",
  data() {
    return {
      userDetail : {
        userId: "",
        userName: "",
        emailId: "",
        emailDomain: "",
      },
    };
  },
    created(){
      this.getDetail(this.userInfo.userId);
    },
      computed: {
    ...mapState(memberStore, ["userInfo"]),
    },
    methods: {
    ...mapActions(memberStore, ["deleteUserInfo"]),
    getDetail(userid) { 
      getUserDetail(
          userid,
          ({ data }) => { 
            this.userDetail = data;
            console.log(this.userDetail);
          },
          (error)=>{ 
            console.log(error.response.status);
          }
        )
      },
    modifyUser(){
      console.log(this.userDetail.userId);
      console.log(this.userDetail.userName);
      console.log(this.userDetail.emailId);
      console.log(this.userDetail.emailDomain);

      const ins = this.userDetail;
      
      http.put(`/user/${this.userDetail.userId}`, {
        userId : ins.userId,
        userName : ins.userName,
        emailId : ins.emailId,
        emailDomain : ins.emailDomain,
      }).then(() => {
        alert('변경완료');
        //this.$router.go();
      })
    },
    async deleteUser(){
      this.deleteUserInfo(this.userInfo.userId);
      alert("유저 정보 삭제 완료");
      this.movePage();
    },
      movePage() {
        this.$router.push({ name: "main" });
      },
      moveChangePwd(){
        this.$router.push({name : "changePwd"});
      },
    }
}

</script>

<style>

</style>