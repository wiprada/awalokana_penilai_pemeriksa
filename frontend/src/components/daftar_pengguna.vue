<template>
    <div class="user-cards">
        <div v-for="user in users" :key="user.id" class="user-card">
            
            <h3><strong>{{ user.nama }}</strong></h3>
            <img :src="user.fotolink" alt="Foto" style="width:100px; height:100px; object-fit:cover; border-radius:10%;" />
            <p>{{ user.username }}</p>
            <p>{{ user.nip }}</p>
            <p>{{ user.grup }}</p>
            
        </div>
    </div>
</template>

<script>

export default {
    name: 'DaftarPengguna',
    props: {
        users: {
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