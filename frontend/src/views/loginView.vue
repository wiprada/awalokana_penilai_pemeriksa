<template>
    <!-- <h1>Selamat Datang</h1> -->
    <p>Gas poll, Pemeriksa BPK Bali! Ini bukan sekadar aplikasi 'nilai-menilai' yang bikin ngantuk. Ini tempat kita berani jujur biar kinerja makin naik. Jangan takut, santai aja, ini bukan buat cari siapa yang paling 'sempurna'. </p>
    <p>Ini soal kita semua bisa saling bantu, saling kasih masukan yang to the point, biar BPK Bali makin keren. Jadi, siapkan jari, beri nilai yang apa adanya, dan sebarkan pengetahuanmu, atau usulkan siapa yang harus membagi pengetahuannya.</p>
    <h3>Selamat datang di era penilaian yang real dan anti-mainstream!</h3>
    <div class="login-view">
        <Login />
    </div>
</template>

<script setup>
import Login from '@/components/Login.vue'
</script>

<style scoped>
h1 {
    text-align: center;
    margin-top: 20px;
}
p {
    text-align: center;
    margin: 20px auto;
    max-width: 600px;
    font-size: 1.1em;
    line-height: 1.6;
}
.login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100;
}
</style>