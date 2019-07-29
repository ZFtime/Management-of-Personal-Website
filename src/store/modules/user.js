import * as types from '../mutation-types';

const state = () => ({
    userInfo: null,
});

const getters = {
    getUserInfo: store => store.userInfo, 
}

const mutations = {
    [types.RECEIVE_USER_USERINFO](store, userInfo) {
        store.userInfo = userInfo || null
    }
}

const actions = {
    getUserInfo({
        commit
    }) {

    },
    login({
        commit
    }) {

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}