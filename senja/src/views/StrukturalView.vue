<template lang="">
    <v-toolbar class="bg-pink-darken-4">
    <v-toolbar-title>Dashboard Kepala  {{ this.$route.params.grup }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="text" to="/" @click="logout">Logout</v-btn>
  </v-toolbar>
    <v-container>
        <h1>Kompetensi Pemeriksa</h1>
        <StrukturalNilai />
    </v-container>
    <v-container>
        <AdminUsulan />
        
    </v-container>
</template>
<script>
import { defineComponent } from 'vue';


import StrukturalNilai from '@/components/StrukturalNilai.vue';
import AdminUsulan from '@/components/AdminUsulan.vue';

export default defineComponent({
    name: 'StrukturalView',

    components: {
        StrukturalNilai,
        AdminUsulan
    },

    methods: {
        logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('grup');
            localStorage.removeItem('nama');
            localStorage.removeItem('username');
            this.$router.push('/');
        }
    }  
});
</script>
