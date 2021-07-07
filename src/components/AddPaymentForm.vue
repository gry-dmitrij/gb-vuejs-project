<template>
  <div class="wrapper">
    <input type="text" placeholder="Amount" v-model="amount">
<!--    <input type="text" placeholder="Type" v-model="type">-->
    <select name="categories" v-model="type">
      <option v-for="(option, idx) in getCategoryList" :key="idx" :value="option">{{ option }}</option>
    </select>
    <input type="date" placeholder="Date" v-model="date">
    <CostButton class="button" @click="onSave">Add</CostButton>
  </div>
</template>

<script>
import CostButton from './CostButton';
import { mapMutations, mapGetters, mapActions } from 'vuex';

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
  computed: {
    ...mapGetters({
      getCategoryList: 'categories/getCategoryList'
    })
  },
  methods: {
    ...mapMutations({
      addPayment: 'payments/addPayment',
    }),
    ...mapActions({
      loadCategories: 'categories/loadCategories'
    }),
    onSave() {
      const data = {
        value: +this.amount,
        category: this.type,
        date: this.parseDate(this.date || new Date())
      }
      this.addPayment(data);
    },
    parseDate(date) {
      date = new Date(date);
      const d = ('0' + date.getDate()).slice(-2);
      const m = ('0' + (date.getMonth() + 1)).slice(-2);
      return `${d}.${m}.${date.getFullYear()}`
    },

  },
  mounted() {
    if (!this.getCategoryList.length) {
      this.loadCategories();
    }
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