<template>
  <div>
    <h2>Saran dari Penilai</h2>
  </div>
  <v-sheet v-for="item in komentarPersonal" :key="item.id_penilaian">
    <ul>
      <li>{{ item.kualitatif }}</li>
    </ul>
    <!-- <p>{{ item.kualitatif }}</p> -->
    <v-divider></v-divider>
  </v-sheet>
</template>
<script>
import apiClient from "@/services/api";
export default {
  name: "UserNilai",
  data() {
    return {
      komentarPersonal: [],
      id_pegawai: null,
    };
  },
  methods: {
    async fetchKomentar() {
      try {
        // Logic to fetch komentar data
        const response = await apiClient.get(
          `/penilaian/kualitatif/${this.id_pegawai}`
        );
        this.komentarPersonal = response.data;
        console.log("Fetched komentar data:", this.komentarPersonal);
      } catch (error) {
        console.error("Error fetching komentar data:", error);
      }
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.id_pegawai = user.id;
      this.fetchKomentar();
    }
  },
};
</script>
