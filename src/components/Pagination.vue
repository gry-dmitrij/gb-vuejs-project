<template>
<ul>
  <li v-for="item in pages" :key="item">
    <a href="#" @click="load(item - 1)">{{ item }}</a>
  </li>
</ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      pages: 'payments/getPagesCount',
    })
  },
  methods: {
    ...mapActions({
      load: 'payments/fetchData'
    })
  }
}
</script>

<style lang="scss" scoped>
ul {
  width: 390px;
  margin: 20px auto;
  padding: 0;
  display: flex;
  list-style: none;
  box-sizing: border-box;
}
li {
  margin-right: 10px;
  &:first-of-type{
    margin-left: auto;
  }
  &:last-of-type{
    margin-right: auto;
  }
}
</style>