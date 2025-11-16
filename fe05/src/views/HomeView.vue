<template>
  <div class="container-fluid p-4">
    <!-- Row 1: Header -->
    <v-row> </v-row>

    <!-- Row 2: Konten Utama -->
    <v-row>
      <v-col cols="4" class="bg-orange">
        <!-- Kolom 1: Komponen Login (Rasio 3) -->
        <div class="row mb-4 align-items-center header-row">
          <div class="col-md-12 text-center">
            <div class="align-center">
              <!-- Logo -->
              <img
                src="@/assets/logo.png"
                alt="Logo"
                class="logo me-3"
                style="width: 35%; height: auto"
              />
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
        <div class="col-md-3">
          <Login />
        </div>
      </v-col>
      <v-col class="bg-lime" cols="8">
        <!-- Kolom 2: Komponen Tabel (Rasio 9) -->
        <div class="col-md-9">
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

<style scoped>
/* Menggunakan class untuk styling agar tidak bertabrakan dengan style global */
.container-fluid {
  background-color: #f8f9fa;
}

.header-row {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 60px;
  width: auto;
}

h1 {
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.lead {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 0;
}
</style>
