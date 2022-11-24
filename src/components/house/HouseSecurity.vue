<template>
  <div>hello</div>
</template>

<script>
import http from "@/api/http";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  created() {
    const code = parseInt(this.house.aptCode / 10000);
    http.get(`/security-index/${code}`).then(({ data }) => {
      console.log(typeof data);
      this.setSecurityStore(data);
    });
  },
  computed: {
    ...mapState(["house"]),
  },
  methods: {
    ...mapActions(["setSecurityStore"]),
  },
};
</script>

<style></style>
