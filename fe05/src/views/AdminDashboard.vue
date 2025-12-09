<template>
  <div class="user-dashboard">
    <header class="dashboard-header" style="background-color: honeydew">
      <div class="header-left">
        <img
          src="@/assets/logo.png"
          alt="Logo"
          class="logo"
          style="height: 100px"
        />
        <h1 class="header-title" style="color: darkblue">Dashboard Admin</h1>
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
      <div v-if="activeTab === 'Manajemen User'">
        <h2>Manajemen User</h2>
        <!-- Component for personal evaluation -->
      </div>
      <div v-if="activeTab === 'Manajemen Penilaian'">
        <h2>Manajemen Penilaian</h2>
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
      </div>
    </main>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccountLock, mdiLogout } from "@mdi/js";
import { useRouter } from "vue-router";
import UsulanPengetahuanAdmin from "@/components/UsulanPengetahuanAdmin.vue";
import api from "@/services/api";

export default {
  name: "AdminDashboard",
  components: {
    SvgIcon,
    UsulanPengetahuanAdmin,
  },
  setup() {
    const router = useRouter();
    const signOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    };
    return { signOut };
  },
  data() {
    const tabs = [
      "Manajemen User",
      "Manajemen Penilaian",
      "Manajemen Pengetahuan",
    ];
    return {
      passwordIconPath: mdiAccountLock,
      logoutIconPath: mdiLogout,
      tabs: tabs,
      activeTab: tabs[0],
      usulanPengetahuanList: [],
    };
  },
  methods: {
    async fetchUsulanPengetahuan() {
      try {
        const response = await api.get("/usulan-pengetahuan");
        this.usulanPengetahuanList = response.data.data;
        console.log("Fetched usulan pengetahuan:", response.data.data);
      } catch (error) {
        console.error("Error fetching usulan pengetahuan:", error);
      }
    },
    changePassword() {
      // Implement change password logic here
      console.log("Change password clicked");
      alert("Change password clicked!");
    },
    handleSelesai(id) {
      this.usulanPengetahuanList = this.usulanPengetahuanList.filter(
        (item) => item.id !== id
      );
    },
  },
  mounted() {
    this.fetchUsulanPengetahuan();
  },
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
