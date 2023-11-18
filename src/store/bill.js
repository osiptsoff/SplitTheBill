import {defineStore} from "pinia";
import {computed, ref} from "vue";

const useBillStore = defineStore('bill', () => {
    const _bill = ref({});
    const _lastKey = ref(0);

    const bill = computed( () => Object.values(_bill.value) );
    const position = computed( () => (id) => _bill.value[id] );

    function addEmpty() {
        _bill.value[_lastKey.value] = {
            key: _lastKey.value,
            name: '',
            price: null,
            customer: null,
            participants: [],
        };

        _lastKey.value++;
    }

    function remove(position) {
        delete _bill.value[position.key];
    }

    return { _bill, _lastKey, bill, position, addEmpty, remove };
});

export { useBillStore }