export default {
    namespaced: true,
    state: {
        paymentsList: []
    },
    getters: {
        getPaymentsList: state => state.paymentsList,

        getFullPaymentValue: state => {
            return state.paymentsList
                .reduce((res, cur) => res + cur.value, 0);
        }
    },
    mutations: {
        setPaymentsList(state, list) {
            state.paymentsList = list;
        },
        addPayment(state, payment) {
            state.paymentsList.push(payment);
        }
    },
    actions: {

    }
}