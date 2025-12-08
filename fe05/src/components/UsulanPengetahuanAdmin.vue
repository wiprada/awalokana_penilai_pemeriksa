<template>
  <v-card class="mb-4" outlined>
    <v-card-title class="bg-primary"
      >Narasumber: {{ info.narasumber }}</v-card-title
    >
    <v-card-text class="pa-4">
      {{ info.pengetahuan }}
    </v-card-text>
    <v-card-text> {{ info.jml_vote || 0 }} votes </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="selesai(info.id)">
        <v-icon>mdi-checkbox-marked-outline</v-icon>
      </v-btn>
    </v-card-actions>
    <!-- <v-card-text> ID: {{ info.id }} </v-card-text> -->
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
    async selesai(id) {
      try {
        await apiClient.patch(`/usulan-pengetahuan/${id}`);
        this.$emit("selesai", id);
      } catch (error) {
        console.error("Error marking as selesai:", error);
      }
    },
  },
};
</script>
