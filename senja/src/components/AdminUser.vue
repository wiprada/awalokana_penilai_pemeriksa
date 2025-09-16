<template lang="html">
    <v-container grid-list-sm>
        <h2>Manajemen Users</h2>
        <p>Ini adalah halaman manajemen users untuk admin.</p>
        <v-sheet>
            <v-list>
                <v-list-item
                    v-for="user in users"
                    :key="user.id"
                >
                <v-card class="pa-3 mb-2 text-center" outlined>
                    <v-img>
                        <v-avatar size="40">
                            <img :src="user.fotolink" alt="Avatar">
                        </v-avatar>
                    </v-img>
                        <v-list-item-content>
                            <v-list-item-title>{{ user.nama }}</v-list-item-title>
                            <v-list-item-subtitle>{{ user.nip }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-card-actions>
                            <v-btn text small color="primary">Detail</v-btn>
                            <v-btn text small color="error">Reset Password</v-btn>
                        </v-card-actions>

                </v-card>
                
                </v-list-item>
                
            </v-list>

        </v-sheet>
    </v-container>
    
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export default {
    name: 'AdminUser',
    data() {
        return {
            users: []
        }
    },
    methods: {
        //get from api users
        fetchUsers() {
            axios.get('/api/users')
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.error('There was an error fetching the users!', error);
                });
        }
    },

    mounted() {
        this.fetchUsers();
    },
}
</script>

