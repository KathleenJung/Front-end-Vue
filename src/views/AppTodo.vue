<template>
    <div>
    <the-header-navbar style="position: absolute; width:100%; z-index: 2;"></the-header-navbar>
  <b-container class="bv-example-row text-center" style="padding-top: 100px;">
    <h3 class="underline-steelblue"><b-icon icon="calendar-check"></b-icon> Todo List</h3>
    <b-row>
      <b-col>
        <todo-header></todo-header>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <todo-input></todo-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <todo-list></todo-list>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import TheHeaderNavbar from "@/components/TheHeaderNavbar";
import TodoHeader from "@/components/todo/TodoHeader.vue";
import TodoInput from "@/components/todo/TodoInput.vue";
import TodoList from "@/components/todo/TodoList.vue";

export default {
  name: "AppTodo",
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
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
