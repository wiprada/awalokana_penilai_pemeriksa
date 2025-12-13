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
        <v-alert :type="isError ? 'error' : 'success'" density="compact">
          {{ loginMessage }}
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import apiClient from "@/services/api";
import { useRouter } from "vue-router";

export default {
  name: "LoginComponent",
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      username: "",
      password: "",
      loginMessage: "",
      isError: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loginMessage = "";
      this.isError = false;
      try {
        const response = await apiClient.post("/auth/login", {
          username: this.username,
          password: this.password,
        });
        this.loginMessage = response.data.message;

        // Save token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // console.log("Login successful:", response.data);

        // Redirect based on role
        const user = response.data.user;

        if (user.role === "admin") {
          this.$router.push("/admin");
        } else if (user.role === "struktural") {
          this.$router.push("/pejabat");
        } else if (user.role === "pemeriksa") {
          this.$router.push(`/user`);
        } else {
          this.$router.push("/"); // Fallback to home
        }
      } catch (error) {
        this.isError = true;
        this.loginMessage =
          error.response?.data?.message || "An error occurred during login.";
        console.error("Login failed:", error);
      }
    },
  },
};
</script>
