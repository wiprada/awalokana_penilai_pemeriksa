<template>
  <v-card class="mb-4" outlined>
    <v-card-title class="bg-primary text-background"
      >Narasumber: {{ info.narasumber }}</v-card-title
    >
    <v-card-text class="pa-4">
      {{ info.pengetahuan }}
    </v-card-text>
    <v-card-text> {{ info.jml_vote || 0 }} votes </v-card-text>
    <v-card-actions class="justify-center bg-lime">
      <v-btn color="background" @click="selesai(info.id)">
        <v-icon>mdi-checkbox-marked-outline</v-icon>
        <h4>Sudah dilaksanakan</h4>
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
