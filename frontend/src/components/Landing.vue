
<template>
    <div>
        <h2>Daftar Users</h2>
        <table v-if="users.length">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>Nama</th>
                    <th>Foto</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.nama }}</td>
                    <td>
                        <img :src="user.fotolink" alt="Foto" style="width:80px; height:80px; object-fit:cover; border-radius:20%;" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            Tidak ada data user.
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Landing',
    data() {
        return {
            users: []
        }
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/user');
                this.users = response.data.users;
            } catch (error) {
                this.users = [];
            }
        }
    }
}
</script>

<style scoped>
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