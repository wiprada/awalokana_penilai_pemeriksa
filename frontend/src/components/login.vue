<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Username</label>
                <input id="username" v-model="username" type="text" required />
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" required />
            </div>
            <button type="submit">Login</button>
            <button type="button" @click="goToChangePassword" class="change-password-btn">Ganti Password</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
    error.value = ''
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, password: password.value })
        })
        if (!response.ok) {
            throw new Error('Invalid username or password.')
        }
        const data = await response.json()
        // Assuming API returns { id: userId, ... }
        if (data && data.id) {
            router.push(`/dashboard/${data.id}`)
        } else {
            throw new Error('Invalid response from server.')
        }
    } catch (e) {
        error.value = e.message || 'Login failed.'
    }
}

const goToChangePassword = () => {
    router.push('/change-password')
}
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 50px auto;
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
.login-container h2 {
    text-align: center;
}
.login-container form div {
    margin-bottom: 16px;
}
.login-container label {
    display: block;
    margin-bottom: 4px;
}
.login-container input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
.login-container .error {
    color: red;
    margin-top: 8px;
    text-align: center;
}

.login-container button {
    width: 100%;
    padding: 10px;
    background: #2ecc40;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-container button:hover {
    background: #27ae39;
}

.change-password-btn {
    margin-top: 8px;
    width: 100%;
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
}
.change-password-btn:hover {
    background: #e0e0e0;
}
</style>