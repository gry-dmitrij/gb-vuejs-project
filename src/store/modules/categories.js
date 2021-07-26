export default {
    namespaced: true,
    state: {
        categoryList: [],
        loaded: false,
        promise: null
    },
    getters: {
        getCategoryList: state => state.categoryList,
        loaded: state => state.loaded
    },
    mutations: {
        setCategories(state, categories) {
            if (!Array.isArray(categories)) {
                categories = [categories];
            }
            state.categoryList.push(...categories);
        },
        setLoaded(state, value) {
            state.loaded = value;
        }
    },
    actions: {
        loadCategories({ commit, state }) {
            if (state.loaded) {
                return new Promise(resolve => resolve());
            }
            if (state.promise) return state.promise;
            state.promise = new Promise(resolve => {
                setTimeout(() => {
                    resolve(['Food', 'Transport', 'Education', 'Sport', 'Entertainment']);
                }, 1000);
            })
                .then(res => {
                    commit('setCategories', res);
                    commit('setLoaded', true);
                    state.promise = null;
                });
            return state.promise;
        }
    }
}