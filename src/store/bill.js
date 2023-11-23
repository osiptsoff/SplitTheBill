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

    function _balance(billSplit) {
        for(let personKey in billSplit) {
            let person = billSplit[personKey]

            for(let debtor in person.debtors) {
                if(person.borrowers[debtor] === undefined)
                    continue;

                if(person.debtors[debtor].debt > person.borrowers[debtor].borrow) {
                    person.debtors[debtor].debt -= person.borrowers[debtor].borrow;
                    delete person.borrowers[debtor];
                } else if(person.debtors[debtor].debt < person.borrowers[debtor].borrow) {
                    person.borrowers[debtor].borrow -= person.debtors[debtor].debt;
                    delete person.debtors[debtor];
                } else {
                    delete person.borrowers[debtor];
                    delete person.debtors[debtor];
                }
            }
        }
    }

    function split() {
        let billSplit = {};

        for(let position of bill.value) {
            let customer = billSplit[position.customer];
            let separatePrice = position.price / position.participants.length;

            if(customer === undefined) {
                customer = {
                    paid: 0,
                    debtors: {},
                    borrowers: {},
                };
                billSplit[position.customer] = customer;
            }

            for(let participant of position.participants) {
                billSplit[position.customer].paid += separatePrice;

                if(customer.debtors[participant] === undefined)
                    customer.debtors[participant] = { debt : 0 };

                customer.debtors[participant].debt += +separatePrice;

                if(billSplit[participant] === undefined)
                    billSplit[participant] = {
                        paid: 0,
                        debtors: {},
                        borrowers: {},
                    };

                if(billSplit[participant].borrowers[position.customer] === undefined)
                    billSplit[participant].borrowers[position.customer] = { borrow : 0 };

                billSplit[participant].borrowers[position.customer].borrow += +separatePrice;
            }
        }

        _balance(billSplit);

        return billSplit;
    }

    return { _bill, _lastKey, bill, position, split, addEmpty, remove };
});

export { useBillStore }