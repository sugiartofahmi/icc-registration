import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./index.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

createApp(App).use(router).mount("#app");
