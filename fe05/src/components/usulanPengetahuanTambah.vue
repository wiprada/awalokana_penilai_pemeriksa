<template>
  <v-card class="pa-4 mb-4" outlined>
    <v-card-title> Tambah Usulan Pengetahuan </v-card-title>
    <v-form v-if="nama.length">
      <v-autocomplete
        clearable
        label="Usulkan Narasumber"
        v-model="narasumber"
        :items="nama"
        variant="solo"
      >
      </v-autocomplete>
      <v-textarea
        clearable
        label="Usulan Materi"
        variant="solo"
        v-model="materi"
      ></v-textarea>
      <v-btn color="success" @click="usulkanPengetahuan"
        >Usulkan Pengetahuan yang Dibagi</v-btn
      >
    </v-form>
  </v-card>
</template>
<script>
import api from "@/services/api";
export default {
  name: "UsulanPengetahuanTambah",
  components: {},
  data() {
    return {
      narasumber: "",
      materi: "",
      nama: [],
    };
  },
  methods: {
    usulkanPengetahuan() {
      // Implement the logic to submit the knowledge proposal
      console.log("Usulan Pengetahuan:", this.narasumber, this.materi);
      // You can add an API call here to submit the data to the backend
      // TODO: Replace 'Current User' with the actual name of the logged-in user
      const pengusul = "Current User";
      api.post("/usulan-pengetahuan", {
        pengusul: pengusul,
        narasumber: this.narasumber,
        pengetahuan: this.materi,
      });
      alert(
        `Usulan Pengetahuan dari ${this.narasumber} dengan materi "${this.materi}" telah diajukan.`
      );
      // Clear the form
      this.narasumber = "";
      this.materi = "";
    },
    async fetchName() {
      // Fetch the list of names for the autocomplete
      try {
        const response = await api.get("/users/names");
        this.nama = response.data.pegawai;
        console.log("Fetched names:", this.nama);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    },
  },
  mounted() {
    this.fetchName();
  },
};
</script>
