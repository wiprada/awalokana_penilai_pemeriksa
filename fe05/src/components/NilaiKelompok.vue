<template>
  <v-card flat>
    <v-card-title>
      Nilai: {{ this.grup }}
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="downloadCSV" color="primary" class="ml-4"
            >Download CSV</v-btn
          >
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="NilaiKelompok"
      :items-per-page="10"
      class="elevation-1"
      :search="search"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn @click="fetchKomentar(item.id_dinilai)" color="primary"
          >Komentar</v-btn
        >
      </template>
      <template #[`item.rik_renc`]="{ item }">
        {{ Number(item.rik_renc).toFixed(2) }}
      </template>
      <template #[`item.rik_laks`]="{ item }">
        {{ Number(item.rik_laks).toFixed(2) }}
      </template>
      <template #[`item.rik_lap`]="{ item }">
        {{ Number(item.rik_lap).toFixed(2) }}
      </template>
      <template #[`item.pelayanan`]="{ item }">
        {{ Number(item.pelayanan).toFixed(2) }}
      </template>
      <template #[`item.akuntabel`]="{ item }">
        {{ Number(item.akuntabel).toFixed(2) }}
      </template>
      <template #[`item.kompeten`]="{ item }">
        {{ Number(item.kompeten).toFixed(2) }}
      </template>
      <template #[`item.harmoni`]="{ item }">
        {{ Number(item.harmoni).toFixed(2) }}
      </template>
      <template #[`item.loyal`]="{ item }">
        {{ Number(item.loyal).toFixed(2) }}
      </template>
      <template #[`item.adaptif`]="{ item }">
        {{ Number(item.adaptif).toFixed(2) }}
      </template>
      <template #[`item.kolaboratif`]="{ item }">
        {{ Number(item.kolaboratif).toFixed(2) }}
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-row no-gutters="true" class="pa-4" justify="space-evenly">
      <v-col>
        <h2 class="align-center">Komentar Penilai</h2>
        <v-row v-if="komentarData.length > 0">
          <v-col
            v-for="(komentar, index) in komentarData"
            :key="index"
            class="ma-2"
            sm="12"
            md="5"
          >
            {{ komentar.kualitatif }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import apiClient from "@/services/api";
export default {
  name: "NilaiKelompok",
  data() {
    return {
      grup: null,
      NilaiKelompok: [],
      search: "",
      komentarData: [],
      headers: [
        {
          title: "NIP",
          align: "start",
          //   sortable: true,
          key: "id_dinilai",
        },
        {
          title: "Nama",
          align: "start",
          //   sortable: true,
          key: "dinilai",
        },
        { title: "Perencanaan", sortable: true, key: "rik_renc" },
        { title: "Pelaksanaan", sortable: true, key: "rik_laks" },
        { title: "Pelaporan", sortable: true, key: "rik_lap" },
        { title: "Pelayanan", sortable: true, key: "pelayanan" },
        { title: "Akuntabel", sortable: true, key: "akuntabel" },
        { title: "Kompeten", sortable: true, key: "kompeten" },
        { title: "Harmonis", sortable: true, key: "harmoni" },
        { title: "Loyalitas", sortable: true, key: "loyal" },
        { title: "Adaptif", sortable: true, key: "adaptif" },
        { title: "Kolaboratif", sortable: true, key: "kolaboratif" },
        { title: "Actions", key: "actions", sortable: false },
      ],
    };
  },

  methods: {
    fetchNilaiKelompok() {
      //fungsi untuk mengambil data nilai kelompok dari API
      apiClient
        .get(`/penilaian/kelompok/${this.grup}`)
        .then((response) => {
          this.NilaiKelompok = response.data;
          console.log("Fetched nilai kelompok:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching nilai kelompok:", error);
        });
    },
    fetchKomentar(id_dinilai) {
      apiClient
        .get(`/penilaian/kualitatif/${id_dinilai}`)
        .then((response) => {
          this.komentarData = response.data;
          console.log("Fetched Komentar:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching komentar:", error);
        });
    },
    downloadCSV() {
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(
        now.getHours()
      ).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(
        now.getSeconds()
      ).padStart(2, "0")}`;
      const filename = `${this.grup}_${timestamp}.csv`;

      const headers = this.headers.map((h) => h.title);
      const keys = this.headers.map((h) => h.key);

      const csvContent = [
        headers.join(","),
        ...this.NilaiKelompok.map((item) =>
          keys.map((key) => item[key]).join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.href) {
        URL.revokeObjectURL(link.href);
      }
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    //ambil data dari localstorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.grup = user.grup;
      this.fetchNilaiKelompok();
    }
  },
};
</script>
