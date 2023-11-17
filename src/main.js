import {createPinia} from "pinia";
import {createApp} from 'vue'
import {vuetify} from "./vuetify/index.js";
import {router} from "./router/index.js";

import App from './App.vue';

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
