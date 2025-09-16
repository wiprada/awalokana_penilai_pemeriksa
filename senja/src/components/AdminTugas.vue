<template lang="">
    <div>
        <h2>Manajemen Surat Tugas</h2>
        <v-list>
            <v-list-item
                v-for="item in tugas"
                :key="item.id"
            >
            <v-card>
                <v-card-title primary-title>
                    {{ item.id }}
                </v-card-title>
                <v-card-subtitle>
                    {{ item.entabr }}
                </v-card-subtitle>
                <v-card-text>
                    {{ item.perihalst }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="blank">Detail</v-btn>
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
    name: 'AdminTugas',
    data() {
        return {
            tugas: []
        }
    },
    methods: {
        //get from api tugas
        fetchTugas() {
            axios.get('/api/tugas')
                .then(response => {
                    this.tugas = response.data;
                })
                .catch(error => {
                    console.error('There was an error fetching the tugas!', error);
                });
        }
    },

    mounted() {
        this.fetchTugas();
    },
}
</script>
