<template>
  <div class="wrapper">
    <input type="text" placeholder="Amount" v-model="amount">
    <input type="text" placeholder="Type" v-model="type">
    <input type="date" placeholder="Date" v-model="date">
    <CostButton class="button" @click="onSave">Add</CostButton>
  </div>
</template>

<script>
import CostButton from './CostButton'
export default {
  name: 'AddPaymentForm',
  components: {
    CostButton
  },
  data() {
    return {
      amount: '',
      type: '',
      date: ''
    }
  },
  methods: {
    onSave() {
      const data = {
        amount: +this.amount,
        type: this.type,
        date: this.parseDate(this.date || new Date())
      }
      this.$emit('addNewPayment', data);
    },
    parseDate(date) {
      date = new Date(date);
      const d = ('0' + date.getDate()).slice(-2);
      const m = ('0' + (date.getMonth() + 1)).slice(-2);
      return `${d}.${m}.${date.getFullYear()}`
    },

  }
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
input {
  display: block;
  margin: 1px 1px 5px 1px;
  padding: 5px;
}
.button{
  align-self: flex-end;
}
</style>