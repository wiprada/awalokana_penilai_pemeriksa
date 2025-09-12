<template>
    <div class="user-cards">
        <div v-for=" nilai in tugas" :key="nilai.id_tugas" class="user-card">
            <p>Memberi Penilaian Kepada:</p>
            <h3><strong>{{ nilai.nama_dinilai }}</strong> ({{ nilai.id_dinilai }})</h3>
            <p>Pada Surat Tugas: {{ nilai.id_tugas }}</p>
            <p>{{ nilai.perihalst }}</p>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tugas_Penilaian',
    props: {
        tugas: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

.user-card:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    transform: translateY(-5px);
    transition: all 0.3s ease;
}

.user-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    
}
.user-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    width: 220px;
    background: #fafafa;
    box-shadow: 0 5px 8px rgba(0,0,0,0.08);
}
</style>