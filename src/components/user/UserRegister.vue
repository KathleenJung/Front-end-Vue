<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
        <div>
  <b-card bg-variant="light">
    <b-form-group
      label-cols-lg="3"
      label="환영합니다!!"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-group
        label="ID"
        label-for="nested-ID"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-ID"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Password:"
        label-for="nested-password"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-password"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Confirm Password"
        label-for="nested-confirm-password"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-confirm-password"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Email"
        label-for="nested-email"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-email"></b-form-input>

          <b-button variant="success">Button</b-button>
     
      </b-form-group>

    </b-form-group>
  </b-card>
</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "UserRegister",
};
</script>

<style></style>
