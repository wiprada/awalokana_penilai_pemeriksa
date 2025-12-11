<template>
  <div class="usulan-container">
    <div>
      <h1 class="align-center">Usulan Berbagi Pengetahuan</h1>
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
  </div>
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
        console.log(this.usulanData);
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

<style scoped>
.usulan-container {
  margin: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px 15px;
  text-align: left;
  align-items: first baseline;
  border-bottom: 1px solid #dee2e6;
}

.table thead th {
  align-content: center;
  text-align: center;
  font-weight: 600;
}

/* Zebra-striping */
.table tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Highlight on hover */
.table tbody tr:hover {
  background-color: #cce5ff; /* Light blue highlight */
  color: #004085;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.table tbody tr {
  transition: background-color 0.2s ease-in-out;
}
</style>
