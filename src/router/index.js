import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    name: 'user',
    component: ()=>import('../views/user'),
    meta :{
      layout : 'empty',
      auth : true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin.vue'),
    meta :{
      layout : 'admin',
      auth : true,
      isAdmin : true
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
    meta :{
      layout : 'empty'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
// router.beforeEach((to, from, next) =>{
//   const requiredAuth = to.meta.auth;
// //  const isAdmin = to.meta.isAdmin
//   if(requiredAuth && store.getters.isAuth) {
//     next()
//   } else if(requiredAuth && !store.getters.isAuth) {
//     next('/login?message=auth')
//   }
//   else {
//     next()
//   }
// })
router.beforeEach((to, from, next) => {

  const requiredAuth = to.meta.auth;
    if(requiredAuth && store.getters.isAuth) {
    next();
  } else if (requiredAuth && !store.getters.isAuth) { 
    next('/login?message=auth');
  } else {
    next();
  }
})

export default router



