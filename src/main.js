import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import * as VueRouter from "vue-router";

createApp(App).use(router).use(VueRouter).mount("#app");
