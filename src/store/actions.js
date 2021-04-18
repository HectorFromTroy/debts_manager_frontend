import * as ajax from "../ajax"
import * as types from "../constants/mutationTypes"
import router from "../router";
import {
  CREDENTIALS,
} from "../constants"

export default {
  async signUp({ commit }, payload) {
    const {
      status,
      error
    } = await ajax.signUp(payload)
    if (status) {
      commit(types.SIGN_UP)
      await router.push({
        name: "Login"
      })
    } else {
      console.error(error)
      commit(types.SET_ERROR, "Проверьте правильность набранных данных")
    }
  },
  async logIn({ commit }, {
    username,
    password,
  }) {
    const credentials = btoa(username + ":" + password)
    const {
      status,
      error
    } = await ajax.logIn(credentials)
    if (status) {
      commit(types.SET_CREDENTIALS, credentials)
      commit(types.SET_IS_AUTHENTICATED, true)
      localStorage.setItem(CREDENTIALS, credentials)
      await router.push({
        name: "Main"
      })
    } else {
      console.error(error)
      commit(types.SET_ERROR, "Проверьте правильность набранных данных")
    }
  },
  async logOut({ commit }) {
    await ajax.logOut()
    commit(types.SET_CREDENTIALS, "")
    commit(types.SET_IS_AUTHENTICATED, false)
    localStorage.setItem(CREDENTIALS, null)
    await router.push({
      name: "Login"
    })
  }
}