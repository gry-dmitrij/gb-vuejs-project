<template>
  <v-container>
    <v-row>
      <v-col>
        <header>
          <div class="title">My personal costs</div>
        </header>
        <main>
          <div class="left-box">
            <CostButton class="button" @click.stop="btnAddClick">Add new cost</CostButton>
            <div class="widget-box" @click.stop="">
              <edit-cost-window class="widget" :categories="getCategories"></edit-cost-window>
            </div>
            <PaymentsDisplay :list="currentList"
                             :offset="currentPage * amountOnPage"></PaymentsDisplay>
            <Pagination></Pagination>
          </div>
        </main>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsDisplay from '../components/PaymentsDisplay';
import CostButton from '../components/CostButton';
import Pagination from '../components/Pagination';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { events as paymentEvents } from '../components/PaymentsDisplay';
import { events as windowEvents } from '../plugins/EditCostWindow';

const EDIT_EVENT = 'edit-event';
const ADD_EVENT = 'add-event';

export default {
  name: 'Dashboard',
  data() {
    return {
      paymentsList: [],
      showPaymentForm: false,
      buttonAction: null,
      hideContextMenu: () => null,
      hideModalWindow: () => null
    };
  },
  mounted() {
    window.addEventListener('click', this.dashBoardClick)
    this.$contextMenu.EventBus.$on(paymentEvents.DELETE, this.deletePayment);
    this.$contextMenu.EventBus.$on(paymentEvents.EDIT, this.openEditWindow);
    this.$contextMenu.EventBus.$on('show', this.contextMenuOpened);
    this.$contextMenu.EventBus.$on('hide', this.contextMenuClosed);
    this.buttonAction = this.openAddWindow;
    this.$editCostWindow.EventBus.$on(windowEvents.SHOW, this.modalWindowOpened);
    this.$editCostWindow.EventBus.$on(windowEvents.HIDE, this.modalWindowClosed);
    this.$editCostWindow.EventBus.$on(ADD_EVENT, this.addNewPayment);
    this.$editCostWindow.EventBus.$on(EDIT_EVENT, this.editPayment);


    if (this.$route.path.startsWith('/add/payment')) {
      const settings = {
        category: this.$route.params.category || '',
        value: this.$route.query.value || '',
        buttonName: 'Add',
        event: ADD_EVENT
      }
      this.openAddWindow(settings);
    }
  },
  destroyed() {
    this.$contextMenu.EventBus.$off(paymentEvents.DELETE, this.deletePayment);
    this.$contextMenu.EventBus.$off(paymentEvents.EDIT, this.openEditWindow);
    this.$contextMenu.EventBus.$off('show', this.contextMenuOpened);
    this.$contextMenu.EventBus.$off('hide', this.contextMenuClosed);

    this.$editCostWindow.EventBus.$off(windowEvents.SHOW, this.modalWindowOpened);
    this.$editCostWindow.EventBus.$off(windowEvents.HIDE, this.modalWindowClosed);
    this.$editCostWindow.EventBus.$off(ADD_EVENT, this.addNewPayment);
    this.$editCostWindow.EventBus.$off(EDIT_EVENT, this.editPayment);
    window.removeEventListener('click', this.dashBoardClick)
  },
  components: {
    PaymentsDisplay,
    CostButton,
    Pagination
  },
  computed: {
    ...mapGetters({
      currentList: 'payments/getCurrentList',
      getCategories: 'categories/getCategoryList',
      amountOnPage: 'payments/getAmountOnPage',
      currentPage: 'payments/getCurrentPage',
      getPayment: 'payments/getPayment'
    })
  },
  methods: {
    ...mapMutations({
      addNewPayment: 'payments/addPayment',
      changePayment: 'payments/editPayment'
    }),
    ...mapActions({
      deletePayment: 'payments/deletePayment'
    }),
    openAddWindow(settings) {
      this.$editCostWindow.show(settings);
    },
    closeAddWindow() {
      this.$editCostWindow.hide();
    },
    openEditWindow({ idx }) {
      const settings = {
        index: idx,
        value: this.getPayment(idx).value,
        category: this.getPayment(idx).category,
        date: this.getPayment(idx).date,
        buttonName: 'Edit',
        event: EDIT_EVENT
      }
      this.$editCostWindow.show(settings);
    },
    editPayment(data) {
      this.changePayment(data);
      this.$editCostWindow.hide();
    },
    btnAddClick() {
      const settings = {
        buttonName: 'Add',
        event: ADD_EVENT
      }
      this.buttonAction(settings);
    },
    modalWindowOpened() {
      this.buttonAction = this.closeAddWindow;
      this.hideModalWindow = () => {
        this.$editCostWindow.hide();
      }
    },
    modalWindowClosed() {
      this.buttonAction = this.openAddWindow;
      this.hideModalWindow = () => null;
    },
    contextMenuOpened() {
      this.hideContextMenu = () => {
        this.$contextMenu.hide();
      }
    },
    contextMenuClosed() {
      this.hideContextMenu = () => null;
    },
    dashBoardClick(event) {
      this.hideContextMenu();
      this.hideModalWindow(event);
    }
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