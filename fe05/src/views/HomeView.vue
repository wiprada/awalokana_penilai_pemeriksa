<template>
  <v-container fluid wrap width="100%" class="bg-surface">
    <v-row align-content="stretch">
      <v-col sm="12" md="4" class="bg-secondary">
        <v-img :src="require('@/assets/logo.png')" cover></v-img>
      </v-col>
      <v-col sm="12" md="8" class="bg-warning" align-self="stretch">
        <h1 class="ma-1">Ruang Pemeriksa untuk Sharing dan Evaluasi Kinerja</h1>
        <p>
          Gas poll, Pemeriksa BPK Bali! Ini bukan sekadar aplikasi
          'nilai-menilai' yang bikin ngantuk. Ini tempat kita berani jujur biar
          kinerja makin naik. Jangan takut, santai aja, ini bukan buat cari
          siapa yang paling 'sempurna'.
        </p>
        <p>
          Ini soal kita semua bisa saling bantu, saling kasih masukan yang to
          the point, biar BPK Bali makin keren. Jadi, siapkan jari, beri nilai
          yang apa adanya, dan sebarkan pengetahuanmu, atau usulkan siapa yang
          harus membagi pengetahuannya.
        </p>
        <h3>Selamat datang di era penilaian yang real dan anti-mainstream!</h3>
        <p>#jagadiri #jagawarga #jagaprofesionalitas</p>
      </v-col>
    </v-row>
    <v-row align-content="stretch">
      <v-col sm="12" md="4">
        <Login />
      </v-col>
      <v-col sm="12" md="8">
        <UsulanPengetahuanTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "@/components/LoginComponent.vue";
import UsulanPengetahuanTable from "@/components/UsulanPengetahuanTable.vue";

export default {
  name: "HomeView",
  components: {
    Login,
    UsulanPengetahuanTable,
  },
};
</script>
