<template>
  <v-container fluid wrap width="100%" class="bg-orange-lighten-2">
    <v-row align-content="space-between" no-gutters>
      <v-col sm="12" md="2"
        ><v-img
          :src="require('@/assets/logo.png')"
          max-height="100"
          cover
        ></v-img
      ></v-col>
      <v-col sm="12" md="9" class="text-center"
        ><h2>Dashboard Pemeriksa : {{ nama }}</h2></v-col
      >
      <v-col sm="6" md="1" class="pa-1" self-align="end">
        <v-btn @click="dialog = true">
          <v-icon>mdi-lock</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <GantiPassword />
          <v-btn @click="dialog = false"> Selesai </v-btn>
        </v-dialog>
        <v-btn @click="signOut">
          <v-icon>mdi-account-arrow-right-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid wrap width="100%" class="bg-secondary">
    <v-row align-content="center" no-gutters class="justify-center">
      <v-col
        v-for="tab in tabs"
        :key="tab"
        sm="12"
        md="3"
        class="d-flex justify-space-between pa-1"
      >
        <v-btn
          block
          color="background"
          dark
          elevation="10"
          @click="activeTab = tab"
        >
          {{ tab }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid wrap width="100%">
    <v-row align-content="stretch" no-gutters>
      <v-col>
        <div v-if="activeTab === 'Nilai Personal'">
          <v-row wrap no-gutters justify="space-between">
            <v-col sm="12" md="3" class="pa-1 ma-1">
              <UserNilai />
            </v-col>
            <v-col sm="12" md="7" class="pa-1 ma-1">
              <UserKomentar />
            </v-col>
          </v-row>
        </div>
        <div v-if="activeTab === 'Penilaian'">
          <PenugasanUser />
        </div>
        <div v-if="activeTab === 'Manajemen Pengetahuan'">
          <v-row wrap no-gutters justify="space-between">
            <v-col sm="12" md="3" class="pa-1 ma-1">
              <UsulanPengetahuanTambah />
            </v-col>
            <v-col sm="12" md="7" class="pa-1 ma-1">
              <UsulanPengetahuanUser />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from "vue-router";
import api from "@/services/api";
import UsulanPengetahuanUser from "@/components/UsulanPengetahuanUser.vue";
import UsulanPengetahuanTambah from "@/components/UsulanPengetahuanTambah.vue"; // entah kenapa tidak bisa ganti nama
import PenugasanUser from "@/components/PenugasanUser.vue";
import UserKomentar from "@/components/UserKomentar.vue";
import UserNilai from "@/components/UserNilai.vue";
import GantiPassword from "@/components/GantiPassword.vue";

export default {
  name: "UserDashboard",
  components: {
    UsulanPengetahuanUser,
    UsulanPengetahuanTambah,
    PenugasanUser,
    UserKomentar,
    UserNilai,
    GantiPassword,
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
      dialog: false,
    };
  },
  methods: {
    async fetchUsulanPengetahuan() {
      try {
        const response = await api.get("/usulan-pengetahuan");
        this.usulanPengetahuanList = response.data.data;
        // console.log("Fetched usulan pengetahuan:", response.data.data);
      } catch (error) {
        console.error("Error fetching usulan pengetahuan:", error);
      }
    },
  },
  mounted() {
    this.fetchUsulanPengetahuan();
  },
};
</script>
