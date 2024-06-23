import { createStore } from 'vuex';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const store = createStore({
  state: {
    products: [],
    suppliers: [],
    user: null,
    stockReport: [],
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_SUPPLIERS(state, suppliers) {
      state.suppliers = suppliers;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_STOCK_REPORT(state, stockReport) {
      state.stockReport = stockReport;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    CLEAR_AUTH_DATA(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('/api/products');
        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchSuppliers({ commit }) {
      try {
        const response = await axios.get('/api/suppliers');
        commit('SET_SUPPLIERS', response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
      }
    },
    async fetchStockReport({ commit }) {
      try {
        const response = await axios.get('/api/stock-report');
        commit('SET_STOCK_REPORT', response.data);
      } catch (error) {
        console.error('Error fetching stock report:', error);
      }
    },
    async addProduct({ dispatch }, product) {
      try {
        await axios.post('/api/products', product);
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    async addSupplier({ dispatch }, supplier) {
      try {
        await axios.post('/api/suppliers', supplier);
        dispatch('fetchSuppliers');
      } catch (error) {
        console.error('Error adding supplier:', error);
      }
    },
    async register({ commit }, credentials) {
      try {
        const response = await axios.post('/api/auth/register', credentials);
        const { token, user } = response.data;
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
        return { token, user };
      } catch (error) {
        console.error('Register error:', error.response.data.message);
        throw new Error(error.response.data.message);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/auth/login', credentials);
        const { token, user } = response.data;
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
        return { token, user };
      } catch (error) {
        console.error('Login error:', error.response.data.message);
        throw new Error(error.response.data.message);
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH_DATA');
    },
  },
  getters: {
    products: (state) => state.products,
    suppliers: (state) => state.suppliers,
    user: (state) => state.user,
    stockReport: (state) => state.stockReport,
    isAuthenticated: (state) => !!state.token,
  },
});

export default store;
