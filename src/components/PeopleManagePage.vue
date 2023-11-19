<script setup>
  import {usePeopleStore} from "../store/people.js";
  import {computed, ref} from "vue";
  import {useRouter} from "vue-router";

  const validation = ref([
      value => !!value || 'Введите имя.',
      value => {
        const pattern = /^[А-Я]( ?[а-я])+$/;
        return pattern.test(value) ||
            `Имя должно начинаться с заглавной буквы, состоять из кириллических букв и пробелов.
             Пробелы в начале или конце недопустимы.`;
      }
  ]);
  const valid = ref(false);

  const store = usePeopleStore();

  const router = useRouter();

  const people = computed(() => store.people);

  function addPerson(name) {
    store.add(name);
  }
  function removePerson(person) {
    store.remove(person);
  }

  function onSubmit() {
    router.push({ name : 'BillManage' });
  }
</script>

<template>
  <v-sheet class="mx-6 my-4"
           rounded>
    <v-btn :block="true"
           variant="text"
           color="yellow-darken-3"
           @click="addPerson('')">
      Добавить человека
    </v-btn>
    <v-divider></v-divider>

    <v-form @submit.prevent="onSubmit" v-model="valid">
      <v-list>
        <v-slide-x-transition :group="true">
          <v-list-item v-for="person in people" :key="person.key">
            <template v-slot:prepend>
              <v-avatar color="yellow-darken-3" class="text-capitalize">
                <span class="text-h5 text-capitalize">{{ person.name.charAt(0) }}</span>
              </v-avatar>
            </template>

            <v-text-field
              color="yellow-darken-3"
              label="Имя"
              hint="Введите имя участника"
              v-model="person.name"
              :rules="validation"/>

            <template v-slot:append>
              <v-btn :block="true"
                     variant="text"
                     color="red-darken-3"
                     @click="removePerson(person)">
                Удалить
              </v-btn>
            </template>
          </v-list-item>
        </v-slide-x-transition>
      </v-list>

      <v-btn :disabled="!valid || !people.length"
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