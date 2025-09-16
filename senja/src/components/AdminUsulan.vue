<template lang="">
    <div>
        <h2>Manajemen Pengetahuan</h2>
        <v-list>
            <v-list-item
                v-for="item in usulan"
                :key="item.id"
            >
            <v-card>
                <v-card-title primary-title>
                    {{ item.narasumber }}
                </v-card-title>
                <v-card-text>
                    {{ item.pengetahuan }}
                </v-card-text>
                <v-card-text>
                    {{ item.vote }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="selesai(item.id)">Sudah Dilaksanakan</v-btn>
                </v-card-actions>
            </v-card>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export default {
    name: 'AdminUsulan',
    data() {
        return {
            usulan: []
        }
    },
    methods: {
        //get from api usulan
        fetchUsulan() {
            axios.get('/pengetahuan')
                .then(response => {
                    this.usulan = response.data;
                })
                .catch(error => {
                    console.error('There was an error fetching the usulan!', error);
                });
        },
        async selesai(item_id) {
            try {
                const by = localStorage.getItem('nama');
                const response = await axios.patch('/pengetahuan/selesai', { id: item_id , by: by });
                if (response.status === 200) {
                    console.log('Usulan sudah selesai:', response.data);
                    this.fetchUsulan(); // Refresh the list after deletion
                }
            } catch (error) {
                console.error('Error marking usulan as selesai:', error);
            }
            // console.log('Selesai clicked for item ID:', item_id);
        }
    },

    mounted() {
        this.fetchUsulan();
    },
}
</script>
