<template>
  <div>
    <the-header-navbar style="position: absolute; width:100%; z-index: 2;"></the-header-navbar>
    <b-container class="bv-example-row text-center" style="padding-top: 100px;">
      <!-- <h3 class="underline-steelblue"><b-icon icon="person-lines-fill"></b-icon> Member Service</h3> -->
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";
export default {
  name: "AppUser",
  components: {
    TheHeaderNavbar,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
</style>
