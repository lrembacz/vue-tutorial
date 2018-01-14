import * as types from '../mutation-types'
import * as urls from '../api/apiUrls'

const state = {
    user: {
        id : 0
    },
}

const getters = {

    user(state) {
        return state.user;
    },

    userId(state) {
        return state.user.id;
    },

}

const mutations = {

    [types.SET_USER] (state, user) {
        state.user = user;
    },

}

const actions = {
    getUser ({ commit, state }) {
        axios.get(urls.API_USER_URL).then( response => {
            commit(types.SET_USER, response.data.user)
        }).catch( err => {
            console.log('getUser error: ', err);
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}