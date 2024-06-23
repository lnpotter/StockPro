<template>
  <div class="product-list-container">
    <b-card v-if="!loading">
      <h2>Product List</h2>
      <ul>
        <li v-for="product in products" :key="product._id">{{ product.name }}</li>
      </ul>
    </b-card>
    <b-card v-else>
      <p>Loading...</p>
    </b-card>
    <b-card v-if="error" class="error-card">
      <p>{{ error }}</p>
    </b-card>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const products = computed(() => store.getters.products);
    const loading = false;
    let error = '';

    onMounted(async () => {
      try {
        await store.dispatch('fetchProducts');
      } catch (err) {
        error = `Failed to fetch products: ${err.message}`;
      }
    });

    return {
      products,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.product-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Roboto', sans-serif;
}

.b-card {
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  animation: fadeInUp 0.5s ease-in-out;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.error-card {
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(255, 0, 0, 0.2);
  background-color: #ffebee;
  animation: fadeInUp 0.5s ease-in-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
