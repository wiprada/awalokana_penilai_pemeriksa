<template lang="">
    <v-container class="fill-height d-flex align-center justify-center" max-width="900">
        <v-row class="justify-center" >
            <v-img
                src="@/assets/logo.png"
                alt="Logo"
                max-width="600"
            ></v-img>
        </v-row>
        <v-row>
            <v-col cols="6">
                <h1 x-large class="ma-5">Ruang Pemeriksa untuk Sharing dan Evaluasi Kinerja</h1>
                <p>Gas poll, Pemeriksa BPK Bali! Ini bukan sekadar aplikasi 'nilai-menilai' yang bikin ngantuk. Ini tempat kita berani jujur biar kinerja makin naik. Jangan takut, santai aja, ini bukan buat cari siapa yang paling 'sempurna'. </p>
                <p>Ini soal kita semua bisa saling bantu, saling kasih masukan yang to the point, biar BPK Bali makin keren. Jadi, siapkan jari, beri nilai yang apa adanya, dan sebarkan pengetahuanmu, atau usulkan siapa yang harus membagi pengetahuannya.</p>
                <h3>Selamat datang di era penilaian yang real dan anti-mainstream!</h3>
                <p>#jagadiri #jagawarga #jagaprofesionalitas</p>
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-center">
                <LoginUser />
            </v-col>
        </v-row>

    </v-container>
</template>
<script>
import LoginUser from '@/components/LoginUser.vue';
export default {
    components: {
        LoginUser
    }
}
</script>
<style lang="">
    
</style>