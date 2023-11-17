import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const usePeopleStore = defineStore('people', () => {
    const _people = ref({});
    const _lastKey = ref(0);

    const people = computed(() => Object.values(_people.value));
    const person = computed( () => (id) => _people.value[id] );

    function add(name) {
        _people.value[_lastKey.value] = {
            name,
            key : _lastKey.value
        };

        _lastKey.value++;
    }

    function remove(person) {
        delete _people.value[person.key];
    }

    return { _people, _lastKey, people, person, add, remove };
} );