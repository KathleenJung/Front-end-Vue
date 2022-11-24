<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          v-if="isMyQnA()"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" v-if="isMyQnA()" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject}</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="article.qnaAnswerDto" class="mb-1">
      <b-col>
        <b-card
          :header-html="`<div>${article.qnaAnswerDto.userId}</div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="`<div>${article.qnaAnswerDto.answerContent}</div>`"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else class="mb-1">
      <b-col>
        <div>답변 대기 중 입니다.</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "QnaDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    http.get(`/qna/${this.$route.params.articleno}`).then(({ data }) => {
      console.log(data);
      this.article = data;
    });
  },
  methods: {
    isMyQnA() {
      if (this.userInfo.userId === this.article.userid) {
        return true;
      } else false;
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "qnamodify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/qna/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "qnadelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "qnalist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
