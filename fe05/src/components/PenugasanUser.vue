<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="8">
      <v-row>
        <v-col v-for="item in penilaianData" :key="item.id" cols="6" sm="4">
          <PenilaianUser :item="item" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import apiClient from "@/services/api";
import PenilaianUser from "./PenilaianUser.vue";
export default {
  name: "PenugasanUser",
  components: {
    PenilaianUser,
  },
  data() {
    return {
      penilaianData: [],
      id_penilai: null,
    };
  },
  methods: {
    async fetchPenilaian() {
      try {
        // Logic to fetch penilaian data
        const response = await apiClient.get(
          `/penilaian/penilai/${this.id_penilai}`
        );
        this.penilaianData = response.data;
        console.log("Fetched penilaian data:", this.penilaianData);
      } catch (error) {
        console.error("Error fetching penilaian data:", error);
      }
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.id_penilai = user.id;
      this.fetchPenilaian();
    }
  },
};
</script>
