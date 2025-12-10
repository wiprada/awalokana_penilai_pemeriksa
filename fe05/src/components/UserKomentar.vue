<template>
  <v-container fluid wrap width="100%">
    <v-row>
      <v-col> Saran dari Penilai </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          v-for="item in komentarPersonal"
          :key="item.id_penilaian"
          class="ma-2 pa-2"
          outlined
        >
          <v-card-text>
            {{ item.kualitatif }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
