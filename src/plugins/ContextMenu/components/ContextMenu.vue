<template>
  <div v-if="showed" class="main">
    <ul class="wrapper">
      <li v-for="(item, idx) in list" :key="idx">
        <a class="link" href="#" @click.prevent="click(item.event)">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      showed: false,
      options: {}
    }
  },
  mounted() {
    this.$contextMenu.EventBus.$on('show', this.show);
    this.$contextMenu.EventBus.$on('hide', this.hide)
  },
  destroyed() {
    this.$contextMenu.EventBus.$off('show', this.show);
    this.$contextMenu.EventBus.$off('hide', this.hide)
  },
  methods: {
    show(options) {
      this.showed = this.list.length > 0;
      this.options = options;
    },
    hide() {
      this.showed = false;
    },
    click(event) {
      if (event) {
        this.$contextMenu.click(event, this.options);
      }
      this.hide();
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  position: relative;
  list-style: none;
  &:after {
    content: '';
    position: absolute;
    width: 13px;
    height: 12px;
    border: 6px solid transparent;
    border-bottom: 6px solid #fff;
    box-sizing: border-box;
    top: -12px;
    right: 10px;
  }
}
li {
  display: block;
  text-align: left;
}
.link {
  padding: 5px 10px;
  display: block;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #eee;
    text-decoration: underline;
  }
  &:active {
    background-color: #ccc;
  }
}
.main {
  display: flex;
}
.wrapper {
  display: flex;
  flex-direction: column;

  padding: 5px 0;
  background: #fff;
  box-shadow:  0px 0px 8px 4px rgba(0, 0, 0, .3);
}
</style>