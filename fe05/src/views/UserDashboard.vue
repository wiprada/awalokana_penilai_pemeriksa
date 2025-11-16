<template>
  <div class="user-dashboard">
    <header class="dashboard-header" style="background-color: lightblue">
      <div class="header-left">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          class="logo"
          style="height: 100px"
        />
        <h1 class="header-title" style="color: darkblue">
          Dashboard Pemeriksa
        </h1>
      </div>
      <div class="header-right">
        <button
          @click="changePassword"
          class="change-password-button"
          aria-label="Ganti Password"
        >
          <svg-icon type="mdi" :path="passwordIconPath"></svg-icon>
        </button>
        <button @click="signOut" class="signout-button" aria-label="Sign Out">
          <svg-icon type="mdi" :path="logoutIconPath"></svg-icon>
        </button>
      </div>
    </header>

    <nav class="dashboard-tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </nav>

    <main class="tab-content">
      <!-- Render content based on activeTab -->
      <div v-if="activeTab === 'Nilai Personal'">
        <h2>Nilai Personal</h2>
        <!-- Component for personal evaluation -->
      </div>
      <div v-if="activeTab === 'Penilaian'">
        <h2>Penilaian</h2>
        <!-- Component for main evaluation tasks -->
      </div>
      <div v-if="activeTab === 'Manajemen Pengetahuan'">
        <h2>Manajemen Pengetahuan</h2>
        <!-- Component for knowledge management -->
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccountLock, mdiLogout } from "@mdi/js";

const passwordIconPath = mdiAccountLock;
const logoutIconPath = mdiLogout;

const tabs = ["Nilai Personal", "Penilaian", "Manajemen Pengetahuan"];
const activeTab = ref(tabs[0]);

const changePassword = () => {
  // Implement change password logic here
  console.log("Change password clicked");
  alert("Change password clicked!");
};

const signOut = () => {
  // Implement sign-out logic here
  console.log("User signed out");
  alert("Sign out clicked!");
};
</script>

<style scoped>
.user-dashboard {
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 40px;
}

.header-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.change-password-button,
.signout-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
}

.change-password-button:hover,
.signout-button:hover {
  background-color: #f0f0f0;
}

.dashboard-tabs {
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.tab-button {
  padding: 1rem 1.5rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: #555;
  border-bottom: 3px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.tab-button:hover {
  color: #007bff;
}

.tab-button.active {
  color: #007bff;
  border-bottom-color: #007bff;
  font-weight: 600;
}

.tab-content {
  padding: 2rem;
}
</style>
