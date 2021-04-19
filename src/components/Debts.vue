<template>
  <div>
    <v-list
      two-line
      style="height: calc(100vh - 160px)"
      class="overflow-y-auto"
    >
      <div  v-for="(debt, index) in debts" :key="debt.id">
        <v-list-item>
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                :value="isSelected(debt.id)"
                @click="toggleSelecting(debt.id)"
              />
            </v-list-item-action>

            <v-list-item-content class="pa-0">
              <v-list-item-content class="pa-2">
                <v-list-item-title v-text="debt.date"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="debt.description"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content class="pa-2">
                <v-list-item-title v-text="debt.repayDate"></v-list-item-title>

                <v-list-item-subtitle
                  class="text--primary"
                  v-text="debt.repayDescription"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item-content>


            <v-list-item-action>
              <v-list-item-action-text v-text="debt.sum" class="font-weight-black title"/>

              <v-icon
                v-if="!debt.paidOff"
                color="grey lighten-1"
              >
                mdi-star-outline
              </v-icon>

              <v-icon
                v-else
                color="yellow darken-3"
              >
                mdi-star
              </v-icon>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider v-if="debts.length - 1 > index" :key="index"></v-divider>
      </div>
    </v-list>
    <div
      style="height: 100px; border-top: 1px solid grey;"
      class="d-flex justify-space-around align-center"
    >
      <v-btn
        depressed
        :disabled="selected.length === 0"
        color="primary"
        @click="showDialog('CLOSE')"
      >
        Закрыть
      </v-btn>

      <v-btn
        depressed
        :disabled="selected.length === 0"
        color="primary"
        @click="showDialog('DELETE')"
      >
        Удалить
      </v-btn>

      <Dialog
        v-model="dialog"
        v-on:agreed="agreed"
        :dialog-text="dialogText"
        :dialog-type="dialogType"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from "vuex"
import Dialog from "./Dialog";

export default {
  name: "Debts",
  components: {
    Dialog,
  },
  props: {
    id: {
      required: true,
    }
  },
  data: () => ({
    dialog: false,
    active: false,
    page: 0,
    selected: [],
    dialogType: "",
    dialogText: "",
  }),
  mounted() {
    this.getDebts({
      debtorId: this.id,
      active: this.active,
      page: this.page++
    })
  },
  computed: {
    ...mapState([
      "debts",
      "sum",
    ]),
  },
  methods: {
    ...mapActions([
      "getDebts",
      "deleteDebts",
      "repayDebts",
    ]),
    isSelected(id) {
      return this.selected.includes(id)
    },
    toggleSelecting(id) {
      const index = this.selected.findIndex(selId => selId === id)
      if (index === -1) {
        this.selected.push(id)
      } else {
        this.selected.splice(index, 1)
      }
    },
    showDialog(type) {
      switch (type) {
        case "CLOSE":
          this.dialogType = "CLOSE"
          this.dialog = true
          this.dialogText = "Вы действительно хотите закрыть долги?"
          break
        case "DELETE":
          this.dialogType = "DELETE"
          this.dialog = true
          this.dialogText = "Вы действительно хотите удалить долги?"
          break
      }
    },
    async agreed(payload) {
      switch (this.dialogType) {
        case "CLOSE":
          await this.repayDebts({
            debtIds: this.selected,
            ...payload,
          })
          break
        case "DELETE":
          await this.deleteDebts(this.selected)
          break
      }
      this.selected = []
      this.page = 0
      this.getDebts({
        debtorId: this.id,
        active: this.active,
        page: 0,
      })
    },
  },
}
</script>