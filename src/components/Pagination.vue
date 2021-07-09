<template>
<ul>
  <li>
    <a v-if="currentList > 0" href="#" @click="prevItem">&lt;</a>
    <a v-else class="disabled">&lt;</a>
  </li>
  <li v-for="item in pages" :key="item">
    <a v-if="currentList !== (item - 1)" href="#" @click="load(item - 1)">{{ item }}</a>
    <a v-else class="current">{{ item }}</a>
  </li>
  <li>
    <a v-if="currentList < pages - 1"  href="#" @click="nextItem">&gt;</a>
    <a v-else class="disabled">&gt;</a>
  </li>
</ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      pages: 'payments/getPagesCount',
      currentList: 'payments/getCurrentPage'
    })
  },
  methods: {
    ...mapActions({
      load: 'payments/fetchData'
    }),
    nextItem() {
      this.load(this.currentList + 1);
    },
    prevItem() {
      this.load(this.currentList - 1);
    }
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
a{
  text-decoration: none;
  color: #000;
}
.current{
  color: #5eb7e3;
}
.disabled{
  color: #aaa;
}
</style>