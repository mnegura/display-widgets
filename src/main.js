import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import Notifications from "@kyvg/vue3-notification";

createApp(App).component("box-spinner", SpinnerComponent).use(router).use(store).use(Notifications).mount("#app");
