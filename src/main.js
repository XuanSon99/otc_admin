import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./i18n";
import vuetify from './plugins/vuetify'
import AnimatedNumber from "animated-number-vue";
import '@fortawesome/fontawesome-free/css/all.min.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios'
import './assets/css/style.css'
import './assets/css/responsive.css'
import VueApexCharts from 'vue-apexcharts'
import VueExpandableImage from 'vue-expandable-image'
Vue.use(VueExpandableImage)

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.component('AnimatedNumber', AnimatedNumber)

Vue.config.productionTip = false
// Vue.config.silent = true
// Vue.config.errorHandler = function () {
// }
// Vue.config.warnHandler = function () {
// }

Vue.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});

Vue.prototype.axios = axios
Vue.prototype.image = function (url) {
    return process.env.VUE_APP_BASE_URL + "/storage" + url;
}

Vue.prototype.CallAPI = (method, url, data, callResponse, callError) => {
    const config = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
    };
    const baseurl = process.env.VUE_APP_BASE_URL
    const requestUrl = `${baseurl}/api/${url}`;
    switch (method) {
        case "post":
            axios.post(requestUrl, data, config)
                .then((response) => {
                    callResponse(response)
                })
                .catch((error) => {
                    // console.clear();
                    try {
                        callError(error)
                    } catch (error) {
                    }
                })
            break;
        case "get":
            axios.get(requestUrl, config)
                .then((response) => {
                    callResponse(response)
                })
                .catch((error) => {
                    // console.clear();
                    try {
                        callError(error)
                    } catch (error) {
                    }
                })
            break;
        case "put":
            axios.put(requestUrl, data, config)
                .then((response) => {
                    callResponse(response)
                })
                .catch((error) => {
                    // console.clear();
                    try {
                        callError(error)
                    } catch (error) {
                    }
                })
            break;
        case "delete":
            axios.delete(requestUrl, config)
                .then((response) => {
                    callResponse(response)
                })
                .catch((error) => {
                    // console.clear();
                    try {
                        callError(error)
                    } catch (error) {
                    }
                })
            break;
    }
}

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')
