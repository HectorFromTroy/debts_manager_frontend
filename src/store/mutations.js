import * as types from "../constants/mutationTypes"

export default {
    [types.SIGN_UP](state) {
        state.isSuccessfullySignedUp = true;
    },
    [types.SET_CREDENTIALS](state, credentials) {
        state.credentials = credentials
    },
    [types.SET_IS_AUTHENTICATED](state, value) {
        state.isAuthenticated = value
    },
    [types.SET_ERROR](state, error) {
        state.error = error
    },
    [types.SET_DEBTORS](state, debtors) {
        state.debtors = debtors
    },
    [types.DELETE_DEBTOR](state, debtorId) {
        state.debtors = state.debtors.filter(debtor => debtor.id !== debtorId)
    },
    [types.SET_DEBTS](state, debts) {
        state.debts = debts
    },
    [types.SET_SUM](state, sum) {
        state.sum = sum
    }
}