import { createRouter, createWebHistory } from 'vue-router';

const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')
const Charts = () => import('@/views/home/Charts.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', name: 'home', component: Home, redirect: 'charts',
            children: [
                {
                    path: 'charts',
                    name: 'charts',
                    component: Charts
                }
            ]
        },
        { path: '/login', name: 'login', component: Login },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('userinfo')) {
        next()
    } else {
        if (to.name === 'home') {
            next({ name: 'login' })
        } else {
            next()
        }
    }
})

export default router