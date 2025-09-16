<template lang="">
    <v-container class="pa-4 text-center" grid-list-sm>
        <h2>Tugas Menilai Kinerja Pemeriksa</h2>
        <v-sheet class="text-left pa-4">
            <v-list>
                <v-list-item
                    v-for="t in tugas"
                    :key="t.id_tugas"
                >
                <v-card class="pa-3 mb-2 bg-green-darken-2" size="small" outlined>
                    <v-card-title primary-title>{{ t.id_tugas }}</v-card-title>
                    <v-card-subtitle>{{ t.entabr }}</v-card-subtitle>
                    <v-card-text>{{ t.perihalst }}</v-card-text>
                    <v-card-subtitle>{{t.sudah_dinilai}} : {{ t.jumlah_dinilai }}</v-card-subtitle>

                    <v-card-actions class="justify-end">
                        <v-btn text small>
                            <v-icon class="ma-2">mdi-eye</v-icon>
                            Lihat Detail
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-list-item>

            </v-list>
            <v-divider></v-divider>
        </v-sheet>
    </v-container>
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export default {
    name: 'userTugas',
    data() {
        return {
            tugas: []
        }
    },
    methods: {
        //get from api users
        fetchTugas() {
            const nama = localStorage.getItem('nama');
            if (nama) {
                axios.get(`/api/tugas/${nama}`)
                    .then(response => {
                        this.tugas = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching tugas data:', error);
                    });
            } else {
                console.log('Tidak ada username ditemukan.');
            }
        }
    },
    mounted() {
        this.fetchTugas()
    }
}
</script>
