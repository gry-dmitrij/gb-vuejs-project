export default {
    namespaced: true,
    state: {
        categoryList: []
    },
    getters: {
        getCategoryList: state => state.categoryList,
    },
    mutations: {
        setCategories(state, categories) {
            if (!Array.isArray(categories)) {
                categories = [categories];
            }
            state.categoryList.push(...categories);
        }
    },
    actions: {
        loadCategories({ commit }) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(['Food', 'Transport', 'Education', 'Sport']);
                }, 0);
            })
                .then(res => {
                    commit('setCategories', res);
                })
        }
    }
}