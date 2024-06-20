// auth.js

import { getFirebaseBackend } from '../../helpers/firebase/authUtils'

const state = {
    currentUser: sessionStorage.getItem('authUser'),
}

const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
    },
}

const getters = {
    loggedIn(state) {
        return !!state.currentUser
    },
}

const actions = {
    init({ state, dispatch }) {
        dispatch('validate')
    },

    logIn({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().loginUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },

    logOut({ commit }) {
        commit('SET_CURRENT_USER', null)
        return new Promise((resolve, reject) => {
            getFirebaseBackend().logout().then((response) => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    },

    register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().registerUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },

    resetPassword({ commit, dispatch, getters }, { email } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().forgetPassword(email).then((response) => {
            const message = response.data
            return message
        });
    },

    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)
        const user = getFirebaseBackend().getAuthenticatedUser();
        commit('SET_CURRENT_USER', user)
        return user;
    },
}

// Private helper function
function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}