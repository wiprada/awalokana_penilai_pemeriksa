<template>
    <v-container class="text-center" grid-list-sm>
        <h2>Evaluasi Personal </h2>
        <v-row justify="center">
            <v-card class="ma-4">
                <v-img
                    height="200px"
                    :src="user.fotolink"
                ></v-img>
                <v-card-title> {{ user.nama}}</v-card-title>
                <v-card-text>
                    <p>E-mail: {{ user.username }}</p>
                    <p>NIP: {{ user.nip }}</p>

                </v-card-text>

            </v-card>
        </v-row>

        <v-row d-flex grid-list-xs>
            <v-col
                cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.perencanaan) }"
            >
                Perencanaan:
                <br>
                {{ Number(nilai.perencanaan).toFixed(2) }}
            </v-col>
            <v-col cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.pelaksanaan) }"
            >
                Pelaksanaan:
                <br>
                {{ Number(nilai.pelaksanaan).toFixed(2) }}
            </v-col>
            <v-col cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.pelaporan) }"
            >
                Pelaporan:
                <br>
                {{ Number(nilai.pelaporan).toFixed(2) }}
            </v-col>
            <v-col
                cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.pelayanan) }"
            >
                Pelayanan:
                <br>
                {{ Number(nilai.pelayanan).toFixed(2) }}
            </v-col>
            <v-col
                cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.akuntabel) }"
            >
                Akuntabel:
                <br>
                {{ Number(nilai.akuntabel).toFixed(2) }}
            </v-col>
            <v-col cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.kompeten) }"
            >
                Kompeten:
                <br>
                {{ Number(nilai.kompeten).toFixed(2) }}
            </v-col>
            <v-col
                cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.harmonis) }"
            >
                Harmonisasi:
                <br>
                {{ Number(nilai.harmonis).toFixed(2) }}
            </v-col>
            <v-col
                cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.loyalitas) }"
            >
                Loyalitas:
                <br>
                {{ Number(nilai.loyalitas).toFixed(2) }}
            </v-col>
            <v-col
                cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.adaptif) }"
            >
                Adaptif:
                <br>
                {{ Number(nilai.adaptif).toFixed(2) }}
            </v-col>
            <v-col
                cols="3"
                class="text-center"
                :style="{ backgroundColor: getBgColor(nilai.kolaboratif) }"
            >
                Kolaboratif:
                <br>
                {{ Number(nilai.kolaboratif).toFixed(2) }}
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';

export default {
    name: 'UserNilai',
    data() {
        return {
            user: {},
            nilai: {}
        }
    },
    methods: {
        //get from api users
        fetchUser() {
            const username = localStorage.getItem('username');
            if (username) {
                axios.get(`/api/user/${username}`)
                    .then(response => {
                        this.user = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                console.log('Tidak ada username ditemukan.');
            }
        },
        nilaiUser() {
            const nama = localStorage.getItem('nama');
            if (nama) {
                axios.get(`/api/nilai/${nama}`)
                    .then(response => {
                        this.nilai = response.data[0];
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                console.log('Tidak ada username ditemukan.');
            }
        },
        getBgColor(value) {
            // Example: return a color based on value, adjust as needed
            if (value >= 2) return '#C8E6C9'; // green for high scores
            return '#FFCDD2'; // red for low scores
            
        }
    },
    mounted() {
        this.fetchUser();
        this.nilaiUser()
    }
}
</script>
