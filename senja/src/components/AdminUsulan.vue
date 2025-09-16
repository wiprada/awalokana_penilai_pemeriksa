<template lang="">
    <div>
        <h2>Manajemen Pengetahuan</h2>
        <p>Welcome to the manajemen pengetahuan page!</p>
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
                    <v-btn color="primary" @click="blank">Sudah Dilaksanakan</v-btn>
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
        }
    },

    mounted() {
        this.fetchUsulan();
    },
}
</script>
