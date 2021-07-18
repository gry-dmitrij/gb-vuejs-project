import Vue from "vue";
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
function parseDate(date) {
    date = new Date(date);
    const d = ('0' + date.getDate()).slice(-2);
    const m = ('0' + (date.getMonth() + 1)).slice(-2);
    return `${d}.${m}.${date.getFullYear()}`
}

export default {
    namespaced: true,
    state: {
        // paymentsList: [],
        paymentsList: new Array(getRandomIntInclusive(5,70)),
        currentPage: 0,
        amountOnPage: 10,
        // pages: Math.floor(state.paymentsList.length / state.amountOnPage)
        // pages: 0
    },
    getters: {
        getPaymentsList: state => state.paymentsList,

        getFullPaymentValue: state => {
            return state.paymentsList
                .reduce((res, cur) => res + cur.value, 0);
        },
        getPayment: state => index => state.paymentsList[index],
        getAmountOnPage: state => state.amountOnPage,
        getCurrentList: state => {
            // return state.paymentsList[state.currentPage];
            const start = state.currentPage * state.amountOnPage;
            return state.paymentsList.slice(start, start + state.amountOnPage);
        },
        getPagesCount: state => Math.ceil(state.paymentsList.length / state.amountOnPage),
        getCurrentPage: state => state.currentPage
    },
    mutations: {
        setPaymentsList(state, { page, list}) {
            let i = state.amountOnPage * page;
            for (let item of list) {
                if (i >= state.paymentsList.length) break;

                state.paymentsList[i] = item;
                i++;
            }
            state.paymentsList = [...state.paymentsList];

        },
        addPayment(state, payment) {
            state.paymentsList.push(payment);
        },
        editPayment(state, data) {
            const payment = {
                value: data.value,
                category: data.category,
                date: data.date
            }
            Vue.set(state.paymentsList, data.index, payment);
        },
        setCurrentPage(state, page) {
            if (page < Math.ceil(state.paymentsList.length / state.amountOnPage)
                && page >= 0) {
                state.currentPage = page;
            }
        },
        delPayment(state, idx) {
            state.paymentsList.splice(idx, 1);
        }
    },
    actions: {
        deletePayment({ commit, dispatch, state, getters}, { idx }) {
            commit('delPayment', idx);
            if (state.currentPage > getters.getPagesCount - 1
                && state.currentPage > 0) {
                state.currentPage--;
            }
            dispatch('fetchData', state.currentPage);
        },
        fetchData({ commit, state, getters }, page) {
            return new Promise((resolve, reject) => {
                if (page > getters.getPagesCount) {
                    reject('This page doesn\'t exist');
                    return;
                }
                commit('setCurrentPage', page);
                let loaded = true;
                const start = page * state.amountOnPage;
                for (let i = start; i < start + state.amountOnPage; i++) {
                    if (i >= state.paymentsList.length) break;

                    if (!state.paymentsList[i]) {
                       loaded = false;
                       break;
                    }
                }
                if (loaded) {
                    resolve(getters.getCurrentList);
                    return;
                }
                setTimeout(() => {
                    const category = ['Food', 'Transport', 'Education', 'Sport'];
                    const list = [];
                    for (let i = start; i < start + state.amountOnPage; i++) {
                        if (i >= state.paymentsList.length) break;
                        if (state.paymentsList[i]){
                            list.push(state.paymentsList[i]);
                            continue;
                        }

                        let day = getRandomIntInclusive(1, 31);
                        let month = getRandomIntInclusive(0, 11);
                        let year = getRandomIntInclusive(2000, 2021);
                        list.push({
                            value: getRandomIntInclusive(1, 1000),
                            category: category[getRandomIntInclusive(0, category.length - 1)],
                            date: parseDate(`${month}-${day}-${year}`)
                        });
                    }
                    commit('setPaymentsList', { page, list });
                    resolve(state.paymentsList[page]);
                }, getRandomIntInclusive(700, 3000));
            })
        },

    }
}