import Vue from 'vue'
import VueMaterial from 'vue-material'
//import Vuetify from "vuetify/lib";
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue'
import router from './router'
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

import 'leaflet/dist/leaflet.css';


import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

/*const { VuetifyLoaderPlugin } = require('vuetify-loader')

exports.plugins.push(
  new VuetifyLoaderPlugin()
)*/

//
//Vue.http.headers.common['Access-Control-Allow-Origin'] = true
//Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
//Vue.http.options.emulateJSON = true
//
//Vue.use(Vuetify);

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./utils/auth.js";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.prototype.$api_url = "http://localhost:5000"

Vue.use(VueMaterial)
Vue.use(Ionic);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
