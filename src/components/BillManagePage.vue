<script setup>
  import {usePeopleStore} from "../store/people.js";
  import {useBillStore} from "../store/bill.js";
  import {computed, ref} from "vue";
  import {useRouter} from "vue-router";

  const peopleStore = usePeopleStore();
  const billStore = useBillStore();
  const router = useRouter();

  const valid = ref(false);

  const people = computed( () => peopleStore.people );
  const bill = computed( () => billStore.bill );

  const emptyFieldRule = value => !!value || 'Поле не должно быть пустым.';
  const priceRule = value => {
    const pattern = /^[1-9][0-9]*$/;
    return pattern.test(value) || 'Введите корректную сумму в цифрах.';
  };
  const nameRule = value => {
    const pattern = /^[а-яА-Я]+$/;
    return pattern.test(value) || 'Название должно состоять из кириллических букв.';
  };

  function addPosition() {
    billStore.addEmpty();
  }
  function removePosition(position) {
    billStore.remove(position);
  }
  function onSubmit() {
    console.log(bill.value)
   // router.push({ name: 'NotFound' });
  }
</script>

<template>
  <v-sheet class="mx-6 my-4" rounded>
    <v-btn :block="true"
           variant="text"
           color="yellow-darken-3"
           @click="addPosition()">
      Добавить позицию
    </v-btn>

    <v-form @submit.prevent="onSubmit">
      <v-list>
        <v-slide-x-transition :group="true">
          <v-list-item v-for="position in bill" :key="position.key">
              <v-row>
                <v-col>
                  <v-text-field density="compact" variant="solo"
                                color="yellow-darken-3"
                                label="Название"
                                hint="Введите название позиции"
                                v-model="position.name"
                                :rules="[emptyFieldRule, nameRule]">
                  </v-text-field>
                </v-col>

                <v-col>
                  <v-text-field density="compact" variant="solo"
                                color="yellow-darken-3"
                                label="Цена"
                                hint="Введите цену"
                                v-model="position.price"
                                :rules="[emptyFieldRule, priceRule]">
                  </v-text-field>
                </v-col>

                <v-col cols="2">
                  <v-btn variant="tonal"  :block="true"
                         color="red-darken-3"
                         @click="removePosition(position)">
                    Удалить
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-slide-group :multiple="true"
                                 v-model="position.participants"
                                 show-arrows>

                    <v-slide-group-item v-for="person in people"
                                        :key="person.key"
                                        v-slot="{ isSelected, toggle }">

                      <v-card @click="toggle" class="mx-5 my-2" v-if=" position.customer && person !== position.customer">
                        <v-avatar :color="isSelected ? 'green-darken-3' :'yellow-darken-3'"
                                  class="text-capitalize">
                          <span class="text-h5 text-capitalize">
                            {{ person.name.charAt(0) }}
                          </span>
                        </v-avatar>

                        {{ person.name }}
                      </v-card>
                    </v-slide-group-item>
                  </v-slide-group>
                </v-col>

                <v-col cols="2">
                  <v-select density="compact"
                            variant="solo"
                            label="Кто платит"
                            :items="people"
                            item-title="name"
                            item-value="key"
                            v-model="position.customer"
                            return-object>
                  </v-select>
                </v-col>
              </v-row>
            <v-divider/>
          </v-list-item>
        </v-slide-x-transition>
      </v-list>

      <v-btn
             :block="true"
             type="submit"
             variant="text"
             color="yellow-darken-3">
        Далее
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>