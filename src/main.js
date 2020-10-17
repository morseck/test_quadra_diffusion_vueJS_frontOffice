import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';

Vue.use(VueResource)

Vue.config.productionTip = false

Vue.http.options.root = 'https://us-central1-test-quadra-diffusion.cloudfunctions.net/app/api/'; //Injections de facon flobal notre url racine

//creation d'un intersepteur pour gerer le systeme de loading
Vue.http.interceptors.push((request, next)=>{
  next((response)=>{
    if (request.after){
      request.after.call(this, response)
    }
  })
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
