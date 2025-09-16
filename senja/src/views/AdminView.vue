<template>
  <v-toolbar class="bg-purple">
    <v-toolbar-title>Admin Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/" @click="logout">Logout</v-btn>
  </v-toolbar>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="4" class="bg-purple-darken-1">
        <AdminUser />
      </v-col>
      <v-col cols="4" class="bg-purple-darken-2">
        <AdminTugas />
      </v-col>
      <v-col cols="4" class="bg-purple-darken-3">
        <AdminUsulan />
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import AdminUser from '@/components/AdminUser.vue';
import AdminTugas from '@/components/AdminTugas.vue';
import AdminUsulan from '@/components/AdminUsulan.vue';

export default defineComponent({
  name: 'AdminView',

  components: {
    AdminUser,
    AdminTugas,
    AdminUsulan,
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
