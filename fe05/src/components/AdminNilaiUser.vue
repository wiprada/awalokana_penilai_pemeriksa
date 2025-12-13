<template>
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
  <v-row>
    <v-data-table
      :headers="headers"
      :items="progressData"
      :items-per-page="10"
      class="elevation-1"
      :search="search"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn @click="resetPenilaian(item.id_penilai)" color="primary"
          >Reset Penilaian</v-btn
        >
      </template>
    </v-data-table>
  </v-row>
</template>
<script>
import apiClient from "@/services/api";
export default {
  name: "AdminNilaiUser",
  data() {
    return {
      // component data
      progressData: [],
      headers: [
        { title: "ID Penilai", key: "id_penilai", sortable: true },
        { title: "Nama Penilai", key: "penilai", sortable: true },
        { title: "Total Dinilai", key: "total_menilai", sortable: true },
        { title: "Selesai Dinilai", key: "sdh_menilai", sortable: true },
        { title: "Belum Dinilai", key: "blm_menilai", sortable: true },
        { title: "Actions", key: "actions", sortable: false },
      ],
      search: "",
    };
  },
  methods: {
    // component methods
    async fetchProgressData() {
      try {
        const response = await apiClient.get("/penilaian/admin/progress");
        this.progressData = response.data;
        // console.log("Fetched progress data:", this.progressData);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
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
      const filename = `Progress_Penilaian_${timestamp}.csv`;

      const headers = this.headers.map((h) => h.title);
      const keys = this.headers.map((h) => h.key);

      const csvContent = [
        headers.join(","),
        ...this.progressData.map((item) =>
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
    async resetPenilaian(id_penilai) {
      if (
        confirm(
          `Are you sure you want to reset penilaian for ID Penilai: ${id_penilai}?`
        )
      ) {
        try {
          await apiClient.put(`/penilaian/admin/user/${id_penilai}`);
          alert(`Penilaian for ID Penilai: ${id_penilai} has been reset.`);
          this.fetchProgressData(); // Refresh data after reset
        } catch (error) {
          console.error("Error resetting penilaian:", error);
          alert("Failed to reset penilaian. Please try again.");
        }
      }
    },
  },
  mounted() {
    // lifecycle hook
    this.fetchProgressData();
  },
};
</script>
