import {createRouter, createMemoryHistory} from "vue-router";
import PeopleManagePage from "../components/PeopleManagePage.vue";
import NotFoundPage from "../components/NotFoundPage.vue";
import BillManagePage from "../components/BillManagePage.vue";
import CountPage from "../components/CountPage.vue";

const routes =  [
    {
        name: 'Root',
        path: '/',
        redirect: { name: 'PeopleManage' },
    },
    {
        name: 'PeopleManage',
        path: '/people',
        component: PeopleManagePage,
    },
    {
        name: 'BillManage',
        path: '/bill',
        component: BillManagePage,
    },
    {
        name: 'Count',
        path: '/count',
        component: CountPage,
    },
    {
        name: 'NotFound',
        path: '/:path(.*)*',
        component: NotFoundPage,
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export {router};