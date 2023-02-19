import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/user/:id',
    name: 'Infomation',
    component: () => import('../views/Infomation.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/Post.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import('../views/CreatePost.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("access_token")) next({ name: 'Home' })
      next()
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.getItem("access_token")) next({ name: 'Login' })
  next()
})

export default router
