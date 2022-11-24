import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/http";
import createPersistedState from "vuex-persistedstate";
// module import
import memberStore from "@/store/modules/memberStore"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sido: { value: "", text: "" },
    gugun: { value: "", text: "" },
    dong: { value: "", text: "" },
    houses: [],
    house: null,
    todos: [
      // { title: '할 일1', completed: false },
      // { title: '할 일2', completed: false },
    ],
    searchDong: {
      dongCode: null,
      dognAdd: null,
      aptName: null,
      budgetLow: null,
      budgetHigh: null,
      areaLow: null,
      areaHigh:null,
    }
  },
  getters: {
    allTodosCount(state) {
      return state.todos.length;
    },
    completedTodosCount(state) {
      return state.todos.filter((todo) => {
        return todo.completed === true;
      }).length;
    },
    unCompletedTodosCount(state) {
      return state.todos.filter((todo) => {
        return todo.completed === false;
      }).length;
    },
  },
  mutations: {
    /////////////////////////////// House start /////////////////////////////////////
    SET_SIDO(state, sido) {
      state.sido = sido;
    },
    SET_GUGUN(state, gugun) {
      state.gugun = gugun;
    },
    SET_DONG(state, dong) {
      state.dong = dong;
    },
    SET_SEARCH_DONG(state, searchDong) {
      state.searchDong = searchDong;
    },
    CLEAR_SEARCH_DONG(state) {
      state.searchDong = {
        dongCode: null,
        dognAdd: null,
        aptName: null,
        budgetLow: null,
        budgetHigh: null,
        areaLow: null,
        areaHigh: null,
      };
    },
    CLEAR_ALL(state) {
      state.sido = { value: "", text: "" };
        state.gugun = { value: "", text: "" };
        state.dong = { value: "", text: "" };
    },
    CLEAR_HOUSE_LIST(state) {
      state.houses = [];
      state.house = null;
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
    },
    /////////////////////////////// House end /////////////////////////////////////

    //////////////////////////// Todo List start //////////////////////////////////
    CREATE_TODO(state, todoItem) {
      // console.log('mutation CREATE_TODO Call');
      // console.log(state);
      // console.log(todoItem);
      state.todos.push(todoItem);
    },
    DELETE_TODO(state, todoItem) {
      const index = state.todos.indexOf(todoItem);
      state.todos.splice(index, 1);
    },
    UPDATE_TODO_STATUS(state, todoItem) {
      // console.log(state);
      // console.log(todoItem);
      state.todos = state.todos.map((todo) => {
        if (todo === todoItem) {
          return {
            // title: todoItem.title,
            ...todo,
            completed: !todoItem.completed,
          };
        }
        return todo;
      });
    },
    //////////////////////////// Todo List end //////////////////////////////////
  },
  actions: {
    /////////////////////////////// House start /////////////////////////////////////
    setSidoStore({ commit }, sido) {
      commit("SET_SIDO", sido);
    },
    setGugunStore({ commit }, gugun) {
      commit("SET_GUGUN", gugun);
    },
    setDongStore({ commit }, dong) {
      commit("SET_DONG", dong);
    },
    setSearchDongStore({ commit }, searchDong) {
      commit("SET_SEARCH_DONG", searchDong);
    },
    setHouseListStore({ commit }, houses) {
      commit("SET_HOUSE_LIST", houses);
    },
    detailHouse({ commit }, house) {
      // 나중에 house.일련번호를 이용하여 API 호출
      // console.log(commit, house);
      commit("SET_DETAIL_HOUSE", house);
    },
    getHouseList({ commit }, gugunCode) {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      // const SERVICE_KEY =
      //   "######################## Service Key ########################";
      const SERVICE_URL =
        "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
      const params = {
        LAWD_CD: gugunCode,
        DEAL_YMD: "202207",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      http
        .get(SERVICE_URL, { params })
        .then(({ data }) => {
          // console.log(commit, data);
          commit("SET_HOUSE_LIST", data.response.body.items.item);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /////////////////////////////// House end /////////////////////////////////////

    //////////////////////////// Todo List start //////////////////////////////////
    // createTodo(context, todoItem) {
    //   console.log(context);
    //   console.log('actions createTodo Call');
    //   context.commit('CREATE_TODO', todoItem);
    // },
    // destructuring 활용
    createTodo({ commit }, todoItem) {
      commit("CREATE_TODO", todoItem);
    },
    deleteTodo({ commit }, todoItem) {
      // console.log(context);
      // console.log(todoItem);
      commit("DELETE_TODO", todoItem);
    },
    updateTodoStatus({ commit }, todoItem) {
      commit("UPDATE_TODO_STATUS", todoItem);
    },
    //////////////////////////// Todo List end //////////////////////////////////

  },
  modules: {
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
