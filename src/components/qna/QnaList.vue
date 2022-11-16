<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <h1>QnA를 작성해보세요.</h1>
        <h3>궁금한 내용을 질문하시면 관리자 확인 후 답변을 받아보실 수 있습니다.</h3>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped hover :items="articles" :fields="fields" @row-clicked="viewArticle"> </b-table>
      </b-col>
    </b-row>
    <div>
  <b-input-group>
      <b-form-select v-model="selected" :options="options"></b-form-select>
    <b-form-input v-model="keyword"></b-form-input>
      <b-button variant="success" @click="search">
        <b-icon icon="search"></b-icon>
      </b-button>
    </b-input-group>
</div>
  </b-container>
</template>

<script>
import http from "@/api/http";

export default {
  name: "qnaList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
      ],
      selected: null,
      options: [
        {value : 'all', text: '전체'},
        {value: 'subject', text: '제목'},
        {value: 'userid', text: '작성자'}
      ],
      keyword: "",
    };
  },
  created() {
    http.get(`/qna`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "qnawrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "qnaview",
        params: { articleno: article.articleno },
      });
    },
    search() {
      http.get(`/qna?key=${this.selected}&word=${this.keyword}`).then(({ data }) => {
        this.articles = data;
      })
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
