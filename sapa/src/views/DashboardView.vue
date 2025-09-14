<template>
    <v-container fluid >
        <v-row >
            <v-col cols="4" class="purple lighten-4" >
                <v-card>
                    <v-card-title class="text-h5">Selamat Datang</v-card-title>
                    <v-card-subtitle class="text-h6">Anda login sebagai</v-card-subtitle>
                    <v-card-text>Di Sistem Aplikasi Penilaian Angka Kredit (SAPA)</v-card-text>
                </v-card>             
            </v-col>
            <v-col cols="8" class="text-center">
                <NilaiPersonal />         
            </v-col>
        </v-row>
        <v-row >
            <v-col cols="6" class="text-center"> 
                <h3>disini berisi tugas penilaian</h3>            
            </v-col>
            <v-col cols="6" class="text-center">
                <h3>disini letak manajemen pengetahuan</h3>      
            </v-col>
            <NilaiTugas />

        </v-row>

    </v-container>
</template>
<script>
import { defineComponent } from 'vue';

// Components
import NilaiTugas from '@/components/Nilai_Tugas.vue';
import NilaiPersonal from '@/components/Nilai_Personal.vue';

export default defineComponent({
  name: 'DashboardView',

  components: {
    NilaiTugas,
    NilaiPersonal
  },
});
</script>