<template>
  <v-container fluid max-width="900" wrap>
    <v-row>
      <v-col  cols="6" class="text-center">
        <h3>
          Selamat Datang di 
        </h3>
        <h1>
          SAPA Pemeriksa
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, vitae autem facere veritatis, reprehenderit, laudantium quidem ipsum assumenda excepturi deleniti reiciendis aliquid aut cum. Assumenda numquam minima voluptatibus quod delectus.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam rerum libero ipsa doloremque praesentium reprehenderit quasi soluta natus dolores aliquam ut, veritatis harum ea magni quam deserunt iusto quis voluptas.</p>
        <br>
        <v-sheet>

          <v-form @submit.prevent>
            <v-text-field
              v-model="username"
              :rules="rules"
              label="Nama Pengguna"
            ></v-text-field>
            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col cols="6" class="text-center">
        <h3>Disini akan berisi usulan pengetahuan yang sudah diajukan</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'HelloWorld'
}
</script>
