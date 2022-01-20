import { createStore } from "vuex";
import { dashboard } from "./modules/dashboard.module.js";
import { visibility } from "./modules/visibility.module.js";

const store = createStore({
  modules: {
    dashboard,
    visibility
  }
});

export default store;
