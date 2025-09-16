<template lang="">
    <v-card>
        <v-table fixed-header height="400px" striped="even" hover>
            <thead>
            <tr>
                <th class="text-left">
                Nama
                </th>
                <th class="text-center">
                Perencanaan
                </th>
                <th class="text-center">
                Pelaksanaan
                </th>
                <th class="text-center">
                Pelaporan
                </th>
                <th class="text-center">
                Pelayanan
                </th>
                <th class="text-center">
                Akuntabel
                </th>
                <th class="text-center">
                Kompeten
                </th>
                <th class="text-center">
                Harmoni
                </th>
                <th class="text-center">
                Loyalitas
                </th>
                <th class="text-center">
                Adaptif
                </th>
                <th class="text-center">
                Kolaboratif
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in staf" :key="item.id">
                <td>{{ item.nama }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.perencanaan) }"
                >{{ Number(item.perencanaan).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.pelaksanaan) }"
                >{{ Number(item.pelaksanaan).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.pelaporan) }"
                >{{ Number(item.pelaporan).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.pelayanan) }"
                >{{ Number(item.pelayanan).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.akuntabel) }"
                >{{ Number(item.akuntabel).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.kompeten) }"
                >{{ Number(item.kompeten).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.harmoni) }"
                >{{ Number(item.harmoni).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.loyal) }"
                >{{ Number(item.loyal).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.adaptif) }"
                >{{ Number(item.adaptif).toFixed(2) }}</td>
                <td 
                class="text-center"
                :style="{ backgroundColor: getBgColor(item.kolaboratif) }"
                >{{ Number(item.kolaboratif).toFixed(2) }}</td>
            </tr>
            </tbody>
        </v-table>
        <v-card-actions class="justify-end">
            <v-btn color="success" @click="downloadExcel">Unduh CSV</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

export default {
    name: 'StrukturalNilai',

    data() {
        return {
            staf: []
        };
    },

    methods: {
        async fetchStaf() {
            try {
                const grup = this.$route.params.grup;
                const response = await axios.get('/api/staf/' + grup);
                this.staf = response.data.hasil;
                console.log(response.data.pesan);
            } catch (error) {
                console.error('Error fetching staf:', error);
            }
        },
        getBgColor(value) {
            // Example: return a color based on value, adjust as needed
            if (value >= 2.5) return '#1E88E5'; // blue for high scores
            if (value >= 2) return '#81C784'; // green for medium scores
            if (value >= 1.5) return '#FB8C00'; // yellow for low
            return '#E64A19'; // red for low scores

        },
        async downloadExcel() {
            if (!this.staf.length) return;
            const header = [
                'Nama', 'Perencanaan', 'Pelaksanaan', 'Pelaporan', 'Pelayanan',
                'Akuntabel', 'Kompeten', 'Harmoni', 'Loyalitas', 'Adaptif', 'Kolaboratif'
            ];
            const rows = this.staf.map(item => [
                item.nama,
                Number(item.perencanaan).toFixed(2),
                Number(item.pelaksanaan).toFixed(2),
                Number(item.pelaporan).toFixed(2),
                Number(item.pelayanan).toFixed(2),
                Number(item.akuntabel).toFixed(2),
                Number(item.kompeten).toFixed(2),
                Number(item.harmoni).toFixed(2),
                Number(item.loyal).toFixed(2),
                Number(item.adaptif).toFixed(2),
                Number(item.kolaboratif).toFixed(2)
            ]);
            const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            const now = new Date();
            // butuh sepanjang ini hanya untuk memastikan format tanggal yang sesuai
            const formattedDate = now.getFullYear() + '-' +
                String(now.getMonth() + 1).padStart(2, '0') + '-' +
                String(now.getDate()).padStart(2, '0') + '_' +
                String(now.getHours()).padStart(2, '0') + '-' +
                String(now.getMinutes()).padStart(2, '0');
            link.setAttribute('download', 'nilai_pemeriksa_' + this.$route.params.grup + '_' + formattedDate + '.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },

    mounted() {
        this.fetchStaf();
    },
};
</script>
<style lang="">
    
</style>