<template>
  <v-app>
    <v-app-bar app flat>
      <v-btn plain :ripple="false" to="/dashboard">Dashboard</v-btn>
      <v-btn plain :ripple="false" to="/about">About</v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    this.loadData(0);
    this.loadCategories();
  },
  methods: {
    ...mapActions({
      loadData: 'payments/fetchData',
      loadCategories: 'categories/loadCategories'
    }),

  }
};
</script>

<style lang="scss">

</style>