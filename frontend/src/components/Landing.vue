<template>
    <div>
        <h1>Landing Page</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <p>Backend Response: {{ message }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';


export default {
    name: 'Landing',
    data() {
        return {
            message: '',
            loading: true,
        };
    },
    mounted() {
        const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000/';
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.message = data.message || JSON.stringify(data);
                this.loading = false;
            })
            .catch(error => {
                this.message = 'Error: ' + error.message;
                this.loading = false;
            });
    },
};
</script>