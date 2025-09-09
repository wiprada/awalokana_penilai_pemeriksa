<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Halaman Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="masukkan email Anda"
            required 
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="masukkan password Anda"
            required 
          />
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// --- STATE ---
// ref() digunakan untuk membuat variabel reaktif.
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// --- METHODS ---
const handleLogin = () => {
  // Reset pesan error setiap kali tombol login ditekan
  errorMessage.value = '';

  // 1. Validasi Sederhana
  if (!email.value || !password.value) {
    errorMessage.value = 'Email dan password tidak boleh kosong.';
    return;
  }

  // 2. Simulasi Panggilan API (Backend)
  // Di aplikasi nyata, Anda akan mengirimkan data ini ke server.
  console.log('Data yang dikirim:', {
    email: email.value,
    password: password.value,
  });

  // Contoh simulasi: jika email dan password benar
  if (email.value === 'admin@example.com' && password.value === 'password123') {
    // Tampilkan pesan sukses
    alert('Login berhasil! Anda akan diarahkan ke halaman dashboard.');
    
    // Di aplikasi nyata, Anda akan melakukan redirect ke halaman lain, misalnya:
    // router.push('/dashboard');
    
  } else {
    // Jika salah, tampilkan pesan error
    errorMessage.value = 'Email atau password yang Anda masukkan salah.';
  }
};
</script>

<style scoped>
/* 'scoped' berarti style ini hanya berlaku untuk komponen ini saja */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-box {
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box; /* Agar padding tidak menambah lebar input */
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  margin-bottom: 15px;
  font-size: 14px;
}
</style>