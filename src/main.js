import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createApp } from 'vue';
import App from '../frontend/src/App.vue';
import router from '../frontend/src/router';
import store from '../frontend/src/store';

const app = createApp(App);

app.use(Toast)

app.use(router);
app.use(store);

app.mount('#app');
