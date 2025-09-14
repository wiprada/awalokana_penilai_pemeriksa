<template>
  <v-app>
    <v-toolbar app dark small color="purple-darken-4" wrap>
      <v-toolbar-title>
        <v-icon>
          mdi-rocket
        </v-icon>
        SAPA Pemeriksa
      </v-toolbar-title>
      <v-spacer/>
      <v-btn text to="/">
        <v-icon>
          mdi-home
        </v-icon>
        Home
      </v-btn>
      <v-btn text to="/dashboard">
        <v-icon>
          mdi-view-dashboard
        </v-icon>
        Dashboard</v-btn>
      <v-btn text to="/logout">
        <v-icon>
          mdi-logout
        </v-icon>
        Logout</v-btn>
    </v-toolbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
