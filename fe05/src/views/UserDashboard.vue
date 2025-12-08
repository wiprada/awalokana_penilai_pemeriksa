<template>
  <div class="user-dashboard">
    <v-app-bar class="bg-warning">
      <v-toolbar-title>Dashboard Pemeriksa</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="changePassword">
        <v-icon>mdi-lock</v-icon>
      </v-btn>
      <v-btn icon @click="signOut">
        <v-icon>mdi-account-arrow-right-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <nav class="dashboard-tabs d-flex ga-2">
      <button
        class="bg-accent ml-2 mt-5 pa-3 rounded-lg"
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </nav>
    <main class="tab-content d-flex ma-2">
      <!-- Render content based on activeTab -->
      <div v-if="activeTab === 'Nilai Personal'">
        <h2>Nilai Personal</h2>
        <!-- Component for personal evaluation -->
      </div>
      <div v-if="activeTab === 'Penilaian'">
        <h2>Penilaian</h2>
        <!-- Component for main evaluation tasks -->
      </div>
      <div
        v-if="activeTab === 'Manajemen Pengetahuan'"
        class="bg-background text-warning align-items-center"
      >
        <!-- <h2 class="text-center">Manajemen Pengetahuan</h2> -->
        <!-- Component for knowledge management -->
        <UsulanPengetahuanUser
          v-for="item in usulanPengetahuanList"
          :key="item.id"
          :info="item"
        />
      </div>
    </main>
  </div>
</template>

<script>
import api from "@/services/api";
import UsulanPengetahuanUser from "@/components/UsulanPengetahuanUser.vue";

export default {
  name: "UserDashboard",
  components: {
    UsulanPengetahuanUser,
  },
  data() {
    const tabs = ["Nilai Personal", "Penilaian", "Manajemen Pengetahuan"];
    return {
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
    signOut() {
      // Implement sign-out logic here
      console.log("User signed out");
      alert("Sign out clicked!");
    },
  },
  mounted() {
    this.fetchUsulanPengetahuan();
  },
};
</script>
