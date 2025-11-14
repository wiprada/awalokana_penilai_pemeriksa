<template>
    <v-toolbar class="bg-green-darken-4">
        <v-btn icon @click="pulang">
            <v-icon large>mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn variant="text" @click="logout">Logout</v-btn>
    </v-toolbar>
    <v-container class="pa-4 align-center" grid-list-sm >
        <v-card cols="12" class="pa-4 mb-4">
            <v-card-title>Penilaian Kinerja Pemeriksa</v-card-title>
            
            <v-list grid-list-sm>
                <v-list-item
                    v-for="t in tugas_menilai"
                    :key="t.id_penilaian"
                    
                >
                    <v-sheet cols="12" class="pa-2 align-center bg-grey-lighten-4 d-flex flex-wrap">
                        <v-col cols="4" class="text-end" justify-center>
                            <v-img
                                :src="t.fotolink"
                                alt="Foto Pemeriksa"
                                width="150"
                                height="200"
                                class="rounded-xl"
                                cover
                            >
        
                            </v-img>

                        </v-col>
                        <v-col cols="8">
                            <v-card-subtitle primary-title class="mt-2">
                                {{ t.dinilai }}
                            </v-card-subtitle>
                            <v-card-text>
                                {{ t.id_dinilai }}
                            </v-card-text>
    
                            <v-divider></v-divider>
                            <v-btn icon @click="BukaDialog(t)" small :disabled="t.status === 1">
                                <v-icon size="small">mdi-pencil</v-icon>
                            </v-btn>

                        </v-col>
                        

                    </v-sheet>
                    
                </v-list-item>
            </v-list>
        </v-card>

        <v-dialog v-model="dialog" max-width="900" persistent>
            <v-card v-if="editedItem">
                <v-card-title >
                    <span class="text-h5">Form Penilaian Kinerja: {{ editedItem.dinilai }} {{ editedItem.id_dinilai }}</span>
                </v-card-title>
                
                <v-card-text>
                    <v-container>
                        <v-row class="d-flex flex-wrap" justify-center>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Perencanaan Pemeriksaan:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiPerencanaan"
                                    label="Perencanaan Pemeriksaan"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Pelaksanaan Pemeriksaan:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiPelaksanaan"
                                    label="Pelaksanaan Pemeriksaan"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Pelaporan Pemeriksaan:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiPelaporan"
                                    label="Pelaporan Pemeriksaan"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Berorientasi Pelayanan:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiPelayanan"
                                    label="Pelayanan"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Akuntabilitas:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiAkuntabel"
                                    label="Akuntabilitas"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Kompetensi:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiKompeten"
                                    label="Kompetensi"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Harmonis:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiHarmonis"
                                    label="Harmonis"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Loyalitas:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiLoyalitas"
                                    label="Loyalitas"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Adaptif:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiAdaptif"
                                    label="Adaptif"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="4" class="bg-grey-lighten-2 pa-4 rounded-xl text-center">
                                <h4>
                                    Kolaboratif:
                                </h4>
                                <v-rating
                                    hover
                                    :length="3"
                                    :size="50"
                                    :model-value="2"
                                    active-color="primary"
                                    empty-icon="mdi-thumb-up-outline"
                                    full-icon="mdi-thumb-up"
                                    v-model="editedItem.NilaiKolaboratif"
                                    label="Kolaboratif"
                                />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="8" class="bg-grey-lighten-4 pa-4 rounded-xl text-center">
                                <v-text-field
                                    label="Kualitatif: Berikan komentar atau saran untuk pemeriksa"
                                    name="name"
                                    v-model="editedItem.kualitatif"
                                    rows="4"
                                    textarea
                                    auto-grow
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="TutupDialog">
                        Cancel
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="elevated" @click="SimpanPenilaian">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
        
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/'
});

export default defineComponent({
    name: 'PenilaianView',
    props: {
        id_penilai: {
            type: String,
            required: true
        },
        id_st: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            tugas_menilai: [],
            nama: '',
            dialog: false,
            editedItem: {
                id_penilaian: '',
                dinilai: '',
                id_dinilai: '',
                fotolink: '',
                NilaiPerencanaan: 0,
                NilaiPelaksanaan: 0,
                NilaiPelaporan: 0,
                NilaiPelayanan: 0,
                NilaiAkuntabel: 0,
                NilaiKompeten: 0,
                NilaiHarmonis: 0,
                NilaiLoyalitas: 0,
                NilaiAdaptif: 0,
                NilaiKolaboratif: 0,
                kualitatif: ''
            },
        };
    },
    methods: {
        fetchTugasMenilai() {
            const id_penilai = this.id_penilai;
            const id_st = this.id_st;
            axiosInstance.get(`/api/tugas/menilai/${id_penilai}/${id_st}`)
                .then(response => {
                    this.tugas_menilai = response.data;
                    console.log(this.tugas_menilai);
                })
                .catch(error => {
                    console.error('Error fetching tugas menilai data:', error);
                });
        },
        getNamaFromStorage() {
            return localStorage.getItem('nama') || ''; 
        },
        pulang() {
            const nama = this.getNamaFromStorage();
            if (nama) {
                this.nama = nama;
            }   
            this.$router.push('/user/' + this.nama);
        },
        logout() {
            localStorage.removeItem('userRole');
            localStorage.removeItem('grup');
            localStorage.removeItem('nama');
            localStorage.removeItem('username');
            this.$router.push('/');
        },
        BukaDialog(dinilai) {
            // Create a copy of the user object to avoid modifying the original list directly
            // This ensures that changes are only saved when the user clicks "Save".
            this.editedItem = { ...dinilai };

            // Open the dialog
            this.dialog = true;
        },
        TutupDialog() {
            this.dialog = false;

            // Clear the item after closing the dialog
            this.editedItem = {};
        },
        SimpanPenilaian() {
            console.log('Saving user with ID:', this.editedItem.id, this.editedItem);
            // TODO: Uncomment the following code to enable saving penilaian when backend is ready.
            axiosInstance.patch('/api/penilaian', this.editedItem)
                .then(response => {
                    console.log('Penilaian saved successfully:', response.data);
                    // Optionally, you can refresh the list or update the UI as needed
                    this.fetchTugasMenilai();
                })
                .catch(error => {
                    console.error('Error saving penilaian:', error);
                });
        
            // Close the dialog after saving
            this.TutupDialog();
        }
    },
    mounted() {
        this.nama = this.getNamaFromStorage();
        this.fetchTugasMenilai();
        console.log('ID Penilai from URL:', this.id_penilai);
        console.log('ID Tugas from URL:', this.id_st);
    }

});
</script>
