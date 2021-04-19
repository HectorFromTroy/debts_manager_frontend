<template>
  <div>
    <v-col
      cols="12" lg="4" xl="4"
    >
      <v-list
        flat
      >
        <v-list-item
          v-for="debtor in debtors"
          :key="debtor.id"
          @click="goToDebtor(debtor.id)"
        >
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title>{{ debtor.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                @click.stop="deleteDebtor(debtor.id)"
              >
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-col>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from "vuex"
import router from "../router";

export default {
  name: "Main",
  computed: {
    ...mapState([
      "debtors",
    ]),
  },
  mounted() {
    this.getDebtors()
  },
  methods: {
    ...mapActions([
      'getDebtors',
      'deleteDebtor',
    ]),
    async goToDebtor(id) {
      await router.push({
        name: "Debts",
        params: {
          id
        },
      })
    },
  },
}
</script>