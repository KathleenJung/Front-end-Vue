<template>
  <div style="max-width: 80%">
    <div class="m-5">
      <b>동으로 검색</b>
      <b-form-group id="input-sido">
        <b-form-select
          id="input-sido"
          v-model="form.food"
          :options="foods1"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-gugun">
        <b-form-select
          id="input-gugun"
          v-model="form.food"
          :options="foods2"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-dong">
        <b-form-select
          id="input-dong"
          v-model="form.food"
          :options="foods3"
          required
        ></b-form-select>
      </b-form-group>
      <b-button variant="outline-primary">검색</b-button>
    </div>
    <div class="m-5">
      <b>아파트로 검색</b>
      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="아파트명"
          required
        ></b-form-input>
      </b-form-group>
      <b-button variant="outline-primary">검색</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HouseLeft",
  data() {
    return {
      form: {
        email: "",
        name: "",
        checked: [],
        food: null,
      },
      foods1: [{ text: "시", value: null }, "Carrots", "Beans", "Tomatoes", "Corn"],
      foods2: [{ text: "군", value: null }, "Carrots", "Beans", "Tomatoes", "Corn"],
      foods3: [{ text: "구", value: null }, "Carrots", "Beans", "Tomatoes", "Corn"],
      show: true,
    };
  },
};
</script>

<style></style>
