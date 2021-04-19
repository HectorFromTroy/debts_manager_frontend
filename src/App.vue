<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ APP_TITLE }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ APP_TITLE }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
          v-if="isAuthenticated"
          @click="onLogout"
      >
        Выйти
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex"
import {
  APP_TITLE,
} from "./constants";
import * as routes from "./constants/routes"

export default {
  name: "App",
  data: () => ({
    APP_TITLE,
    drawer: null,
    items: [
      { title: 'Зарегистрироваться', icon: 'mdi-registered-trademark', to: routes.SIGNUP },
      { title: 'Войти', icon: 'mdi-login', to: routes.LOGIN },
      { title: 'Мои должники', icon: 'mdi-account-cash', to: routes.MAIN },
      { title: 'Добавить должника', icon: 'mdi-run', to: routes.ADD_DEBTOR },
      { title: 'Добавить долг', icon: 'mdi-cash-100', to: routes.ADD_DEBT },
    ],
  }),
  computed: {
    ...mapState([
      'isAuthenticated',
    ]),
  },
  methods: {
    ...mapActions([
        "logOut",
    ]),
    onLogout() {
      this.logOut()
    },
  }
}
</script>

<style lang="sass">

</style>
