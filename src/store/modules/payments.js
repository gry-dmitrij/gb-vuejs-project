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
function loadData({commit, state }, { start, count }) {
    return new Promise(resolve => {
        setTimeout(() => {
            const category = ['Food', 'Transport', 'Education', 'Sport', 'Entertainment'];
            for (let i = start; i < start + count; i++) {
                if (i >= state.paymentsList.length) break;
                if (state.paymentsList[i]) {
                    continue;
                }

                let day = getRandomIntInclusive(1, 31);
                let month = getRandomIntInclusive(0, 11);
                let year = getRandomIntInclusive(2000, 2021);
                commit('setPayment', {
                    index: i,
                    value: {
                        value: getRandomIntInclusive(1, 1000),
                        category: category[getRandomIntInclusive(0, category.length - 1)],
                        date: parseDate(`${month}-${day}-${year}`)
                    }
                });
            }
            resolve();
        }, getRandomIntInclusive(700, 3000));
    })

}

export default {
    namespaced: true,
    state: {
        paymentsList: new Array(getRandomIntInclusive(5,70)),
        currentPage: 0,
        amountOnPage: 10,
    },
    getters: {
        checkLoaded: state => (start, count) => {
            if (count === undefined
                || count === null
                || count >= state.paymentsList.length) {
                count = state.paymentsList.length
            }
            if (start === undefined
            || start === null
            || start < 0) {
                start = 0;
            }
            for (let i = start; i < start + count; i++) {
                if (i >= state.paymentsList.length) break;

                if (!state.paymentsList[i]) {
                    return  false;
                }
            }
            return true;
        },
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
        getCurrentPage: state => state.currentPage,
        // getCategorySum: state => category => {
        //     let sum = 0;
        //     state.paymentsList.forEach(item => {
        //         sum += item.category === category ? item.value : 0;
        //     })
        //     return sum;
        // }
        getCategorySum: state => category => state.paymentsList
            .reduce((sum, item) => item.category === category ? sum + item.value : sum, 0),
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
        setPayment(state, { index, value}) {
            if (index >= state.paymentsList.length) return;
            Vue.set(state.paymentsList, index, value);
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
        // loadData({commit, state }, { start, count }) {
        //     return new Promise(resolve => {
        //         setTimeout(() => {
        //             const category = ['Food', 'Transport', 'Education', 'Sport'];
        //             for (let i = start; i < start + count; i++) {
        //                 if (i >= state.paymentsList.length) break;
        //                 if (state.paymentsList[i]) {
        //                     continue;
        //                 }
        //
        //                 let day = getRandomIntInclusive(1, 31);
        //                 let month = getRandomIntInclusive(0, 11);
        //                 let year = getRandomIntInclusive(2000, 2021);
        //                 commit('setPayment', {
        //                     index: i,
        //                     value: {
        //                         value: getRandomIntInclusive(1, 1000),
        //                         category: category[getRandomIntInclusive(0, category.length - 1)],
        //                         date: parseDate(`${month}-${day}-${year}`)
        //                     }
        //                 });
        //             }
        //             resolve();
        //         }, getRandomIntInclusive(700, 3000));
        //     })
        //
        // },
        fetchData({ commit, state, getters }, page) {
            return new Promise((resolve, reject) => {
                if (page > getters.getPagesCount) {
                    reject('This page doesn\'t exist');
                    return;
                }
                commit('setCurrentPage', page);
                const start = page * state.amountOnPage;
                const count = state.amountOnPage;
                if (getters.checkLoaded(start, count)) {
                    resolve(getters.getCurrentList);
                    return;
                }
                // return dispatch('loadData', { start, count });
                return loadData({ commit, state }, {start, count})
            });
        },
        fetchAll({ state, getters, commit }) {
            return new Promise((resolve => {
                const start = 0;
                const count = state.paymentsList.length;
                if (getters.checkLoaded(start, count)) {
                    resolve();
                    return;
                }
                //return dispatch('loadData', { start, count })
                loadData({commit, state}, {start, count})
                    .then( () => {
                        resolve()
                    });
            }));
        }
    }
}