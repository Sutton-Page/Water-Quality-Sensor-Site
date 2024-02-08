import { createRouter, createWebHistory } from 'vue-router'
import Display from '../components/Display.vue'
import Map from '../components/Map.vue'
import upload from '../components/UploadPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Map
    },

    {
      path:'/upload',
      name:'upload',
      component: upload
    },
    
    {
      path: '/data/:location_id', 
      component: Display
    },


  ]
})

export default router
