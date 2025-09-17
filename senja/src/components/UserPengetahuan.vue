<template>
    <v-container>
        <v-list>
            <v-list-item v-for="item in pengetahuanList" :key="item.id">
                <v-list-item-content class="d-flex">
                    <v-card outlined class="pa-3 mb-2 d-flex w-100">
                        <v-row class="w-100">
                            <v-col cols="3">
                                Narasumber: <br>
                                {{ item.narasumber }}
                            </v-col>
                            <v-col cols="6">
                                Pengetahuan: <br>
                                {{ item.pengetahuan }}
                            </v-col>
                            <v-col cols="1">
                                vote: <br>
                                {{ item.vote }}
                            </v-col>
                            <v-col cols="2">
                                <v-btn color="success" @click="vote(item.id)" :disabled="statusvote">
                                    <v-icon class="ma-2">mdi-thumb-up</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

export default {
    name: 'UserPengetahuan',
    data() {
        return {
            pengetahuanList: [],
            statusvote: false
        };
    },
    methods: {
        fetchPengetahuan() {
            axios.get('/pengetahuan')
                .then(response => {
                    console.log(response.data);
                    this.pengetahuanList = response.data;
                    // Emit an event to notify parent components that pengetahuan data has been fetched and updated
                    this.$emit('pengetahuanFetched', this.pengetahuanList);
                })
                .catch(error => {
                    console.error('Error fetching pengetahuan data:', error);
                });

        },
        
        async vote(id) {
            const voter = localStorage.getItem('username');
            try {
                // Combine vote and voter recording in a single API call if possible
                const response = await axios.post('/pengetahuan/vote', { 
                    id: Number(id),
                    voter
                });
                if (response.status === 200) {
                    this.fetchPengetahuan(); // Refresh the list after voting
                }
            } catch (error) {
                console.error('Error voting dan mencatat voter pengetahuan:', error);
            }
        },

        async checkUserVote(id) {
            const voter = localStorage.getItem('username');
            try {
                const response = await axios.post(`/pengetahuan/vote/check`, { 
                    id: Number(id),
                    voter
                });
                if (response.status === 200) {
                    this.statusvote = true;
                }
            } catch (error) {
                console.error('Error checking user vote status:', error);
            }
        }
    },
    mounted() {
        this.fetchPengetahuan();
    }
}
</script>
