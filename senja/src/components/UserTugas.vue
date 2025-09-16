<template>
    <v-container class="pa-4 text-center" grid-list-sm>
        <h2>Tugas Menilai Kinerja Pemeriksa</h2>
        <v-sheet class="text-left pa-4">
            <v-list>
                <v-list-item
                    v-for="t in tugas"
                    :key="t.id_st"
                >
                <v-card class="pa-3 mb-2 bg-green-darken-2" size="small" outlined>
                    <v-card-title primary-title>{{ t.no_st }}</v-card-title>
                    <v-card-subtitle>{{ t.entabr }}</v-card-subtitle>
                    <v-card-text>{{ t.perihalst }}</v-card-text>
                    <v-card-subtitle>{{t.sudah_dinilai}} : {{ t.jumlah_dinilai }}</v-card-subtitle>

                    <v-card-actions class="justify-end">
                        <v-btn variant="text" size="small" @click="mulaiMenilai(t.id_st)">
                            <v-icon class="ma-2">mdi-eye</v-icon>
                            Beri Penilaian
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
import { useRouter } from 'vue-router';

axios.defaults.baseURL = 'http://localhost:3000/';

export default {
    name: 'UserTugas',

    setup() {
            const router = useRouter();
            return { router };
        },

    data() {
        return {
            tugas: []
        }
    },
    methods: {
        //get from api users
        fetchTugas() {
            const id_penilai = String(localStorage.getItem('id'));
            try {
                if (!id_penilai) {
                    throw new Error('ID Penilai tidak ditemukan di localStorage');
                }
            } catch (error) {
                console.error('Error retrieving id_penilai from localStorage:', error);
                return;
            }
            console.log('Fetching tugas for id_penilai:', id_penilai);
            axios.get(`/api/tugas/${id_penilai}`)
                .then(response => {
                    this.tugas = response.data;
                    console.log(this.tugas);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        },
        mulaiMenilai(id_st) {
            // Simpan id_tugas ke localStorage
            if (this.tugas.length > 0) {
                // Arahkan ke halaman penilaian
                this.router.push('/penilaian/' + String(localStorage.getItem('id')) + '/' + String(id_st));
            } else {
                console.error('Tidak ada tugas yang tersedia untuk dinilai.');
            }
        }       
    },
    mounted() {
        this.fetchTugas()
    }
}
</script>
