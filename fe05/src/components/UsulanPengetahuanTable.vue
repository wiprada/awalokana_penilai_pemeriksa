<template>
  <v-container>
    <v-row no-gutters justify="center" align-content="center">
      <v-col class="text-center">
        <h1>Usulan Berbagi Pengetahuan</h1>
      </v-col>
    </v-row>
    <v-row
      v-for="item in usulanData"
      :key="item.id"
      no-gutters
      justify="center"
      align-content="center"
      class="ma-4 elevation-8"
    >
      <v-col class="pa-4 bg-background-lighten-3">
        <div class="text-warning">
          <h3>Narasumber : {{ item.narasumber }}</h3>
        </div>
        <div>{{ item.pengetahuan }}</div>
        <v-divider></v-divider>
        <div class="mt-10">{{ item.jml_vote || 0 }} votes</div>
      </v-col>
    </v-row>
  </v-container>
  <!-- <div class="usulan-container">
    <div class="align-center">
      <h1 >Usulan Berbagi Pengetahuan</h1>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>NARASUMBER</th>
          <th>PENGETAHUAN</th>
          <th>JUMLAH VOTE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in usulanData" :key="item.id">
          <td>{{ item.narasumber }}</td>
          <td>{{ item.pengetahuan }}</td>
          <td>{{ item.jml_vote || 0 }}</td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      usulanData: [], // Tempat menyimpan data tabel
    };
  },
  methods: {
    // Fungsi untuk memanggil API server
    async fetchUsulanData() {
      this.isLoading = true; // Mulai memuat
      try {
        // Panggil api dengan parameter halaman dan limit
        const response = await api.get(`/usulan-pengetahuan`);

        // Simpan data dan informasi paginasi dari server
        this.usulanData = response.data.data;
        // console.log(this.usulanData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        this.isLoading = false; // Selesai memuat
      }
    },
  },
  // Dipanggil saat komponen pertama kali dimuat
  mounted() {
    this.fetchUsulanData(); // Muat data halaman pertama
  },
};
</script>
