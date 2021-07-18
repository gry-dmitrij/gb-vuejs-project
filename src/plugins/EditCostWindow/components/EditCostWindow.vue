<template>
  <div class="wrapper"  v-if="showed">
    <input type="text" placeholder="Amount" v-model="value">
    <select name="categories" v-model="category">
      <option v-for="(category, idx) in categories" :key="idx" :value="category">{{ category }}</option>
    </select>
    <input type="date" placeholder="Date" v-model="date">
    <CostButton class="button" @click="onClick">{{ buttonName }}</CostButton>
  </div>
</template>

<script>
import CostButton from './CostButton';
import { events } from "../index";

export default {
  name: 'EditCostWindow',
  components: {
    CostButton
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      value: '',
      category: '',
      date: '',
      showed: false,
      buttonName: '',
      event: null,
      index: null
    }
  },
  mounted() {
    this.$editCostWindow.EventBus.$on(events.SHOW, this.show);
    this.$editCostWindow.EventBus.$on(events.HIDE, this.hide);
  },
  destroyed() {
    this.$editCostWindow.EventBus.$off(events.SHOW, this.show);
    this.$editCostWindow.EventBus.$off(events.HIDE, this.hide);
  },
  methods: {
    onClick() {
      const data = {
        index: this.index,
        value: +this.value,
        category: this.category,
        date: this.parseDate(this.date || new Date())
      }
      this.$editCostWindow.EventBus.$emit(this.event, data);
    },
    parseDate(date) {
      date = new Date(date);
      const d = ('0' + date.getDate()).slice(-2);
      const m = ('0' + (date.getMonth() + 1)).slice(-2);
      return `${d}.${m}.${date.getFullYear()}`
    },
    show({ event, buttonName, index, value, category, date }) {
      this.event = event;
      this.buttonName = buttonName;
      this.index = index;
      this.showed = true;
      if (value) {
        this.value = value;
      }
      if (category) {
        this.category = category;
      }
      if (date) {
        let result = date.match(/(\d{1,2}).(\d{1,2}).(\d{4})/);
        if (result && result.length > 3) {
          this.date = `${result[3]}-${result[2]}-${result[1]}`
        }
      }
    },
    hide() {
      this.showed = false;
      this.clearData();
    },
    clearData() {
      this.value = '';
      this.index = null;
      this.event = null;
      this.buttonName = '';
      this.category = '';
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper{
  padding: 10px;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  max-width: 400px;

  background: #fff;

  border: 1px solid #aaa;
  border-radius: 10px;
}
input,
select{
  display: block;
  margin: 1px 1px 5px 1px;
  padding: 5px;
}
.button{
  align-self: flex-end;
}
</style>