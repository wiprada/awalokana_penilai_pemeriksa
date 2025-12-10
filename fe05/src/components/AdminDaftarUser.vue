<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col v-for="item in DaftarUser" :key="item.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>
            {{ item.nip }}
          </v-card-title>
          <v-img contain height="auto" :src="item.fotolink"></v-img>
          <v-card-text>
            <p>NIP Lama: {{ item.id }}</p>
            <p>Nama: {{ item.nama }}</p>
            <p>Email: {{ item.email }}</p>
            <p>Unit Kerja: {{ item.grup }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="resetPassword(item.id)"
              >Reset Password</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import apiClient from "@/services/api";
export default {
  componentName: "AdminDaftarUser",
  data() {
    return {
      DaftarUser: [],
    };
  },
  methods: {
    async fetchDaftarUser() {
      try {
        const response = await apiClient.get("/users");
        this.DaftarUser = response.data;
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    },
    async resetPassword(userId) {
      try {
        await apiClient.post(`/users/reset-password/${userId}`);
        alert(`Password for user ID ${userId} has been reset.`);
      } catch (error) {
        console.error("Error resetting password:", error);
        alert(`Failed to reset password for user ID ${userId}.`);
      }
    },
  },
  mounted() {
    this.fetchDaftarUser();
  },
};
</script>
