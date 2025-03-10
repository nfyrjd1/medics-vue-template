import { createMedicsComponents } from '@medics/medics-vue-components';
import '@medics/medics-vue-components/styles.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './router';
import { RIGHTS } from './types';

const app = createApp(App);

app.use(createPinia());

app.use(
  createMedicsComponents({
    right: {
      rights: RIGHTS,
    },
  }),
);

app.use(router);

app.mount('#app');
