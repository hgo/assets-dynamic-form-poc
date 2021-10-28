import Vue, { VNode } from "vue";
import App from "./App.vue";
import VueCompositionAPI from "@vue/composition-api";
import "@jsonforms/vue2-vanilla/vanilla.css";
import "./assets/grid.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VJsoneditor from "v-jsoneditor";

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
Vue.use(VJsoneditor);

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(App)
}).$mount("#app");
