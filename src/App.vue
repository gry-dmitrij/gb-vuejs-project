<template>
  <div id="app" class="wrapper" >
    <header>
      <div class="title">My personal costs</div>
    </header>
    <main>
      <div class="left-box">
        <CostButton class="button" @click="showPaymentForm = !showPaymentForm">Add new cost</CostButton>
        <div class="widget-box">
          <AddPaymentForm class="widget" v-show="showPaymentForm" :categories="getCategories"
                          @addPayment="addNewPayment"></AddPaymentForm>
        </div>
        <PaymentsDisplay :list="currentList" :offset="currentPage * amountOnPage"></PaymentsDisplay>
        <Pagination></Pagination>
      </div>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import AddPaymentForm from './components/AddPaymentForm';
import CostButton from './components/CostButton';
import Pagination from './components/Pagination';
import { mapMutations, mapActions, mapGetters } from 'vuex';

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
    this.loadCategories();
  },
  computed: {
    ...mapGetters({
      currentList: 'payments/getCurrentList',
      getCategories: 'categories/getCategoryList',
      amountOnPage: 'payments/getAmountOnPage',
      currentPage: 'payments/getCurrentPage'
    })
  },
  methods: {
    ...mapMutations({
      addNewPayment: 'payments/addPayment'
    }),
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
.left-box{
  display: flex;
  flex-direction: column;
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
.button{
  align-self: flex-start;
}
</style>
