import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import server from './service/service';
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$server = server;
Vue.use(elementUi);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map