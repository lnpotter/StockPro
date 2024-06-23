<template>
  <div class="add-product-container">
    <b-card class="card">
      <h2>Add Product</h2>
      <b-form @submit.prevent="addProduct" class="form">
        <b-form-group label="Name:" label-for="name">
          <b-form-input id="name" v-model="product.name" placeholder="Enter product name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Description:" label-for="description">
          <b-form-textarea id="description" v-model="product.description" placeholder="Enter product description" required></b-form-textarea>
        </b-form-group>
        <b-form-group label="Price:" label-for="price">
          <b-form-input id="price" v-model="product.price" type="number" placeholder="Enter product price" required></b-form-input>
        </b-form-group>
        <b-form-group label="Quantity:" label-for="quantity">
          <b-form-input id="quantity" v-model="product.quantity" type="number" placeholder="Enter product quantity" required></b-form-input>
        </b-form-group>
        <b-form-group label="Supplier:" label-for="supplier">
          <b-form-select id="supplier" v-model="product.supplier" :options="supplierOptions" required></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Add Product</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const product = ref({
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      supplier: '',
    });

    const { suppliers } = mapGetters(['suppliers']);
    const { fetchSuppliers, addProduct } = mapActions(['fetchSuppliers', 'addProduct']);
    
    onMounted(() => {
      fetchSuppliers();
    });

    const addProductHandler = () => {
      addProduct(product.value);
      product.value = {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        supplier: '',
      };
    };

    return {
      product,
      suppliers,
      supplierOptions: suppliers.value.map(supplier => ({ value: supplier._id, text: supplier.name })),
      addProduct: addProductHandler,
    };
  },
};
</script>

<style scoped>
.add-product-container {
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

.form {
  margin-top: 20px;
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
