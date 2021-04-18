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
    }
}