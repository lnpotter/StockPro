<template>
  <div class="register-container">
    <div class="card animate__animated animate__fadeInUp">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister" class="form">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export default {
  setup() {
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const handleRegister = async () => {
      try {
        if (password.value !== confirmPassword.value) {
          toast.error('Passwords do not match', { timeout: 3000 });
          return;
        }
        const userData = { email: email.value, username: username.value, password: password.value };
        await store.dispatch('register', userData);
        toast.success('Registration successful', { timeout: 3000 });
        router.push('/products');
      } catch (error) {
        toast.error('Registration error: ' + error.message, { timeout: 3000 });
      }
    };

    return {
      email,
      username,
      password,
      confirmPassword,
      handleRegister,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  font-family: 'Roboto', sans-serif;
}

.card {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-weight: 500;
}

.form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
