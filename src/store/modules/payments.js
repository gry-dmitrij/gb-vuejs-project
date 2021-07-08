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
        paymentsList: [],
        pages: getRandomIntInclusive(3, 7),
        currentPage: 0,
        amountOnPage: 10
    },
    getters: {
        getPaymentsList: state => state.paymentsList,

        getFullPaymentValue: state => {
            return state.paymentsList
                .reduce((res, cur) => res + cur.value, 0);
        },
        getCurrentList: state => {
            return state.paymentsList[state.currentPage];
        },
        getPagesCount: state => state.pages,
    },
    mutations: {
        setPaymentsList(state, { page, list}) {
            if (page >= 0 && page < state.pages) {
                state.paymentsList[page] = list;
                state.paymentsList = [...state.paymentsList];
            }
        },
        addPayment(state, payment) {
            state.paymentsList.push(payment);
        },
        setCurrentPage(state, page) {
            if (page < state.pages && page >= 0) {
                state.currentPage = page;
            }
        }
    },
    actions: {
        fetchData({ commit, state }, page) {
            return new Promise((resolve, reject) => {
                if (page > state.pages) {
                    reject('This page doesn\'t exist');
                    return;
                }
                commit('setCurrentPage', page);
                if (state.paymentsList[page]) {
                    resolve(state.paymentsList[page]);
                    return;
                }
                setTimeout(() => {
                    const category = ['Food', 'Transport', 'Education', 'Sport'];
                    const list = [];
                    for (let i = 0; i < state.amountOnPage; i++) {
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