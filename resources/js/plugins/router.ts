import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Products',
        component: () => import('@/pages/Product.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
