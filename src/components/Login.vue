<template>
  <div
    class="pa-4"
  >
    <v-form ref="loginForm" lazy-validation>

        <v-row>
          <v-col cols="12" lg="4" xl="4" class="py-1">
            <v-text-field
                v-model="username"
                label="Имя пользователя"
                :rules="isEmptyRule"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="4" xl="4" class="py-0">
            <v-text-field
                v-model="password"
                type="password"
                label="Пароль"
                :rules="isEmptyRule"
            />
          </v-col>
        </v-row>
        <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
        <v-spacer></v-spacer>
        <v-row>
          <v-col class="d-flex" cols="12" lg="4" xl="4">
            <v-btn
                x-large block color="success"
                @click="onSubmit">
              Войти
            </v-btn>
          </v-col>
        </v-row>

    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
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

<style scoped lang="sass">
input
  background-color: aquamarine

button
  background-color: bisque
</style>