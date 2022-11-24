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
            <b-form-input id="nested-ID" placeholder="아이디" v-model="this.userDetail.userId" disabled></b-form-input>
          </b-form-group>
          <b-form-group 
          label="이름"
          label-for="nested-Name" >
            <b-form-input id="nested-Name" placeholder="이름" v-model="this.userDetail.userName"></b-form-input>
          </b-form-group>

          <div class=" mt-3 p-2">이메일</div>
          <b-form inline>
            <b-form-input
            id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="이메일 아이디"
            v-model="this.userDetail.emailId">
            </b-form-input>
            <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-username" placeholder="ssafy.com" v-model="this.userDetail.emailDomain" >
              </b-form-input>
            </b-input-group>
          </b-form>
          <div class=" mt-3 p-2">가입일 : {{this.userDetail.joinDate}}</div>
          <b-button class=" mt-3 p-2" variant="primary" style="width:100%; font-size: larger; border-radius: 24px;"
          @click="modifyUser">
            정보 수정하기</b-button>
            <b-button class=" mt-3 p-2" variant="success" style="width:100%; font-size: larger; border-radius: 24px;">
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
import {mapState, mapActions} from "vuex";
const memberStore = "memberStore";
import { getUserDetail} from "@/api/member";
export default{
  name: "UserMyPage",
  data() {
    return {
      userDetail : {
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
    async getDetail(userid) { 
      await getUserDetail(
          userid,
          ({ data }) => { 
            // TODO : 에러는 안났지만 요청이 정상적으로 실행되지 않은 경우 로직처리
            this.userDetail = data;
            console.log(this.userDetail);
          },
          (error)=>{ 
            console.log(error.response.status);
          }
        )
      },
    async modifyUser(){
      //console.log(this.userDetail);
      //console.log(JSON.stringify(this.userDetail));
      //await modify(
      //  JSON.stringify(this.userDetail),
      //  ({data}) => {
      //    console.log(data);
      //  },
      //  (error) => {
      //    console.log(error.response.status);
      //  }
      //)
    },
    async deleteUser(){
      this.deleteUserInfo(this.userInfo.userId);
          alert("유저 정보 삭제 완료");
      this.movePage();
    },
      movePage() {
        this.$router.push({ name: "main" });
      },
    }
}

</script>

<style>

</style>