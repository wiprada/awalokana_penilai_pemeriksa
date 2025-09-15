<template>
    <div>
      <h1 class="text-orange-accent-2">Usulan Berbagi Pengetahuan</h1>  
      <v-list lines="two" class="mt-4 flat">
        <v-list-item
          v-for="item in pengetahuan"
          :key="item.id"
        >
          <v-card class="ma-2" outlined>
            <v-card-title> Dari Narasumber: {{ item.narasumber }}</v-card-title>
            <v-card-text> Harap Berbagi Pengetahuan tentang: {{ item.pengetahuan }}</v-card-text> 
            <v-card-text> {{ item.vote }}</v-card-text> 
          </v-card>
        </v-list-item>
      </v-list>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'UsulanPengetahuan',

data() {
  return {
    pengetahuan: []
  };
},

methods: {
  async fetchData() {
    try {
      const response = await axios.get('http://localhost:3000/knowledge');
      // Adjust this if your API returns an array directly or inside a property
      this.pengetahuan = Array.isArray(response.data)
        ? response.data
        : response.data.hasil || [];
    } catch (err) {
      console.error(err);
      this.pengetahuan = [];
    }
  }
},

mounted() {
  this.fetchData();
}
}
</script>
<style>
    
</style>