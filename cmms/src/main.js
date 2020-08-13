import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import router from "./router.js";
import VueCookies from "vue-cookies";
import Vuetify from "vuetify/lib";
import VuetifyConfirm from "vuetify-confirm";
import Toasted from "vue-toasted";
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
        dark: false,
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
Vue.use(Toasted, {
    theme: "bubble",
    position: "top-center",
    duration: 3000,
});

const store = new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        userId: (state) => {
            return state.user.id;
        },
    },
    actions: {
        updateUser(context, userID) {
            let user = {
                id: "",
                new: true,
                nick_name: "",
                avatar: "",
                profile: "",
                communities: [],
                student_id: "",
                real_name: "",
                email: "",
                phone: "",
            };
            let url = "/api/users/" + userID;
            Axios.get(url).then((response) => {
                user.id = userID;
                user.nick_name = response.data.nick_name;
                user.avatar = response.data.avatar;
                user.profile = response.data.profile;
                user.communities = response.data.communities;
                user.student_id = response.data.student_id;
                user.real_name = response.data.real_name;
                user.email = response.data.email;
                user.phone = response.data.phone;
                // set user state
                context.commit("setUser", user);
            });
        },
    },
});

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
