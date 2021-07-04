<template>
  <div class="wrapper">
    <input type="text" placeholder="Amount" v-model="amount">
    <input type="text" placeholder="Type" v-model="type">
    <input type="text" placeholder="Date" v-model="date">
    <button @click="onSave">Save!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: '',
      type: '',
      date: ''
    }
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      return `${day}.${month}.${year}`;
    }
  },
  methods: {
    onSave() {
      const data = {
        amount: +this.amount,
        type: this.type,
        date: this.date || this.getCurrentDate
      }
      this.$emit('addNewPayment', data);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>