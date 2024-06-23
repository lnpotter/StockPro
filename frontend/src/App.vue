<template>
  <div id="app">
    <nav>
      <router-link to="/products">Products</router-link>
      <router-link to="/suppliers">Suppliers</router-link>
      <router-link to="/suppliers/new">Add Supplier</router-link>
      <router-link to="/stock-report">Stock Report</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  display: flex;
  gap: 1rem;
}
</style>
