<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Подтвердите действие
      </v-card-title>

      <v-card-text v-if="dialogType === 'DELETE'">
        {{ dialogText }}
      </v-card-text>

      <v-card-text v-if="dialogType === 'CLOSE'">
        <v-row class="pt-2">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Дата закрытия"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="modal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-row>

        <v-row>
          <v-textarea
            solo
            v-model="description"
            name="input-7-4"
            label="Описание"
          ></v-textarea>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click.stop="accept">Да</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  data: () => ({
    dialog: false,
    modal: false,
    date: new Date().toISOString().substr(0, 10),
    description: "",
  }),
  props: {
    value: Boolean,
    dialogText: String,
    dialogType: String,
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    accept() {
      this.show = false
      if (this.dialogType === "DELETE")
        this.$emit("agreed")

      if (this.dialogType === "CLOSE") {
        this.$emit("agreed", {
          repayDate: this.date,
          repayDescription: this.description
        })
        this.date = new Date().toISOString().substr(0, 10)
        this.description = ""
      }
    }
  },
}
</script>