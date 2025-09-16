<template>
    <v-toolbar class="bg-green-darken-4">
    <v-toolbar-title>Dashboard </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="text" to="/" @click="logout">Logout</v-btn>
  </v-toolbar>
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="8" class="mb-4">
                <UserNilai />
            </v-col>
            <v-col cols="4" class="mb-4">
                <UserTugas />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" >
                <div class="bg-teal-darken-4 pa-4 mb-4">
                    <v-form v-if="nama.length">
                        <v-autocomplete
                            clearable
                            label="Usulkan Narasumber"
                            v-model="narasumber"
                            :items="nama"
                            variant="solo"
                        >
                        </v-autocomplete>
                        <v-textarea 
                            clearable label="Usulan Materi" 
                            variant="solo"
                            v-model="materi"
                        ></v-textarea>
                        <v-btn color="success" @click="usulkanPengetahuan">Usulkan Pengetahuan yang Dibagi</v-btn>
                    </v-form>
                </div>
                <UserPengetahuan />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

import UserNilai from '../components/UserNilai.vue'
import UserTugas from '../components/UserTugas.vue'
import UserPengetahuan from '../components/UserPengetahuan.vue'


export default {
    name: 'UserView',
    components: {
        UserNilai,
        UserTugas,
        UserPengetahuan
    },
    data() {
        return {
            narasumber: '',
            materi: '',
            nama: []
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('grup');
            localStorage.removeItem('nama');
            localStorage.removeItem('username');
            this.$router.push('/');
        },
        async usulkanPengetahuan() {
            try {
                const response = await axios.post('/pengetahuan', {
                    narasumber: this.narasumber,
                    materi: this.materi,
                    pengusul: localStorage.getItem('nama') || ''
                });
                if (response.status === 200) {
                    console.log('Usulan pengetahuan berhasil dikirim:', response.data);
                    // this.$router.push('/usulkan-pengetahuan');
                    // refresh page
                    this.narasumber = '';
                    this.materi = '';
                    this.fetchNama(); // Refresh the list of names after submission
                    // reload the page
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error usulkan pengetahuan:', error);
            }
        },
        async fetchNama() {
            try {
                const response = await axios.get('/api/pegawai');
                // Assuming response.data is an array of objects with a 'nama' property
                this.nama = Array.isArray(response.data)
                    ? response.data.map(item => item.nama)
                    : [];
                console.log('Fetched names:', this.nama);
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        },
    },
    mounted() {
        this.fetchNama();
    },

}


</script>
