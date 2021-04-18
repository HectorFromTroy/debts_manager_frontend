import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../components/Main"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import * as routePaths from "../constants/routes"

import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: routePaths.MAIN,
    name: 'Main',
    component: Main,
  }, {
    path: routePaths.LOGIN,
    name: 'Login',
    component: Login,
  }, {
    path: routePaths.SIGNUP,
    name: "SignUp",
    component: SignUp,
  }, { path: '*', redirect: '/' },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== "SignUp" && !store.state.isAuthenticated) {
    next({
      name: 'Login'
    })
  }
  else {
    next()
  }
})

export default router
