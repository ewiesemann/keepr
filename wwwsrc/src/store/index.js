import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '' : '//localhost:5000/';

vue.use(vuex)

var api = axios.create({
    baseURL: baseUrl + 'api/',
    timeout: 3000,
    withCredentials: true
})

var auth = axios.create({
    baseURL: baseUrl + 'account/',
    timeout: 3000,
    withCredentials: true
})

export default new vuex.Store({
    state: {
        user: {},
        keeps: {},
        vaults: []
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state) {
            state.user = {}
        },
        addKeep(state, keeps) {
            state.keeps = []
        },
        setKeeps(state, payload) {
            state.keeps = payload
        },
        addVault(state, vaults) {
            state.vaults = []
        },
        setVaults(state, vaults) {
            state.vaults = vaults
        },

    },

    actions: {
        //AUTH STUFF
        login({ commit }, loginCredentials) {
            auth.post('login', loginCredentials)
                .then(res => {
                    console.log('Successfully logged in')
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
        },
        logout({ commit, dispatch }) {
            auth.delete('')
                .then(res => {
                    console.log('You have successfully logged out')
                    commit('deleteUser')
                    router.push({ name: 'login' })
                })
        },
        register({ commit, dispatch }, userData) {
            auth.post('register', userData)
                .then(res => {
                    console.log('Successfully registered')
                    commit('setUser', res.data)
                    router.push({ name: 'login' })
                })
        },
        authenticate({ commit, dispatch }) {
            auth.get('authenticate')
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(res => {
                    console.log(res.data)
                })
        },
        addKeep({ dispatch, commit }, keep) {
            api.post('/keeps', keep)
                .then(res => {
                    dispatch('getKeeps')
                })
        },
        getKeeps({ commit, dispatch }) {
            api.get('/keeps')
                .then(res => {
                    commit('setKeeps', res.data)
                })
        },
        removeKeep({ commit, dispatch, state }, keep) {
            api.delete('/keeps/' + keep._id, keep)
                .then(res => {
                    dispatch('getKeeps')
                })
        },
        viewKeep({ commit, dispatch, state }, keep) {
            api.get('/keeps/' + keep.id, keep)
                .then(res => {
                    commit('setActivekeep', res.data)
                })
        },
        updateKeep({commit, dispatch}, keep) {
            api.put('/keeps/' + keep.id, keep)
            .then(res => {
                dispatch('getKeeps')
            })
        },
        addVault({ dispatch, commit }, vault) {
            api.post('/vault', vault)
                .then(res => {
                    dispatch('getvaults')
                })
        },
        getVaults({ commit, dispatch }) {
            api.get('/vaults')
                .then(res => {
                    commit('setvaults', res.data)
                })
        },
        removeVault({ commit, dispatch, state }, vault) {
            api.delete('/vaults/' + vault._id, vault)
                .then(res => {
                    dispatch('getvaults')
                })
        },
        viewVault({ commit, dispatch, state }, vaultId) {
            api.get('/vaults/' + vaultId)
                .then(res => {
                    commit('setActivevault', res.data)
                })
        },
    }
})