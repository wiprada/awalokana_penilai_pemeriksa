<template lang="">
    <v-container max-width="600">
        <h2>Login Page</h2>
        <v-form>
            <v-text-field
                label="Username"
                v-model="username"
                required
            ></v-text-field>
            <v-text-field
                label="Password"
                type="password"
                v-model="password"
                required
            ></v-text-field>
            <v-btn color="primary" @click="login">Login</v-btn>
        </v-form>
    </v-container>
    
</template>
<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'LoginUser',

    setup() {
        const router = useRouter();
        return { router };
    },

    data: () => ({
        username: '',
        password: '',
    }),

    methods: {
        async login() {
            // Handle login logic here
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    username: this.username,
                    password: this.password
                });
                console.log('Login successful:', response.data);

                const token = response.data.token;
                localStorage.setItem('authToken', token);
                const userRole = response.data.role;
                localStorage.setItem('userRole', userRole);

                // Cek role dan arahkan ke halaman yang sesuai
                if (userRole === 'admin') {
                    this.router.push('/admin');
                } else {
                    this.router.push('/user');
                }

                // Redirect to dashboard or another page
                // this.router.push('/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please try again.');
            }

            // clear form
            this.username = '';
            this.password = '';
        }
    }
}
</script>

