<template>
  <v-container fluid max-width="900">
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
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader/tree/next',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify/tree/next',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Roadmap',
        href: 'https://vuetifyjs.com/introduction/roadmap/',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>
