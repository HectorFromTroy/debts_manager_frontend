<template>
  <div>
    <v-col
      cols="12" lg="4" xl="4"
    >
      <v-text-field
        v-model="name"
        label="Имя должника"
        solo
      ></v-text-field>
    </v-col>
    <v-col
      cols="12" lg="4" xl="4"
    >
      <v-btn
        depressed
        x-large block
        color="primary"
        @click="addDebtor(name)"
      >
        Добавить
      </v-btn>
    </v-col>
  </div>
</template>

<script>
import {
  mapActions
} from "vuex"
export default {
  name: "AddDebtor",
  data: () => ({
    name: "",
  }),
  methods: {
    ...mapActions([
      "addDebtor",
    ]),
  },
}
</script>

<style scoped>

</style>