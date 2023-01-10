import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
    theme: {
        themes: {
            light: {
                primary: "#00cdad",
                secondary: "#fff",
                tertiary: "#0f2430",
                fade: "#fff",
                noter: "#eee",
                warning: "#00a9bc",
            },
            dark: {
                primary: "#00cdad",
                secondary: "#0f2430",
                tertiary: "#fff",
                fade: "#0f2430",
                noter: "#0f2430",
                warning: "#00a9bc"
            },
        },
        dark: false
    },
});
