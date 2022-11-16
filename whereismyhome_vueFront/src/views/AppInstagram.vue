<template>
  <div>
    <the-header-navbar style="position: absolute; width:100%; z-index: 2;"></the-header-navbar>
  <div style="z-index: 1;">
    <b-container class="bv-example-row text-center" style="padding-top: 100px;">
      <h3 class="underline-green">
        <b-icon icon="instagram"></b-icon> 인별그램 Service
      </h3>
      <b-row>
        <b-col></b-col>
        <b-col cols="10">
          <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
            <template #header>SSAFY 인별그램</template>

            <template #lead> 홍보용 인별그램. </template>

            <hr class="my-4" />

            <p>좋은사진 많이 올려주세요.</p>
          </b-jumbotron>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div></div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";
export default {
  name: "AppInstagram",
  components : {
    TheHeaderNavbar,
  },
};
</script>

<style scoped>
.underline-green {
  display: inline-block;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0) 70%,
      rgba(56, 233, 40, 0.3) 30%);
}
</style>
