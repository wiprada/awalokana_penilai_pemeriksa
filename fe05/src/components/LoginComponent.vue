<template>
  <v-card class="pa-4">
    <v-card-title class="text-h5">Login</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          v-model="username"
          label="Username"
          prepend-inner-icon="mdi-account"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          prepend-inner-icon="mdi-lock"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary" block class="mt-2">Login</v-btn>
      </v-form>
      <div
        v-if="loginMessage"
        class="mt-4 text-center"
        :class="isError ? 'text-red' : 'text-green'"
      >
        {{ loginMessage }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from "vue";
import apiClient from "@/services/api";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const loginMessage = ref("");
    const isError = ref(false);

    const handleLogin = async () => {
      loginMessage.value = "";
      isError.value = false;
      try {
        const response = await apiClient.post("/auth/login", {
          username: username.value,
          password: password.value,
        });
        loginMessage.value = response.data.message;
        // You would typically save the token here (e.g., in localStorage)
        // and update the application state (e.g., using Vuex or Pinia)
        console.log("Token:", response.data.token);
      } catch (error) {
        isError.value = true;
        loginMessage.value =
          error.response?.data?.message || "An error occurred during login.";
        console.error("Login failed:", error);
      }
    };

    return {
      username,
      password,
      loginMessage,
      isError,
      handleLogin,
    };
  },
};
</script>
