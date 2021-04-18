<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSubmit">
      <input
          type="text"
          v-model="username"
      >
      <input
          type="text"
          v-model="name"
      >
      <input
          type="text"
          v-model="password"
      >
      <button

      >
        sign up
      </button>
    </form>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  name: "SignUp",
  data: () => ({
    username: "",
    password: "",
    name: "",
  }),
  methods: {
    ...mapActions([
        "signUp"
    ]),
    onSubmit() {
      console.log("sign up click")
      this.signUp({
        username: this.username,
        password: this.password,
        name: this.name,
      })
    }
  }
}
</script>

<style scoped>

</style>