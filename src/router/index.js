import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "@/views/AppMain";
import AppHouse from "@/views/AppHouse";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: AppMain,
  },
  {
    path: "/house",
    name: "house",
    component: AppHouse,
    redirect: "/house/list",
    children: [
      {
        path: "list",
        name: "houselist",
        component: () => import("@/components/house/HouseMap"),
      },
      {
        path: "info",
        name: "houseinfo",
        component: () => import("@/components/house/HouseInfo"),
      },
    ],
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import("@/views/AppTodo"),
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/AppQna"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: () => import("@/components/qna/QnaList"),
      },
      {
        path: "view/:articleno",
        name: "qnaview",
        component: () => import("@/components/qna/QnaView"),
      },
      {
        path: "write",
        name: "qnawrite",
        component: () => import("@/components/qna/QnaWrite"),
      },
      {
        path: "modify",
        name: "qnamodify",
        component: () => import("@/components/qna/QnaModify"),
      },
      {
        path: "delete",
        name: "qnadelete",
        component: () => import("@/components/qna/QnaDelete"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/AppUser"),
    children: [
      {
        path: "join",
        name: "join",
        component: () => import("@/components/user/UserRegister"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/components/user/UserLogin"),
      },
      {
        path : "findPwd",
        name : "findPwd",
        component: () => import("@/components/user/UserFindPwd"),
      },
      {
        path : "mypage",
        name : "mypage",
        component: () => import("@/components/user/UserMyPage"),
      },
      
    ],
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/AppBoard"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: () => import("@/components/board/BoardList"),
      },
      {
        path: "write",
        name: "boardwrite",
        component: () => import("@/components/board/BoardWrite"),
      },
      {
        path: "view/:articleno",
        name: "boardview",
        component: () => import("@/components/board/BoardView"),
      },
      {
        path: "modify/:articleno",
        name: "boardmodify",
        component: () => import("@/components/board/BoardModify"),
      },
      {
        path: "delete/:articleno",
        name: "boarddelete",
        component: () => import("@/components/board/BoardDelete"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
