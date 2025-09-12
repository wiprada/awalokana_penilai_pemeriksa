
<template>
    <div class="container">
        <h2>Daftar Users</h2>
        <div v-if="users.length === 0">
            Memuat data user...
        </div>
        <div v-else>
            <DaftarPengguna :users="users" />
            <br />
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DaftarPengguna from './daftar_pengguna.vue';

const users = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user');
    // Adjust this if your API returns an array directly or inside a property
    users.value = Array.isArray(response.data)
      ? response.data
      : response.data.users || [];
  } catch (err) {
    error.value = err;
    users.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.container {
    max-width: 1070px;
    margin: 40px auto;
    padding: 32px 24px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}

table {
    margin: 0 auto;
    border-collapse: collapse;
    width: 60%;
}

th, td {
    padding: 10px 16px;
    text-align: left;
    border: 1px solid #ddd;
}

thead th {
    background-color: #2ecc40;
    color: #fff;
}

tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>