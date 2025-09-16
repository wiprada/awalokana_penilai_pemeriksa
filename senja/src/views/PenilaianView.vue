<template>
    <v-toolbar class="bg-green-darken-4">
        <v-btn icon @click="pulang">
            <v-icon large>mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn variant="text" @click="logout">Logout</v-btn>
    </v-toolbar>
    <v-container class="pa-4 d-flex" grid-list-sm>
        <v-col cols="3">
            <UserTugas />
        </v-col>
        <v-col cols="9">
            <h2>Form Penilaian</h2>
            <div class="d-flex flex-wrap">
                <v-list>
                    <v-list-item
                        v-for="t in tugas_menilai"
                        :key="t.id_penilaian"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ t.dinilai }}</v-list-item-title>
                            <v-list-item-subtitle>{{ t.id_dinilai }}</v-list-item-subtitle>
                            <v-card>
                                <v-img
                                    contain
                                    height="200"
                                    :src="t.fotolink"
                                ></v-img>
                                <v-card-title primary-title>
                                    {{ t.dinilai }}
                                </v-card-title>
                                <v-card-subtitle>
                                    {{ t.id_dinilai }}
                                </v-card-subtitle>
                            </v-card>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </div>
        </v-col>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
   
import axios from 'axios';
import UserTugas from '@/components/UserTugas.vue';

axios.defaults.baseURL = 'http://localhost:3000/';

export default defineComponent({
    name: 'PenilaianView',

    components: {
        UserTugas
    },

    data() {
        return {
            tugas_menilai: [],
            nama: localStorage.getItem('nama') || ''
        }
    },

    methods: {
        //get from api users
        fetchTugasMenilai() {
            const id_penilai = route.params.id_penilai;
            const id_tugas = route.params.id_tugas;
            axios.get(`/api/tugas/menilai/${id_penilai}/${id_tugas}`)
                .then(response => {
                    this.tugas_menilai = response.data;
                    console.log(this.tugas_menilai);
                })
                .catch(error => {
                    console.error('Error fetching tugas menilai data:', error);
                });
        },
        pulang() {
            const nama = localStorage.getItem('nama');
            if (nama) {
                this.nama = nama;
            }   
            this.$router.push('/user/' + this.nama);

        },
        logout() {
            localStorage.removeItem('userRole');
            localStorage.removeItem('grup');
            localStorage.removeItem('nama');
            localStorage.removeItem('username');
            this.$router.push('/');
        }
    },

    mounted() {
        this.fetchTugasMenilai()
    }
});
</script>
    
