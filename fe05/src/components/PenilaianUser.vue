<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>ST: {{ item.no_st }}</v-card-title>
          <v-card-text> {{ item.entabr }} : ( {{ item.tglst }} )</v-card-text>
          <v-card-text>
            {{ item.perihalst }}
          </v-card-text>
          <v-card-subtitle>
            Menilai: <strong>{{ item.dinilai }}</strong> ({{
              item.peran_dinilai
            }})
          </v-card-subtitle>
          <v-card-text>
            <div><strong>Peran Anda:</strong> {{ item.peran_penilai }}</div>
            <v-divider></v-divider>
            <div class="text-subtitle-1 ma-2">Aspek Pemeriksaan:</div>
            <table>
              <tr>
                <td>Perencanaan</td>
                <td>
                  <v-Rating
                    hover
                    :length="5"
                    :size="30"
                    :model-value="2"
                    active-color="primary"
                    empty-icon="mdi-thumb-up-outline"
                    full-icon="mdi-thumb-up"
                    v-model="editedItem.NilaiPerencanaan"
                    label="Perencanaan"
                  />
                </td>
              </tr>
              <tr>
                <td>Pelaksanaan</td>
                <td>
                  <v-Rating
                    hover
                    :length="5"
                    :size="30"
                    :model-value="2"
                    active-color="primary"
                    empty-icon="mdi-thumb-up-outline"
                    full-icon="mdi-thumb-up"
                    v-model="editedItem.NilaiPelaksanaan"
                    label="Pelaksanaan"
                  />
                </td>
              </tr>
              <tr>
                <td>Pelaporan</td>
                <td>
                  <v-Rating
                    hover
                    :length="5"
                    :size="30"
                    :model-value="2"
                    active-color="primary"
                    empty-icon="mdi-thumb-up-outline"
                    full-icon="mdi-thumb-up"
                    v-model="editedItem.NilaiPelaporan"
                    label="Pelaporan"
                  />
                </td>
              </tr>
            </table>
            <v-divider class="my-2"></v-divider>
            <div class="text-subtitle-1 ma-2">Aspek Perilaku:</div>
            <tr>
              <td>Pelayanan</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
                  :model-value="2"
                  active-color="primary"
                  empty-icon="mdi-thumb-up-outline"
                  full-icon="mdi-thumb-up"
                  v-model="editedItem.NilaiPelayanan"
                  label="Pelayanan"
                />
              </td>
            </tr>
            <tr>
              <td>Akuntabel</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
                  :model-value="2"
                  active-color="primary"
                  empty-icon="mdi-thumb-up-outline"
                  full-icon="mdi-thumb-up"
                  v-model="editedItem.NilaiAkuntabel"
                  label="Akuntabel"
                />
              </td>
            </tr>
            <tr>
              <td>Kompeten</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
                  :model-value="2"
                  active-color="primary"
                  empty-icon="mdi-thumb-up-outline"
                  full-icon="mdi-thumb-up"
                  v-model="editedItem.NilaiKompeten"
                  label="Kompeten"
                />
              </td>
            </tr>
            <tr>
              <td>Harmonis</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
                  :model-value="2"
                  active-color="primary"
                  empty-icon="mdi-thumb-up-outline"
                  full-icon="mdi-thumb-up"
                  v-model="editedItem.NilaiHarmonis"
                  label="Harmonis"
                />
              </td>
            </tr>
            <tr>
              <td>Loyal</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
                  :model-value="2"
                  active-color="primary"
                  empty-icon="mdi-thumb-up-outline"
                  full-icon="mdi-thumb-up"
                  v-model="editedItem.NilaiLoyalitas"
                  label="Loyalitas"
                />
              </td>
            </tr>
            <tr>
              <td>Adaptif</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
                  :model-value="2"
                  active-color="primary"
                  empty-icon="mdi-thumb-up-outline"
                  full-icon="mdi-thumb-up"
                  v-model="editedItem.NilaiAdaptif"
                  label="Adaptif"
                />
              </td>
            </tr>
            <tr>
              <td>Kolaboratif</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
                  :model-value="2"
                  active-color="primary"
                  empty-icon="mdi-thumb-up-outline"
                  full-icon="mdi-thumb-up"
                  v-model="editedItem.NilaiKolaboratif"
                  label="Kolaboratif"
                />
              </td>
            </tr>
            <v-divider class="my-2"></v-divider>
            <p><strong>Catatan Kualitatif:</strong> {{ item.kualitatif }}</p>
          </v-card-text>
          <v-card-actions>
            <v-chip :color="item.status ? 'green' : 'orange'" dark>
              {{ item.status ? "Selesai" : "Belum Selesai" }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import apiClient from "@/services/api";
export default {
  name: "PenilaianUser",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      penilaianData: [],
      id_penilai: null,
      editedItem: {
        // id_penilaian: '',
        // dinilai: '',
        // id_dinilai: '',
        // fotolink: '',
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
        // kualitatif: ''
      },
    };
  },
  methods: {
    async fetchPenilaian() {
      try {
        // Logic to fetch penilaian data
        const response = await apiClient.get(
          `/penilaian/penilai/${this.id_penilai}`
        );
        this.penilaianData = response.data;
        console.log("Fetched penilaian data:", this.penilaianData);
      } catch (error) {
        console.error("Error fetching penilaian data:", error);
      }
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.id_penilai = user.id;
      this.fetchPenilaian();
    }
  },
};
</script>
