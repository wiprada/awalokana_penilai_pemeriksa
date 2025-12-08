<template>
  <v-card class="mb-4" outlined>
    <v-card-title class="bg-primary">
      Narasumber: {{ info.narasumber }}
    </v-card-title>
    <v-card-text class="pa-4">
      {{ info.pengetahuan }}
    </v-card-text>
    <v-card-text> {{ info.jml_vote || 0 }} votes </v-card-text>
    <v-card-actions>
      <v-btn round color="primary" dark @click="voteUp(info.id)">
        <v-icon>mdi-thumb-up-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import apiClient from "@/services/api";
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  emits: ["selesai"],
  methods: {
    async voteUp(id) {
      try {
        await apiClient.post(`/user-vote`, { id_pengetahuan: id });
        this.$emit("selesai", id);
      } catch (error) {
        console.error("Error voting up:", error);
      }
    },
  },
};
</script>
