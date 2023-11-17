import {createRouter, createWebHistory} from "vue-router";
import PeopleManagePage from "../components/PeopleManagePage.vue";
import NotFoundPage from "../components/NotFoundPage.vue";

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
        name: 'NotFound',
        path: '/:path(.*)*',
        component: NotFoundPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export {router};