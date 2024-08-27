import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import store from '@/store';


const router = createRouter({
 history: createWebHistory(),
 routes: [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true}
  },
 ],
});


router.beforeEach((to, from, next) => {
  const loggedIn = !!store.state.accessToken;

  
  if(to.meta.requiresAuth){
    if(loggedIn){
      next();
    }else{
      next('/');
    }
  }else{
    if(loggedIn && to.path === '/'){
      next('/dashboard')
    }else{
      next();
    }
  }
})

export default router
