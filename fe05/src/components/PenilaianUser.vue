<template>
  <v-container fluid width="100%">
    <v-row no-gutters>
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
            <div class="text-subtitle-1">Aspek Pemeriksaan:</div>
            <tr>
              <td>Perencanaan</td>
              <td>
                <v-Rating
                  hover
                  :length="5"
                  :size="30"
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
            <v-divider></v-divider>
            <div class="text-subtitle-1">Aspek Perilaku:</div>
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
            <v-divider></v-divider>
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
              cols="2"
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
      id_penilai: null,
      editedItem: {
        id_penilaian: this.item.id_penilaian,
        NilaiRikRenc: this.item.rik_renc,
        NilaiRikLaks: this.item.rik_laks,
        NilaiRikLap: this.item.rik_lap,
        NilaiPelayanan: this.item.pelayanan,
        NilaiAkuntabel: this.item.akuntabel,
        NilaiKompeten: this.item.kompeten,
        NilaiHarmoni: this.item.harmoni,
        NilaiLoyal: this.item.loyal,
        NilaiAdaptif: this.item.adaptif,
        NilaiKolaboratif: this.item.kolaboratif,
        NilaiKualitatif: this.item.kualitatif,
      },
      isSaved: false,
    };
  },
  methods: {
    savePenilaian() {
      // Logic to save the penilaian data
      // You can make an API call here to save the data to the backend
      apiClient
        .put("/penilaian/update", this.editedItem)
        .then((response) => {
          console.log("Penilaian saved successfully:", response.data);
          this.$emit("penilaian-saved");
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
    }
  },
};
</script>
