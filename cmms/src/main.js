import Vue from "vue";
import App from "./App.vue";
// import vuetify from "./plugins/vuetify";
import router from "./router.js";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify, {
    icons: {
        iconfont: "mdi",
    },
});

Vue.config.productionTip = false;

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
                background: "#EEEEEE"
            },
        },
    },
};

new Vue({
    vuetify: new Vuetify(opts),
    router,
    render: (h) => h(App),
}).$mount("#app");
