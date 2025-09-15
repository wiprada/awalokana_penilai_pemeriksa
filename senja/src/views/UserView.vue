<template lang="">
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="6" class="text-center">
                <UserNilai />
            </v-col>
            <v-col cols="6" class="text-center">
                <UserTugas />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center">
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
    }
}
</script>
<style lang="">
    
</style>