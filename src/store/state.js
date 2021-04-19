import {
    CREDENTIALS
} from "../constants";

const CREDS = localStorage.getItem(CREDENTIALS);

export default {
    isAuthenticated: !!CREDS && CREDS !== "null",
    isSuccessfullySignedUp: false,
    username: "",
    credentials: CREDS,
    error: "",
    debtors: [],
    debts: [],
    sum: null,
}