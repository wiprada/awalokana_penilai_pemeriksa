<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
  <!-- Tambahkan di bawah form login -->
  <div class="change-password-box">
    <h3>Ganti Password</h3>
    <form @submit.prevent="handleChangePassword">
      <input v-model="changeEmail" placeholder="Email" required />
      <input v-model="oldPassword" type="password" placeholder="Password Lama" required />
      <input v-model="newPassword" type="password" placeholder="Password Baru" required />
      <button type="submit">Ganti Password</button>
      <p v-if="changePasswordMessage">{{ changePasswordMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['setUser']),
    async handleLogin() {
      try {
        const response = await axios.post('/api/auth/login', {
          username: this.username,
          password: this.password
        });
        this.setUser(response.data.user);
        this.$router.push(response.data.user.role === 'pemeriksa' ? '/examiner' : '/supervisor');
      } catch (error) {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }
};

const changeEmail = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const changePasswordMessage = ref('');

const handleChangePassword = async () => {
  changePasswordMessage.value = '';
  try {
    const res = await fetch('http://localhost:3001/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: changeEmail.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      changePasswordMessage.value = 'Password berhasil diganti!';
    } else {
      changePasswordMessage.value = data.error;
    }
  } catch (e) {
    changePasswordMessage.value = 'Terjadi kesalahan.';
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
}
</style>