<template>
  <div id="app" class="wrapper" >
    <router-link class="menu-link" to="/dashboard">Dashboard</router-link>
    <router-link class="menu-link" to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
    };
  },
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
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.menu-link {
  margin-right: 20px;

}
</style>
