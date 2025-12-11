<template>
  <v-container fluid wrap width="100%" class="bg-lime-lighten-2">
    <v-row align-content="space-between" no-gutters="true">
      <v-col sm="12" md="2"
        ><v-img
          :src="require('@/assets/logo.png')"
          max-height="100"
          cover
        ></v-img
      ></v-col>
      <v-col sm="12" md="9" class="text-center"
        ><h1>Kepala {{ grup }} : {{ namaPejabat }}</h1></v-col
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
    <v-row align-content="center" no-gutters="true" class="justify-center">
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
    <v-row align-content="center" no-gutters="true">
      <v-col>
        <div v-if="activeTab === 'Kompetensi Personil'">
          <v-row wrap no-gutters="true" justify="space-between">
            <v-col sm="12" md="12" class="pa-1 ma-1">
              <NilaiKelompok />
            </v-col>
          </v-row>
        </div>
        <div v-if="activeTab === 'Manajemen Pengetahuan'">
          <v-row no-gutters="true" justify="space-between">
            <v-col>
              <v-row>
                <v-col
                  v-for="item in usulanPengetahuanList"
                  :key="item.id"
                  sm="12"
                  md="4"
                >
                  <UsulanPengetahuanAdmin
                    :info="item"
                    @selesai="handleSelesai"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import UsulanPengetahuanAdmin from "@/components/UsulanPengetahuanAdmin.vue";
import apiClient from "@/services/api";
import NilaiKelompok from "@/components/NilaiKelompok.vue";
import GantiPassword from "@/components/GantiPassword.vue";

export default {
  name: "PejabatDashboard",
  components: {
    // SvgIcon,
    UsulanPengetahuanAdmin,
    NilaiKelompok,
    GantiPassword,
  },
  data() {
    const tabs = ["Kompetensi Personil", "Manajemen Pengetahuan"];
    return {
      router: useRouter(),
      tabs: tabs,
      activeTab: ref(tabs[0]),
      usulanPengetahuanList: [],
      namaPejabat: null,
      dialog: false,
      grup: null,
    };
  },
  methods: {
    // fungsi mengambil usulan pengetahuan
    async fetchUsulanPengetahuan() {
      try {
        const response = await apiClient.get("/usulan-pengetahuan");
        this.usulanPengetahuanList = response.data.data;
        console.log("Fetched usulan pengetahuan:", response.data.data);
      } catch (error) {
        console.error("Error fetching usulan pengetahuan:", error);
      }
    },
    // fungsi menangani selesai usulan pengetahuan
    handleSelesai(id) {
      this.usulanPengetahuanList = this.usulanPengetahuanList.filter(
        (item) => item.id !== id
      );
    },
    // fungsi sign out
    signOut() {
      // Implement sign-out logic here
      // console.log("User signed out");
      // alert("Sign out clicked!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.namaPejabat = user.nama;
      this.grup = user.grup;
      this.fetchUsulanPengetahuan();
    }
  },
};
</script>
