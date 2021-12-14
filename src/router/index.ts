import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: 'login' */"@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    // 验证用户身份
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import(/* webpackChunkName: 'home' */"@/views/home/index.vue"),
      },
      {
        path: "/role",
        name: "role",
        component: () => import(/* webpackChunkName: 'role' */"@/views/role/index.vue"),
      },
      {
        path: "/menu",
        name: "menu",
        component: () => import(/* webpackChunkName: 'menu' */"@/views/menu/index.vue"),
      },
      {
        path: "/resource",
        name: "resource",
        component: () => import(/* webpackChunkName: 'resource' */"@/views/resource/index.vue"),
      },
      {
        path: "/course",
        name: "course",
        component: () => import(/* webpackChunkName: 'course' */"@/views/course/index.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import(/* webpackChunkName: 'user' */"@/views/user/index.vue"),
      },
      {
        path: "/advert",
        name: "advert",
        component: () => import(/* webpackChunkName: 'advert' */"@/views/advert/index.vue"),
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () => import(/* webpackChunkName: 'advert-space' */"@/views/advert-space/index.vue"),
      },
      {
        path: "/menu/create",
        name: "menu-create",
        component: () => import(/* webpackChunkName: 'advert-space' */"@/views/menu/create.vue"),
      },
      {
        path: "/menu/:id/edit",
        name: "menu-edit",
        component: () => import(/* webpackChunkName: 'advert-space' */"@/views/menu/edit.vue"),
      },
      {
        path: "/role/:roleId/alloc-menu",
        name: "alloc-menu",
        component: () => import(/* webpackChunkName: 'advert-menu' */"@/views/role/alloc-menu.vue"),
        props: true,
      },
      {
        path: "/course/create",
        name: "course-create",
        component: () => import(/* webpackChunkName: 'course-create' */"@/views/course/create.vue"),
      },
      {
        path: "/course/:courseId/edit",
        name: "course-edit",
        component: () => import(/* webpackChunkName: 'course-edit' */"@/views/course/edit.vue"),
        props: true,
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: '404' */ "@/views/error-page/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("进入了全局路由守卫");
  console.log("来自  from ===>>>", from);
  console.log("要去  to   ===>>>", to);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: "login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
