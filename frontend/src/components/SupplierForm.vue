<template>
  <div class="supplier-form-container">
    <b-card class="card">
      <h2>Add Supplier</h2>
      <form @submit.prevent="addSupplier">
        <b-form-group label="Name:" label-for="name">
          <b-form-input id="name" v-model="supplier.name" placeholder="Enter supplier name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Contact Info:" label-for="contactInfo">
          <b-form-input id="contactInfo" v-model="supplier.contactInfo" placeholder="Enter contact information" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Add Supplier</b-button>
      </form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      supplier: {
        name: '',
        contactInfo: '',
      },
    };
  },
  methods: {
    ...mapActions(['addSupplier']),
    addSupplier() {
      this.$store.dispatch('addSupplier', this.supplier);
      this.supplier = {
        name: '',
        contactInfo: '',
      };
    },
  },
};
</script>

<style scoped>
.supplier-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Roboto', sans-serif;
}

.card {
  max-width: 500px;
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

.b-button {
  width: 100%;
  font-weight: 500;
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
