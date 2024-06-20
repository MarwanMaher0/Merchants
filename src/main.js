import { createApp } from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import VueSweetalert2 from "vue-sweetalert2";
import * as VueGoogleMaps from "vue3-google-map";
import VueYoutube from "vue3-youtube";
import Vue3Toastify from "vue3-toastify";
import { vMaska } from "maska";
import "./interceptors/axios";

import vco from "v-click-outside";

import router from "./router";
import store from "@/state/store";
import i18n from "./i18n";

import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "@/assets/scss/app.scss";

import { initFirebaseBackend } from "./helpers/firebase/authUtils";

import { configureFakeBackend } from "./helpers/fakebackend/fake-backend";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_VUE_APP_APIKEY,
  authDomain: import.meta.env.VITE_VUE_APP_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_VUE_APP_VUE_APP_DATABASEURL,
  projectId: import.meta.env.VITE_VUE_APP_PROJECTId,
  storageBucket: import.meta.env.VITE_VUE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_VUE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_VUE_APP_APPId,
  measurementId: import.meta.env.VITE_VUE_APP_MEASUREMENTID,
};

if (import.meta.env.VITE_VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else {
  configureFakeBackend();
}

const app = createApp(App);
app.config.productionTip = false;
app.use(VueYoutube);
app.use(BootstrapVue);
app.use(vco);
app.use(VueSweetalert2);
app.use(VueGoogleMaps);
app.use(VueApexCharts);
app.use(router);
app.use(store);
app.use(i18n);
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.directive("maska", vMaska);
app.mount("#app");
