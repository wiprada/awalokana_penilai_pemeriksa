<template>
    <v-container >
        <h2>Evaluasi Personal </h2>
        <v-row>
            <v-card class="ma-4">
                <v-img
                    height="200px"
                    :src="user.fotolink"
                ></v-img>
                <v-card-title> {{ user.nama}}</v-card-title>
                <v-card-text>
                    <p>E-mail: {{ user.username }}</p>
                    <p>NIP: {{ user.nip }}</p>

                </v-card-text>

            </v-card>
        </v-row>
        <v-row>
            <p> lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export default {
    name: 'UserNilai',
    data() {
        return {
            user: {}
        }
    },
    methods: {
        //get from api users
        fetchUser() {
            const username = localStorage.getItem('username');
            if (username) {
                axios.get(`/api/user/${username}`)
                    .then(response => {
                        this.user = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                console.log('Tidak ada username ditemukan.');
            }
        },
        nilaiUser() {
            const username = localStorage.getItem('nama');
            if (username) {
                axios.get(`/api/nilai/${username}`)
                    .then(response => {
                        this.user = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                console.log('Tidak ada username ditemukan.');
            }
        }
    },
    mounted() {
        this.fetchUser();
        this.nilaiUser()
    }
}
</script>
