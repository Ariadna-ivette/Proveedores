import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/home.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Proveedores from './views./Proveedores.vue'
import Almacen from './views./Almacen.vue'
import Articulos from './views./Articulos.vue'
import Inventario from './views./Inventario.vue' 

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


const  routes = [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },

    {
      path: "/proveedores",
      name: 'proveedores',
      component: Proveedores
    },

    {
      path: "/articulos",
      name: "articulos",
      component: Articulos
    },
    
    {
      path: "/almacen",
      name: 'almacen',
      component: Almacen
    },

    {
      path: "/inventario",
      name: 'inventario',
      component: Inventario
    },

    {
      path: '/home',
      name: 'Home',
      component: Home
    },

  ];

const router = new Router ({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
