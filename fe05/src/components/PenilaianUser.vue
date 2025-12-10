<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>ST: {{ item.no_st }}</v-card-title>
          <v-card-text> {{ item.entabr }} : ( {{ item.tglst }} )</v-card-text>
          <!-- <p>{{ item.id_penilaian }}</p> -->
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
                    v-model="editedItem.NilaiRikRenc"
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
                    v-model="editedItem.NilaiRikLaks"
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
                    v-model="editedItem.NilaiRikLap"
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
                  v-model="editedItem.NilaiHarmoni"
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
                  v-model="editedItem.NilaiLoyal"
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
            <!-- <p><strong>Catatan Kualitatif:</strong> {{ item.kualitatif }}</p> -->
            <v-text-field
              label="Kualitatif: Berikan komentar atau saran untuk pemeriksa"
              name="name"
              v-model="editedItem.NilaiKualitatif"
              rows="4"
              textarea
              auto-grow
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="bg-primary d-flex"
              cols="12"
              outlined
              @click="savePenilaian"
              :disabled="isSaved"
              >Simpan</v-btn
            >
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
        id_penilaian: "",
        // dinilai: '',
        // id_dinilai: '',
        // fotolink: '',
        NilaiRikRenc: 0,
        NilaiRikLaks: 0,
        NilaiRikLap: 0,
        NilaiPelayanan: 0,
        NilaiAkuntabel: 0,
        NilaiKompeten: 0,
        NilaiHarmoni: 0,
        NilaiLoyal: 0,
        NilaiAdaptif: 0,
        NilaiKolaboratif: 0,
        NilaiKualitatif: "",
      },
      isSaved: false,
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
    savePenilaian() {
      // Logic to save the penilaian data
      // update id_penilaian in editedItem
      this.editedItem.id_penilaian = this.item.id_penilaian;
      console.log("Saving penilaian data:", this.editedItem);
      // You can make an API call here to save the data to the backend
      apiClient
        .put("/penilaian/update", this.editedItem)
        .then((response) => {
          console.log("Penilaian saved successfully:", response.data);
          alert("Penilaian berhasil disimpan!");
        })
        .catch((error) => {
          console.error("Error saving penilaian data:", error);
          alert("Gagal menyimpan penilaian.");
        });

      this.isSaved = true;
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
