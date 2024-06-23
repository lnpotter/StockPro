import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import ProductList from '../components/ProductList.vue';
import SupplierList from '../components/SupplierList.vue';
import StockReport from '../components/StockReport.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
  { path: '/products', component: ProductList, meta: { requiresAuth: true } },
  { path: '/suppliers', component: SupplierList, meta: { requiresAuth: true } },
  { path: '/stock-report', component: StockReport, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', redirect: '/products' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
