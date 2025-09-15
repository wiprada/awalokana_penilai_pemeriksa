<template>
    <v-container flex max-width="1200" fill-height class="bg-purple-darken-4">
        <v-row flex wrap>
            <v-col cols="4" class="bg-purple text-lime text-center">
                <v-sheet class="bg-purple text-orange-lighten-3">
                    <h1>NGOBROLIN SENJA</h1>
                    <p>Gas poll, Pemeriksa BPK Bali! Ini bukan sekadar aplikasi 'nilai-menilai' yang bikin ngantuk. Ini tempat kita berani jujur biar kinerja makin naik. Jangan takut, santai aja, ini bukan buat cari siapa yang paling 'sempurna'. </p>
                    <p>Ini soal kita semua bisa saling bantu, saling kasih masukan yang to the point, biar BPK Bali makin keren. Jadi, siapkan jari, beri nilai yang apa adanya, dan sebarkan pengetahuanmu, atau usulkan siapa yang harus membagi pengetahuannya.</p>
                    <h3>Selamat datang di era penilaian yang real dan anti-mainstream!</h3>
                    <v-card class="mt-5">
                        <v-card-title primary-title>
                            Menu Login
                        </v-card-title>
                        <v-form v-model="isValid">
                            
                            <v-card-text>
                                <v-text-field
                                    name="namauser"
                                    :rules="checkEmail"
                                    label="Email Pengguna"
                                    id="namauser"
                                    type="email"
                                    v-model="user.email"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    name="password"
                                    :rules="checkPassword"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    v-model="user.password"
                                    required
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions mt-2>
                                <v-btn v-on:click="handleSubmit" :disabled="!isValid">Submit</v-btn>
                                <v-btn >Ganti Password</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-sheet>
            </v-col>
            <v-col cols="8">
                <usulan-pengetahuan />
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
import { defineComponent } from 'vue';
import axios from 'axios';

// mengambil component
import UsulanPengetahuan from '@/components/Manajemen_Pengetahuan'


export default defineComponent({
    name: 'LoginView',

    data() {
        return {
            user: {
                email: '',
                password: ''

            },
            checkEmail: [
                value => value != '' || 'Perlu masukkan email BPK'
            ],
            checkPassword: [
                v => v.length > 3 || 'Password harus lebih dari 3 character'
            ],
            isValid : false
        }
    },
    methods: {
        handleSubmit() {
            // mengirim isian form ke backend login
            axios.post('http://localhost:3000/login', this.user)
            .then(response => {
                console.log(response.data);
                // Simpan data user ke localStorage atau state management
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Arahkan ke halaman dashboard sesuai role
                this.$router.push(response.data.redirect);
            })
            // jika berhasil di backend maka diarahkan ke halaman dashsboard sesuai role
        },
        gantiPassword() {
            //
        },
        
    },
    components: {
        UsulanPengetahuan
    }
});

</script>
<style>
    
</style>