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
      commit(types.SET_ERROR, "Пользователь с таким логином уже существует")
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
  },
  async getDebtors({ commit }) {
    const {
      status,
      data,
      error
    } = await ajax.getDebtors()
    if (status) {
      commit(types.SET_DEBTORS, data)
    } else {
      console.error(error)
      commit(types.SET_ERROR, "Не удалось выполнить запрос")
    }
  },
  async deleteDebtor({ commit }, debtorId) {
    const {
      status,
      error
    } = await ajax.deleteDebtor(debtorId)
    if (status) {
      commit(types.DELETE_DEBTOR, debtorId)
    } else {
      console.error(error)
      commit(types.SET_ERROR, error)
    }
  },
  async addDebtor({ commit }, name) {
    const {
      status,
      error,
    } = await ajax.addDebtor(name)
    if (status) {
      await router.push({
        name: "Main"
      })
    } else {
      commit(types.SET_ERROR, error)
    }
  },
  async getDebts({ commit }, payload) {
    const {
      status,
      data,
      error
    } = await ajax.getDebts(payload)
    if (status) {
      if (payload.isAdd) {
        commit(types.ADD_DEBTS, data.debts)
      } else {
        commit(types.SET_DEBTS, data.debts)
      }
      commit(types.SET_SUM, data.sum)
      return data.debts.length === 0
    } else {
      commit(types.SET_ERROR, error)
    }
  },
  async deleteDebts({ commit }, debts) {
    const {
      status,
      error
    } = await ajax.deleteDebts(debts)
    if (!status) {
      commit(types.SET_ERROR, error)
    }
  },
  async repayDebts({ commit }, payload) {
    const {
      status,
      error
    } = await ajax.repayDebts(payload)
    if (!status) {
      commit(types.SET_ERROR, error)
    }
  },
  async addDebt({ commit }, payload) {
    const {
      status,
      error
    } = await ajax.addDebt(payload)
    if (status) {
      await router.push({
        name: "Main"
      })
    } else {
      commit(types.SET_ERROR, error)
    }
  }
}