<template>
  <div class="supplier-list-container">
    <b-card v-if="!loading">
      <h2>Supplier List</h2>
      <ul class="supplier-list">
        <li v-for="supplier in suppliers" :key="supplier._id" class="supplier-item">
          {{ supplier.name }}
        </li>
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
    const suppliers = computed(() => store.getters.suppliers);
    const loading = false;
    let error = '';

    onMounted(async () => {
      try {
        await store.dispatch('fetchSuppliers');
      } catch (err) {
        error = `Failed to fetch suppliers: ${err.message}`;
      }
    });

    return {
      suppliers,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.supplier-list-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Roboto', sans-serif;
}

.b-card {
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  animation: fadeInUp 0.5s ease-in-out;
}

.error-card {
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(255, 0, 0, 0.2);
  background-color: #ffebee;
  animation: fadeInUp 0.5s ease-in-out;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
}

.supplier-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.supplier-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.supplier-item:hover {
  background-color: #f9f9f9;
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
