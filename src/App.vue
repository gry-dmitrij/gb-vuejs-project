<template>
  <div id="app" class="wrapper" >
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import PaymentsDisplay from './components/PaymentsDisplay.vue';
// import AddPaymentForm from './components/AddPaymentForm';
// import CostButton from './components/CostButton';
// import Pagination from './components/Pagination';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      // paymentsList: [],
      // showPaymentForm: false
    };
  },
  components: {
    // PaymentsDisplay,
    // AddPaymentForm,
    // CostButton,
    // Pagination
  },
  created() {
    this.loadData(0);
    this.loadCategories();
  },
  // computed: {
  //   ...mapGetters({
  //     currentList: 'payments/getCurrentList',
  //     getCategories: 'categories/getCategoryList',
  //     amountOnPage: 'payments/getAmountOnPage',
  //     currentPage: 'payments/getCurrentPage'
  //   })
  // },
  methods: {
    // ...mapMutations({
    //   addNewPayment: 'payments/addPayment'
    // }),
    ...mapActions({
      loadData: 'payments/fetchData',
      loadCategories: 'categories/loadCategories'
    }),

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
</style>
