<template>
  <div class="user-dashboard">
    <header class="dashboard-header" style="background-color: pink">
      <div class="header-left">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          class="logo"
          style="height: 100px"
        />
        <h1 class="header-title" style="color: darkblue">
          Dashboard Pejabat Struktural
        </h1>
      </div>
      <div class="header-right">
        <!-- <button
          @click="changePassword"
          class="change-password-button"
          aria-label="Ganti Password"
        >
          <svg-icon type="mdi" :path="passwordIconPath"></svg-icon>
        </button>
        <button @click="signOut" class="signout-button" aria-label="Sign Out">
          <svg-icon type="mdi" :path="logoutIconPath"></svg-icon>
        </button> -->
        <v-spacer></v-spacer>
        <v-btn icon @click="changePassword">
          <v-icon>mdi-lock</v-icon>
        </v-btn>
        <v-btn icon @click="signOut">
          <v-icon>mdi-account-arrow-right-outline</v-icon>
        </v-btn>
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
      <div v-if="activeTab === 'Kompetensi Personil'">
        <h2>Kompetensi Personil</h2>
        <!-- Component for personal evaluation -->
      </div>
      <div v-if="activeTab === 'Manajemen Pengetahuan'">
        <!-- <h2>Manajemen Pengetahuan</h2> -->
        <!-- Component for knowledge management -->
        <UsulanPengetahuanAdmin
          v-for="item in usulanPengetahuanList"
          :key="item.id"
          :info="item"
          @selesai="handleSelesai"
        />
        <!-- <v-list v-for="item in usulanPengetahuanList" :key="item.id">
          {{ item.narasumber }}: {{ item.pengetahuan }}
        </v-list> -->
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
// import SvgIcon from "@jamescoyle/vue-icon";
// import { mdiAccountLock, mdiLogout } from "@mdi/js";
import UsulanPengetahuanAdmin from "@/components/UsulanPengetahuanAdmin.vue";
import api from "@/services/api";

export default {
  name: "PejabatDashboard",
  components: {
    // SvgIcon,
    UsulanPengetahuanAdmin,
  },
  setup() {
    // const passwordIconPath = mdiAccountLock;
    // const logoutIconPath = mdiLogout;

    const tabs = ["Kompetensi Personil", "Manajemen Pengetahuan"];
    const activeTab = ref(tabs[0]);
    const usulanPengetahuanList = ref([]);

    const fetchUsulanPengetahuan = async () => {
      try {
        const response = await api.get("/usulan-pengetahuan");
        usulanPengetahuanList.value = response.data.data;
        console.log("Fetched usulan pengetahuan:", response.data.data);
      } catch (error) {
        console.error("Error fetching usulan pengetahuan:", error);
      }
    };

    onMounted(() => {
      fetchUsulanPengetahuan();
    });

    const handleSelesai = (id) => {
      usulanPengetahuanList.value = usulanPengetahuanList.value.filter(
        (item) => item.id !== id
      );
    };

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

    return {
      // passwordIconPath,
      // logoutIconPath,
      tabs,
      activeTab,
      usulanPengetahuanList,
      changePassword,
      signOut,
      handleSelesai,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
.user-dashboard {
  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
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
