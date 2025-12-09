<template>
  <v-card
    class="mb-4"
    outlined
    v-for="item in usulanPengetahuanList"
    :key="item.id"
  >
    <v-card-title class="bg-primary">
      Narasumber: {{ item.narasumber }}
    </v-card-title>
    <v-card-text class="pa-4">
      {{ item.pengetahuan }}
    </v-card-text>
    <v-card-text> {{ item.jml_vote || 0 }} votes </v-card-text>
    <v-card-actions>
      <v-btn
        round
        color="primary"
        dark
        @click="voteUp(item.id)"
        :disabled="statusVote[item.id]"
      >
        <v-icon>{{
          statusVote[item.id] ? "mdi-thumb-up" : "mdi-thumb-up-outline"
        }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import apiClient from "@/services/api";
export default {
  // props: {
  //   info: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    const IDUser = JSON.parse(localStorage.getItem("user")).id;
    return {
      usulanPengetahuanList: [],
      statusVote: {}, // Track vote status per item id
      id_user: IDUser,
    };
  },
  emits: ["selesai"],
  methods: {
    async fetchUsulanPengetahuan() {
      try {
        const response = await apiClient.get("/usulan-pengetahuan");
        this.usulanPengetahuanList = response.data.data;
        console.log("Fetched usulan pengetahuan:", response.data.data);
      } catch (error) {
        console.error("Error fetching usulan pengetahuan:", error);
      }
    },
    async checkIfVoted(id) {
      try {
        const response = await apiClient.post("/user-vote/check", {
          id_pengetahuan: id,
          id_user: this.id_user,
        });
        // In Vue 3, direct assignment is reactive.
        this.statusVote[id] = response.data.hasVoted;
      } catch (error) {
        console.error("Error checking vote status:", error);
        this.statusVote[id] = false; // Assume not voted on error
      }
    },
    async voteUp(id) {
      try {
        // TODO: Replace '1' with the actual authenticated user ID
        await apiClient.post(`/user-vote`, {
          id_pengetahuan: id,
          id_user: this.id_user,
        });
        this.$emit("selesai", id);
        // After voting, update the status and refetch the list
        this.statusVote[id] = true;
        this.fetchUsulanPengetahuan();
      } catch (error) {
        console.error("Error voting up:", error);
        alert(
          error.response?.data?.message || "An error occurred while voting."
        );
      }
    },
  },
  mounted() {
    this.fetchUsulanPengetahuan();
  },
  watch: {
    usulanPengetahuanList(newList) {
      // Check vote status for each item when the list is updated
      const user_id = 1; // TODO: Replace '1' with the actual authenticated user ID
      if (user_id && Array.isArray(newList)) {
        newList.forEach((item) => {
          this.checkIfVoted(item.id);
        });
      }
    },
  },
};
</script>
