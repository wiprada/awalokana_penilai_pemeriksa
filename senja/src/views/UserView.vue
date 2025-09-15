<template lang="">
    <v-toolbar>
    <v-toolbar-title>Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/" @click="logout">Logout</v-btn>
  </v-toolbar>
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="8" class="mb-4">
                <UserNilai />
            </v-col>
            <v-col cols="4" class="mb-4">
                <UserTugas />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" >
                <UserPengetahuan />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import UserNilai from '../components/UserNilai.vue'
import UserTugas from '../components/UserTugas.vue'
import UserPengetahuan from '../components/UserPengetahuan.vue'

export default {
    name: 'UserView',
    components: {
        UserNilai,
        UserTugas,
        UserPengetahuan
    },
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            this.$router.push('/');
        }
    }
}
</script>
<style lang="">
    
</style>