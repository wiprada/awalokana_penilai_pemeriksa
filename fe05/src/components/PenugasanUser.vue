<template>
  <v-container fluid class="bg-info">
    <v-row no-gutters justify="space-evenly" align-content="center">
      <v-col>
        <v-row no-gutters>
          <v-col
            v-for="item in penilaianData"
            :key="item.id_penilaian"
            sm="12"
            md="4"
          >
            <PenilaianUser
              :item="item"
              @penilaian-saved="handlesavePenilaian"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
        // console.log("Fetched penilaian data:", this.penilaianData);
      } catch (error) {
        console.error("Error fetching penilaian data:", error);
      }
    },
    handlesavePenilaian() {
      this.fetchPenilaian();
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
