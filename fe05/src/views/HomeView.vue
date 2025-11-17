<template>
  <div class="container-fluid p-4">
    <v-row class="bg-background text-surface">
      <v-col cols="4">
        <!-- Kolom 1: Komponen Login (Rasio 3) -->
        <div class="row ma-4 align-items-center bg-white rounded-lg">
          <div class="col-md-12 text-center ma-4">
            <div class="align-center">
              <!-- Logo -->
              <img src="@/assets/logo.png" alt="Logo" class="logo w-100" />
            </div>
            <!-- Teks Pengantar -->
            <h1 x-large class="ma-5">
              Ruang Pemeriksa untuk Sharing dan Evaluasi Kinerja
            </h1>
            <p>
              Gas poll, Pemeriksa BPK Bali! Ini bukan sekadar aplikasi
              'nilai-menilai' yang bikin ngantuk. Ini tempat kita berani jujur
              biar kinerja makin naik. Jangan takut, santai aja, ini bukan buat
              cari siapa yang paling 'sempurna'.
            </p>
            <p>
              Ini soal kita semua bisa saling bantu, saling kasih masukan yang
              to the point, biar BPK Bali makin keren. Jadi, siapkan jari, beri
              nilai yang apa adanya, dan sebarkan pengetahuanmu, atau usulkan
              siapa yang harus membagi pengetahuannya.
            </p>
            <h3>
              Selamat datang di era penilaian yang real dan anti-mainstream!
            </h3>
            <p>#jagadiri #jagawarga #jagaprofesionalitas</p>
          </div>
        </div>
        <div class="col-md-3 ma-4 rounded-lg">
          <Login />
        </div>
      </v-col>
      <v-col cols="8">
        <!-- Kolom 2: Komponen Tabel (Rasio 9) -->
        <div class="col-md-9 text-warning">
          <UsulanPengetahuanTable />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
// Impor komponen yang akan digunakan.
// Pastikan path ke komponen sudah benar sesuai struktur proyek Anda.
import Login from "@/components/LoginComponent.vue";
import UsulanPengetahuanTable from "@/components/UsulanPengetahuanTable.vue";
</script>
