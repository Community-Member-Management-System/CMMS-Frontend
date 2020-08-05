import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import router from "./router.js";
import VueCookies from "vue-cookies";
import Vuetify from "vuetify/lib";
import VuetifyConfirm from "vuetify-confirm";
import Toasted from 'vue-toasted';
import Vuex from "vuex";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import DatetimePicker from "vuetify-datetime-picker";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import App from "./App.vue";

Vue.use(Vuex);
Vue.use(VueAxios, Axios);
Vue.use(VueCookies);
Vue.use(mavonEditor);
Vue.use(DatetimePicker);

Vue.use(Vuetify, {
    icons: {
        iconfont: "mdi",
    },
});

Vue.config.productionTip = false;

// global navigation guards (before)
router.beforeEach((to, from, next) => {
    if (router.app.$cookies.get("login") === "true") {
        if (to.name === "Login") next({ path: "/home" });
        else {
            next();
        }
    } else {
        if (to.name === "Login" || to.meta.needAuth === false) next();
        else next({ path: "/" });
    }
});

// TODO: dark theme
const opts = {
    theme: {
        themes: {
            light: {
                primary: "#03a9f4",
                secondary: "#009688",
                accent: "#9c27b0",
                error: "#f44336",
                warning: "#ff5722",
                info: "#607d8b",
                success: "#4caf50",
                background: "#EEEEEE",
            },
        },
    },
};

const vuetify = new Vuetify(opts);
Vue.use(VuetifyConfirm, { vuetify });
Vue.use(Toasted);

new Vue({
    vuetify,
    router,
    render: (h) => h(App),
}).$mount("#app");
