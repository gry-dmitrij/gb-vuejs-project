<template>
  <div class="wrapper">
    <table>
      <thead class="row">
        <th class="col col_number">#</th>
        <th class="col col_date">Date</th>
        <th class="col col_category">Category</th>
        <th colspan="2" class="col col_value">Value</th>
      </thead>
      <tbody>
        <tr class="row" v-for="(item, idx) in list" :key="idx">
          <td class="cell">{{ idx + 1 + offset}}</td>
          <td class="cell">{{ (item && item.date) ? item.date : '' }}</td>
          <td class="cell">{{ (item && item.category) ? item.category  : '' }}</td>
          <td class="cell">{{ (item && item.value) ? item.value : '' }}</td>
          <td class="cell">
            <button class="menu-button" @click.stop="showMenu(idx + offset, $event)">
              <span class="menu-span"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      const rect = event.currentTarget.getBoundingClientRect();
      this.styleObj.top = rect.bottom + 14 + window.pageYOffset + 'px';
      this.styleObj.left = rect.right + 8 + window.pageXOffset + 'px';
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
table {
  border-collapse: collapse;
  text-align: left;
}
.col {
  min-width: 100px;
  padding: 10px 0;
  &_number{
    min-width: 45px;
  }
  &_value {
    min-width: 50px;
  }
  &_category {
    min-width: 200px;
  }
}
.cell {
  padding: 10px 0;
}
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