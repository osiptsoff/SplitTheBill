import {createPinia} from "pinia";
import {createApp} from 'vue'
import {createVuetify} from "vuetify";
import {router} from "./router/index.js";

import './style.css'
import * as components from '/node_modules/vuetify/lib/components'
import * as directives from '/node_modules/vuetify/lib/directives'
import App from './App.vue'

const pinia = createPinia()
const vuetify = createVuetify( {
    components,
    directives
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(vuetify)

app.mount('#app')
