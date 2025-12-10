<template>
  <div v-for="item in NilaiPersonal" :key="item.id_dinilai">
    <div>
      <!-- <h1>{{ item.dinilai }}</h1>
      <p>{{ item.grup }}</p> -->
      <div>
        <h3>Unsur Pemeriksaan</h3>
        <table style="width: 100%">
          <colgroup>
            <col style="width: 40%" />
            <col style="width: 20%" />
            <col style="width: 40%" />
          </colgroup>
          <tbody>
            <tr>
              <td>Perencanaan</td>
              <td>:</td>
              <td :style="{ backgroundColor: getColorForValue(item.rik_renc) }">
                {{ Number(item.rik_renc).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Pelaksanaan</td>
              <td>:</td>
              <td :style="{ backgroundColor: getColorForValue(item.rik_laks) }">
                {{ Number(item.rik_laks).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Pelaporan</td>
              <td>:</td>
              <td :style="{ backgroundColor: getColorForValue(item.rik_lap) }">
                {{ Number(item.rik_lap).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <v-divider></v-divider>
      <div>
        <h3>Unsur Perilaku</h3>
        <table style="width: 100%">
          <colgroup>
            <col style="width: 40%" />
            <col style="width: 20%" />
            <col style="width: 40%" />
          </colgroup>
          <tbody>
            <tr>
              <td>Pelayanan</td>
              <td>:</td>
              <td
                :style="{ backgroundColor: getColorForValue(item.pelayanan) }"
              >
                {{ Number(item.pelayanan).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Akuntabel</td>
              <td>:</td>
              <td
                :style="{ backgroundColor: getColorForValue(item.akuntabel) }"
              >
                {{ Number(item.akuntabel).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Kompeten</td>
              <td>:</td>
              <td :style="{ backgroundColor: getColorForValue(item.kompeten) }">
                {{ Number(item.kompeten).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Harmonis</td>
              <td>:</td>
              <td :style="{ backgroundColor: getColorForValue(item.harmoni) }">
                {{ Number(item.harmoni).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Loyalitas</td>
              <td>:</td>
              <td :style="{ backgroundColor: getColorForValue(item.loyal) }">
                {{ Number(item.loyal).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Adaptif</td>
              <td>:</td>
              <td :style="{ backgroundColor: getColorForValue(item.adaptif) }">
                {{ Number(item.adaptif).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>Kolaboratif</td>
              <td>:</td>
              <td
                :style="{ backgroundColor: getColorForValue(item.kolaboratif) }"
              >
                {{ Number(item.kolaboratif).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import apiClient from "@/services/api";
export default {
  name: "UserNilai",
  data() {
    return {
      NilaiPersonal: {},
      id_pegawai: null,
    };
  },
  methods: {
    fetchNilaiPersonal() {
      // Logic to fetch personal evaluation data
      apiClient
        .get(`/penilaian/dinilai/${this.id_pegawai}`)
        .then((response) => {
          this.NilaiPersonal = response.data;
          console.log("Fetched Nilai Personal:", this.NilaiPersonal);
        })
        .catch((error) => {
          console.error("Error fetching Nilai Personal:", error);
        });
    },
    getColorForValue(value) {
      const normalizedValue = (value - 1) / 4;
      const hue = normalizedValue * 120;
      return `hsl(${hue}, 100%, 50%)`;
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.id_pegawai = user.id;
      this.fetchNilaiPersonal();
    }
  },
};
</script>
