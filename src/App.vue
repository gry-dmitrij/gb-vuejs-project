<template>
  <div id="app" class="wrapper" >
    <header>
      <div class="title">My personal costs</div>
    </header>
    <main>
      <CostButton @click="showPaymentForm = !showPaymentForm">Add new cost</CostButton>
      <div class="widget-box">
        <AddPaymentForm class="widget" v-show="showPaymentForm"
                        @addNewPayment="addNewPayment"></AddPaymentForm>
      </div>
      <PaymentsDisplay :items="paymentsList"></PaymentsDisplay>
      <Pagination></Pagination>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import AddPaymentForm from './components/AddPaymentForm';
import CostButton from './components/CostButton';
import Pagination from './components/Pagination';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      paymentsList: [],
      showPaymentForm: false
    };
  },
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    CostButton,
    Pagination
  },
  created() {
    this.loadData(0);
  },
  methods: {
    ...mapMutations({
      setPaymentsList: 'payments/setPaymentsList',
    }),
    ...mapActions({
      loadData: 'payments/fetchData',
    }),
    addNewPayment(data) {
      this.paymentsList.push({
        value: data.amount,
        category: data.type,
        date: data.date
      });
    },
    fetchData() {
      return [
        {
          date: '28.03.2020',
          category: 'Food',
          value: 169,
        },
        {
          date: '24.03.2020',
          category: 'Transport',
          value: 360,
        },
        {
          date: '24.03.2020',
          category: 'Food',
          value: 532,
        },
      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
header{
  padding: 10px 0;
}
.widget-box{
  display: block;
  position: relative;
}
.widget{
  position: absolute;
  top: 20px;
  left: 100px;

}
.title{
  font-size: 20px;
  text-align: left;
}
main{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
