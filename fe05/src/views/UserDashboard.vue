<template>
  <div class="user-dashboard">
    <v-app-bar class="bg-warning">
      <v-toolbar-title
        >Dashboard Pemeriksa
        <v-spacer>
          {{ nama }}
        </v-spacer>
      </v-toolbar-title>
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
        <!-- <h2>Penilaian</h2> -->
        <PenugasanUser />
      </div>
      <div
        v-if="activeTab === 'Manajemen Pengetahuan'"
        class="bg-background text-warning align-items-center"
      >
        <!-- <h2 class="text-center">Manajemen Pengetahuan</h2> -->
        <!-- Component for knowledge management -->
        <v-row>
          <v-col cols="4">
            <UsulanPengetahuanTambah />
          </v-col>
          <v-col cols="8">
            <UsulanPengetahuanUser />
          </v-col>
        </v-row>
      </div>
    </main>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import api from "@/services/api";
import UsulanPengetahuanUser from "@/components/UsulanPengetahuanUser.vue";
import UsulanPengetahuanTambah from "@/components/UsulanPengetahuanTambah.vue";
// import PenilaianUser from "@/components/PenilaianUser.vue";
import PenugasanUser from "@/components/PenugasanUser.vue";

export default {
  name: "UserDashboard",
  components: {
    UsulanPengetahuanUser,
    UsulanPengetahuanTambah,
    // PenilaianUser,
    PenugasanUser,
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
    const tabs = ["Nilai Personal", "Penilaian", "Manajemen Pengetahuan"];
    const namaUser = JSON.parse(localStorage.getItem("user")).nama;
    return {
      tabs: tabs,
      activeTab: tabs[0],
      usulanPengetahuanList: [],
      nama: namaUser,
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
  },
  mounted() {
    this.fetchUsulanPengetahuan();
  },
};
</script>
