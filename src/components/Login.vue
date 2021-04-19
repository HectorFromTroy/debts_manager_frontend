<template>
  <div
    class="pa-4"
  >
    <v-form
      ref="loginForm"
      lazy-validation
      class="d-flex flex-column align-center"
    >
      <v-col cols="12" lg="4" xl="4" class="py-1">
        <v-text-field
          v-model="username"
          label="Логин"
          :rules="isEmptyRule"
        />
      </v-col>

      <v-col cols="12" lg="4" xl="4" class="py-0">
        <v-text-field
          v-model="password"
          type="password"
          label="Пароль"
          :rules="isEmptyRule"
        />
      </v-col>

      <v-col class="d-flex red--text font-weight-bold" cols="12" sm="6" xsm="12">
        {{ error }}
      </v-col>
      <v-spacer></v-spacer>

      <v-col class="d-flex" cols="12" lg="4" xl="4">
        <v-btn
          x-large block color="success"
          @click="onSubmit">
          Войти
        </v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex"
import moment from "moment"

export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    showPassword: false,
    isEmptyRule: [
        value => !!value.trim() || 'Заполните поле',
    ],
  }),
  computed: {
    ...mapState([
      'error',
    ]),
  },
  created() {
    console.log(moment().format("YYYY-MM-DD"))
  },
  methods: {
    ...mapActions([
      "logIn"
    ]),
    onSubmit() {
      if (this.$refs.loginForm.validate()) {
        this.logIn({
          username: this.username,
          password: this.password,
        })
      }
    },
  }
}
</script>