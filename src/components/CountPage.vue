<script setup>
  import {usePeopleStore} from "../store/people.js";
  import {useBillStore} from "../store/bill.js";
  import {computed, onBeforeMount, onMounted, ref} from "vue";

  const peopleStore = usePeopleStore();
  const billStore = useBillStore();

  const billSplit = ref({});

  const totalSum = computed(
      () => Object.values(billSplit.value).reduce( (acc, cur) => acc += cur.paid, 0 )
  );

  function personName(id) {
    return peopleStore.person(id).name;
  }

  //TODO : move into store
  onMounted(() => {
    for(let position of billStore.bill) {
      let customer = billSplit.value[position.customer];
      let separatePrice = position.price / (position.participants.length + 1);

      if(customer === undefined) {
        customer = {
          paid: 0,
          debtors: {},
          borrowers: {},
        };
        billSplit.value[position.customer] = customer;
      }

      customer.paid += +position.price;

      for(let debtor in position.participants) {
        if(customer.debtors[debtor] === undefined)
          customer.debtors[debtor] = { debt : 0 };

        customer.debtors[debtor] += +separatePrice;

        if(billSplit.value[debtor] === undefined)
          billSplit.value[debtor] = {
            paid: 0,
            debtors: {},
            borrowers: {},
          };

        if(billSplit.value[debtor].borrowers[position.customer] === undefined)
          billSplit.value[debtor].borrowers[position.customer] = { borrow : 0 };

        billSplit.value[debtor].borrowers[position.customer].borrow += +separatePrice;
      }
    }
  });
</script>

<template>
  <v-sheet class="mx-6 my-4"
           rounded>
    <v-expansion-panels :multiple="true">
      <v-expansion-panel v-for="(person, key) in billSplit" :key=" 'op-' + key ">
        <v-expansion-panel-title>
          <v-row>
            <v-col cols="1">
              <v-avatar color="yellow-darken-3" class="text-capitalize">
                <span class="text-h5 text-capitalize">{{ personName(key).charAt(0) }}</span>
              </v-avatar>
            </v-col>
            <v-col class="text-h5">
              {{ personName(key) }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-expansion-panels :multiple="true">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-row>
                  <v-col class="text-h6">
                    Потрачено
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                {{ person.paid }}
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-row>
                  <v-col class="text-h6">
                    Должники
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-row v-for="(debtor, debtorKey) in person.debtors" justify="center">
                  <v-col>
                    {{ personName(debtorKey) }}
                  </v-col>
                  <v-col>
                    {{ debtor.debt }}
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-row>
                  <v-col class="text-h6">
                    Кому должны
                  </v-col>
                </v-row>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <v-row v-for="(borrower, borrowerKey) in person.borrowers" justify="center">
                  <v-col>
                    {{ personName(borrowerKey) }}
                  </v-col>
                  <v-col>
                    {{ borrower.borrow }}
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card  class="ma-4 text-center text-yellow-darken-3">
      <v-card-title class="text-h5">
        Всего потрачено
      </v-card-title>
      <v-card-text class="text-h6">
        {{ totalSum }}
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<style scoped>

</style>