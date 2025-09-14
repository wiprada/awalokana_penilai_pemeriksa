<script setup lang="ts">
import Dashboard from '@/components/Dashboard.vue';

</script>

<template>
    <v-app>
        <v-toolbar>
            <v-toolbar-title>Ngobrol</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/dashboard">Dashboard</v-btn>
            <v-btn text to="/about">About</v-btn>
        </v-toolbar>
        <v-main>
            <Dashboard />
        </v-main>
    </v-app>
</template>