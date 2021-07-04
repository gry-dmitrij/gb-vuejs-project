<template>
  <div id="app" class="wrapper">
    <header>
      <div class="title">My personal costs</div>
    </header>
    <main>
      <AddPaymentForm @addNewPayment="addNewPayment"></AddPaymentForm>
      <PaymentsDisplay :items="paymentsList"></PaymentsDisplay>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import AddPaymentForm from "./components/AddPaymentForm";

export default {
  name: 'App',
  data() {
    return {
      paymentsList: [],
    };
  },
  components: {
    PaymentsDisplay,
    AddPaymentForm
  },
  created() {
    this.paymentsList = this.fetchData();
  },
  methods: {
    addNewPayment(data) {
      this.paymentsList.push(data);
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
  margin-top: 60px;
}
</style>
