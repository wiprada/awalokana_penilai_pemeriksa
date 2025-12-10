<template>
  <v-card>
    <v-card-title> Ganti Password </v-card-title>
    <v-divider></v-divider>
    <v-alert v-if="successMessage" type="success" dense>{{
      successMessage
    }}</v-alert>
    <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
    <v-text-field
      v-model="currentPassword"
      name="currentPassword"
      label="Password Saat Ini"
      type="password"
      id="currentPassword"
    ></v-text-field>
    <v-text-field
      v-model="newPassword"
      name="newPassword"
      label="Password Baru"
      type="password"
      id="newPassword"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      name="confirmPassword"
      label="Konfirmasi Password Baru"
      type="password"
      id="confirmPassword"
    ></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="changePassword">Ganti Password</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import apiClient from "@/services/api";
export default {
  componentName: "GantiPassword",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async changePassword() {
      this.errorMessage = "";
      this.successMessage = "";

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Password baru dan konfirmasi tidak sesuai.";
        return;
      }

      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.username) {
          this.errorMessage = "User not found. Please log in again.";
          return;
        }

        const response = await apiClient.post("/auth/change-password", {
          username: user.username,
          oldPassword: this.currentPassword,
          newPassword: this.newPassword,
        });

        if (response.data.message) {
          this.successMessage = "Password berhasil diubah.";
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
        } else {
          this.errorMessage =
            response.data.message || "Gagal mengubah password.";
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          "Terjadi kesalahan saat mengubah password.";
      }
    },
  },
};
</script>
