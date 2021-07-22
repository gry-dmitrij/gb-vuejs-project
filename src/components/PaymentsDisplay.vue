<template>
  <div class="wrapper">
    <v-container>
      <v-row>
        <v-col :cols="1">#</v-col>
        <v-col :cols="4">Date</v-col>
        <v-col :cols="4">Category</v-col>
        <v-col :cols="2">Value</v-col>
      </v-row>
      <v-row v-for="(item, idx) in list" :key="idx">
          <v-col :cols="1">{{ idx + 1 + offset}}</v-col>
          <v-col :cols="4">{{ (item && item.date) ? item.date : '' }}</v-col>
          <v-col :cols="4">{{ (item && item.category) ? item.category  : '' }}</v-col>
          <v-col :cols="2">{{ (item && item.value) ? item.value : '' }}</v-col>
          <v-col :cols="1">
            <button class="menu-button" @click.stop="showMenu(idx + offset, $event)">
              <span class="menu-span"></span>
            </button>
          </v-col>
      </v-row>
    </v-container>
    <transition name="fade">
      <context-menu class="menu" :style="styleObj" :list="menuList"></context-menu>
    </transition>
  </div>
</template>

<script>
const EDIT = 'edit';
const DELETE = 'delete';
export const events = {
  EDIT,
  DELETE
}
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    offset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      menuList:[
        {
          name: 'Редактировать',
          event: EDIT
        },
        {
          name: 'Удалить',
          event: DELETE
        }
      ],
      options: {
        idx: 0
      },
      styleObj: {
        top: 0,
        left: 0
      }
    }
  },
  mounted() {
    this.$contextMenu.EventBus.$on(EDIT, this.editNote);
    this.$contextMenu.EventBus.$on(DELETE, this.deleteNote);
  },
  destroyed() {
    this.$contextMenu.EventBus.$off(EDIT, this.editNote);
    this.$contextMenu.EventBus.$off(DELETE, this.deleteNote);
  },
  methods: {
    showMenu(idx, event) {
      this.$contextMenu.show({idx});
      const target = event.currentTarget;
      this.styleObj.top = target.offsetTop + target.offsetHeight + 14 + 'px';
      this.styleObj.left = target.offsetLeft + target.offsetWidth + 8 + 'px';
    },
    editNote({ idx }) {
      this.$emit(EDIT, idx);
    },
    deleteNote({ idx }){
      this.$emit(DELETE, idx);
    }

  }
}
</script>

<style lang="scss" scoped>
.row {
  border-bottom: 1px solid #ddd;
}
.menu {
  position: absolute;
  transform: translateX(-100%);
  top: 0;
}
.menu-span {
  position: relative;
  &, &:after, &:before{
    width: 3px;
    height: 3px;
    display: block;
    background: #000;
    border-radius: 50%;
  }
  &:after, &:before {
    content: '';
    position: absolute;
  }
  &:after {
    bottom: -6px;
  }
  &:before {
    top: -6px;
  }
}
.menu-button {
  height: 18px;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  outline: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>