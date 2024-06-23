<template>
  <div class="stock-report-container">
    <b-card>
      <h2>Stock Report</h2>
      <ul>
        <li v-for="entry in stockReport" :key="entry._id">
          {{ entry.product.name }}: {{ entry.quantity }} ({{ entry.type }})
        </li>
      </ul>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['stockReport']),
  },
  created() {
    this.fetchStockReport();
  },
  methods: {
    ...mapActions(['fetchStockReport']),
  },
};
</script>

<style scoped>
.stock-report-container {
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
