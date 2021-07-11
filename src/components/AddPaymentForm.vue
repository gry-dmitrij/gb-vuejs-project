<template>
  <div class="wrapper">
    <input type="text" placeholder="Amount" v-model="value">
    <select name="categories" v-model="category">
      <option v-for="(category, idx) in categories" :key="idx" :value="category">{{ category }}</option>
    </select>
    <input type="date" placeholder="Date" v-model="date">
    <CostButton class="button" @click="onSave">Add</CostButton>
  </div>
</template>

<script>
import CostButton from './CostButton';

export default {
  name: 'AddPaymentForm',
  components: {
    CostButton
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    defaultValues: {
      type: Object,
      default: () => {
        return {
          value: '',
          category: '',
          date: ''
        }
      }
    }
  },
  data() {
    return {
      value: '',
      category: '',
      date: ''
    }
  },
  mounted() {
    this.value = this.defaultValues.value || '';
    this.category = this.defaultValues.category || '';
  },
  methods: {

    onSave() {
      const data = {
        value: +this.value,
        category: this.category,
        date: this.parseDate(this.date || new Date())
      }
      this.$emit('addPayment', data);
    },
    parseDate(date) {
      date = new Date(date);
      const d = ('0' + date.getDate()).slice(-2);
      const m = ('0' + (date.getMonth() + 1)).slice(-2);
      return `${d}.${m}.${date.getFullYear()}`
    },

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