<template>
  <div>
    <v-form
      v-model="valid"
      ref="addDebtFrom"
      lazy-validation
    >
      <v-col
        cols="12" lg="4" xl="4"
      >
        <div
          v-if="isBadValidation"
          style="color: red;"
        >Выберите хотя бы одного должника</div>
        <v-list
          flat
          :rules="[addDebtRules.isEmptyDebtors]"
        >
          <v-subheader>Выберите должников</v-subheader>
          <v-list-item
            v-for="debtor in debtors"
            :key="debtor.id"
          >
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox
                  :value="isSelected(debtor.id)"
                  @click="toggleSelecting(debtor.id)"
                />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ debtor.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list>

        <v-text-field
          type="number"
          v-model="sum"
          :rules="[addDebtRules.isEmpty]"
          label="Сумма долга"
        ></v-text-field>

        <v-checkbox
          v-model="divide"
          label="Поделить введенную сумму на всех?"
        ></v-checkbox>

        <div>
          <span>Каждый должен по:</span>
          <div class="font-weight-bold ">{{ sumOnEach }}</div>
        </div>

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
              label="Дата"
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

        <v-textarea
          solo
          v-model="description"
          name="input-7-4"
          label="Описание"
        ></v-textarea>

        <v-btn
          x-large block color="success"
          :disabled="!valid"
          @click="onAddDebt"
        >
          Добавить долг
        </v-btn>

      </v-col>
    </v-form>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from "vuex"

export default {
  name: "AddDebt",
  data: () => ({
    valid: false,
    isBadValidation: false,
    selectedDebtors: [],
    sum: null,
    divide: false,
    modal: false,
    date: new Date().toISOString().substr(0, 10),
    description: "",
  }),
  computed: {
    ...mapState([
      "debtors",
    ]),
    addDebtRules() {
      const self = this;
      return {
        isEmptyDebtors: () => self.selectedDebtors.length > 0 || "Выберите должника",
        isEmpty: value => !!value || "Заполните поле",
      }
    },
    sumOnEach() {
      return Math.round( this.divide ? this.sum / this.selectedDebtors.length : this.sum )
    },
  },
  mounted() {
    if (this.debtors.length === 0) {
      this.getDebtors()
    }
  },
  methods: {
    ...mapActions([
      "getDebtors",
      "addDebt"
    ]),
    isSelected(id) {
      return this.selectedDebtors.includes(id)
    },
    toggleSelecting(id) {
      const index = this.selectedDebtors.findIndex(selId => selId === id)
      if (index === -1) {
        this.selectedDebtors.push(id)
      } else {
        this.selectedDebtors.splice(index, 1)
      }
    },
    onAddDebt() {
      if (this.selectedDebtors.length === 0) {
        this.isBadValidation = true
        return
      }
      if (this.$refs.addDebtFrom.validate()) {
        const date = new Date(this.date)
        date.setMinutes(Math.floor(Math.random() * 60))
        this.addDebt({
          debtorIds: this.selectedDebtors,
          sum: this.sumOnEach,
          description: this.description,
          date
        })
      }
    },
  },
}
</script>