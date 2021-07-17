<template>
  <div>
    <header>
      <div class="title">My personal costs</div>
    </header>
    <main>
      <div class="left-box">
        <CostButton class="button" @click="showPaymentForm = !showPaymentForm">Add new cost</CostButton>
        <div class="widget-box">
          <AddPaymentForm class="widget" v-show="showPaymentForm" :categories="getCategories"
                          @addPayment="addNewPayment" :default-values="defaultValues"></AddPaymentForm>
        </div>
        <PaymentsDisplay :list="currentList" :offset="currentPage * amountOnPage"></PaymentsDisplay>
        <Pagination></Pagination>
      </div>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from '../components/PaymentsDisplay';
import AddPaymentForm from '../components/AddPaymentForm';
import CostButton from '../components/CostButton';
import Pagination from '../components/Pagination';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { events as paymentEvents} from '../components/PaymentsDisplay';

export default {
  name: 'Dashboard',
  data() {
    return {
      paymentsList: [],
      showPaymentForm: false,
      defaultValues: {}
    };
  },
  created() {
    if (this.$route.path.startsWith('/add/payment')) {
      this.showPaymentForm = true;
      this.defaultValues.category = this.$route.params.category || '';
      this.defaultValues.value = this.$route.query.value || '';
    }
  },
  mounted() {
    this.$contextMenu.EventBus.$on(paymentEvents.DELETE, this.deletePayment);
  },
  destroyed() {
    this.$contextMenu.EventBus.$off(paymentEvents.DELETE, this.deletePayment);
  },
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    CostButton,
    Pagination
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
      deletePayment: 'payments/deletePayment'
    })
  }
}
</script>

<style lang="scss" scoped>
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