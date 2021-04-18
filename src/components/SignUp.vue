<template>
  <div class="pa-4">
    <v-form
      v-model="valid"
      ref="registerForm"
      lazy-validation
      class="d-flex flex-column align-center"
    >
      <v-col cols="12" lg="4" xl="4" class="py-1">
        <v-text-field
          v-model="name"
          label="Имя"
          :rules="[registerRules.isEmpty]"
        />
      </v-col>
      <v-col cols="12" lg="4" xl="4" class="py-0">
        <v-text-field
          v-model="username"
          label="Логин"
          :rules="[registerRules.isEmpty, registerRules.min]"
        />
      </v-col>

      <v-col cols="12" lg="4" xl="4" class="py-0">
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Пароль"
          :rules="[registerRules.isEmpty, registerRules.min]"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="togglePasswordShow"
        />
      </v-col>

      <v-col cols="12" lg="4" xl="4" class="py-0">
        <v-text-field
          v-model="verifyPassword"
          :type="showPassword ? 'text' : 'password'"
          label="Подтверждение пароля"
          :rules="[registerRules.isEmpty, passwordMatch]"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="togglePasswordShow"
        />
      </v-col>

      <v-col class="d-flex" cols="12" sm="6" xsm="12"></v-col>
      <v-spacer></v-spacer>

      <v-col class="d-flex" cols="12" lg="4" xl="4">
        <v-btn
          x-large block color="success"
          :disabled="!valid"
          @click="onSubmit"
        >
          Зарегистрироваться
        </v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  name: "SignUp",
  data: () => ({
    valid: false,
    username: "",
    password: "",
    verifyPassword: "",
    name: "",
    showPassword: false,
    registerRules: {
      isEmpty: value => !!value.trim() || "Заполните поле",
      min: value => (value && value.length >= 4) || "Минимум 4 символа",
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verifyPassword || "Пароли не совпадают";
    }
  },
  methods: {
    ...mapActions([
        "signUp"
    ]),
    onSubmit() {
      if (this.$refs.registerForm.validate()) {
        this.signUp({
          username: this.username,
          password: this.password,
          name: this.name,
        })
      }
    },
    togglePasswordShow() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>