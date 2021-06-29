import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import ViewPayment from '@/components/ViewPayment.vue'
import AddCylinder from '@/components/AddCylinder.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/addcylinder',
        name: 'addcylinder',
        component: AddCylinder
    },
    {
        path: '/:user_id',
        name: 'viewpayment',
        component: ViewPayment
    }
]

const router = new VueRouter({
    routes
})

export default router