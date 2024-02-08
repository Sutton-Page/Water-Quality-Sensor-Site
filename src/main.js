import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//vuefire
import { VueFire, VueFireAuth } from 'vuefire'
import  {firebaseApp}  from './firebaseInit';

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)


app.use(router).use(vuetify)

app.use(VueFire, {

    firebaseApp,
    modules:[
      VueFireAuth(),
    ]

})

app.mount('#app')
