<template>
    <v-container fluid >
        <v-row class="bg-deep-purple-darken-3">
            <v-col cols="4">
                <Personil_Pemeriksa/>
                            
            </v-col>
            <v-col cols="8" class="text-center">
                <NilaiPersonal />         
            </v-col>
        </v-row>
        <v-row class="bg-deep-purple-lighten-1 pa-2 mt-1">
            <v-col cols="4" class="text-center"> 
                <NilaiTugas />
            </v-col>
            <v-col cols="8" class="text-left">
                <UsulanPengetahun/>      
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
import { defineComponent } from 'vue';

// Components
import NilaiTugas from '@/components/Nilai_Tugas';
import NilaiPersonal from '@/components/Nilai_Personal';
import UsulanPengetahun from '@/components/Manajemen_Pengetahuan'
import Personil_Pemeriksa from '@/components/Personil_Pemeriksa';

export default defineComponent({
  name: 'DashboardView',

  components: {
    NilaiTugas,
    NilaiPersonal,
    UsulanPengetahun,
    Personil_Pemeriksa
  },
});
</script>