<template>
  <v-container fluid wrap width="100%" class="bg-purple-lighten-2">
    <v-row align-content="space-between" no-gutters="true">
      <v-col sm="12" md="2"
        ><v-img
          :src="require('@/assets/logo.png')"
          max-height="100"
          cover
        ></v-img
      ></v-col>
      <v-col sm="12" md="9" class="text-center"><h1>Dashboard Admin</h1></v-col>
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
    <v-row align-content="stretch" no-gutters="true">
      <v-col>
        <div v-if="activeTab === 'Manajemen User'">
          <v-row wrap no-gutters="true" justify="space-between">
            <v-col>
              <AdminDaftarUser />
            </v-col>
          </v-row>
        </div>
        <div v-if="activeTab === 'Manajemen Penilaian'">
          <AdminNilaiUser />
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
import { useRouter } from "vue-router";
import UsulanPengetahuanAdmin from "@/components/UsulanPengetahuanAdmin.vue";
import GantiPassword from "@/components/GantiPassword.vue";
import api from "@/services/api";
import AdminNilaiUser from "@/components/AdminNilaiUser.vue";
import AdminDaftarUser from "@/components/AdminDaftarUser.vue";

export default {
  name: "AdminDashboard",
  components: {
    UsulanPengetahuanAdmin,
    GantiPassword,
    AdminNilaiUser,
    AdminDaftarUser,
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
      tabs: tabs,
      activeTab: tabs[0],
      usulanPengetahuanList: [],
      dialog: false,
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
