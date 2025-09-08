<template>
  <div class="home">
    <h1>Daftar Item</h1>
    <form @submit.prevent="addItem" class="add-item-form">
      <input v-model="newItemName" placeholder="Nama Item" required />
      <input v-model="newItemDescription" placeholder="Deskripsi" />
      <button type="submit">Tambah</button>
    </form>
    <ul>
      <li v-for="item in items" :key="item.id" class="item-card">
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
        </div>
        <button @click="deleteItem(item.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      items: [],
      newItemName: '',
      newItemDescription: '',
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:3000/api/items');
        this.items = response.data.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async addItem() {
      try {
        const response = await axios.post('http://localhost:3000/api/items', {
          name: this.newItemName,
          description: this.newItemDescription,
        });
        this.items.push(response.data);
        this.newItemName = '';
        this.newItemDescription = '';
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`http://localhost:3000/api/items/${id}`);
        this.items = this.items.filter(item => item.id !== id);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
}
.add-item-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.add-item-form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.add-item-form button {
  padding: 8px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
}
.item-card button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>