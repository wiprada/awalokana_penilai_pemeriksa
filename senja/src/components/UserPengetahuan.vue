<template>
    <v-container>
        <v-list>
            <v-list-item v-for="item in pengetahuanList" :key="item.id">
                <v-list-item-content>
                    <v-card outlined class="mb-4">
                        <v-card-title class="headline"> Narasumber: {{ item.narasumber }}</v-card-title>
                        <v-card-text>{{ item.pengetahuan }}</v-card-text>
                    </v-card>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    name: 'UserPengetahuan',
    data() {
        return {
            pengetahuanList: []
        };
    },
    methods: {
        fetchPengetahuan() {
            axios.get('http://localhost:3000/pengetahuan')
                .then(response => {
                    console.log(response.data);
                    this.pengetahuanList = response.data;
                    this.$emit('pengetahuanFetched', this.pengetahuanList);
                })
                .catch(error => {
                    console.error('Error fetching pengetahuan data:', error);
                });
        }
    },
    mounted() {
        this.fetchPengetahuan();
    }
}
</script>
<style>
    
</style>