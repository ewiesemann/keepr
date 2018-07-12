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
        keeps: [],
        vaults: [],
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        deleteUser(state) {
            state.user = {}
        },
        setKeeps(state, keeps) {
            state.keeps = keeps
        },
        setVaults(state, vaults) {
            state.vaults = vaults
        }
    },

    actions: {
        //AUTH STUFF
        login({ commit, dispatch }, loginCredentials) {
            auth.post('login', loginCredentials)
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
        },
        logout({ commit, dispatch }) {
            auth.delete('logout')
                .then(res => {
                    commit('deleteUser')
                    router.push({ name: 'login' })
                })
        },
        register({ commit, dispatch }, userData) {
            auth.post('register', userData)
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
        },
        authenticate({ commit, dispatch }) {
            auth.get('/authenticate')
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
                    commit('setkeeps', res.data)
                })
        },
        removeKeep({ commit, dispatch, state }, keep) {
            api.delete('/keeps/' + keep._id, keep)
                .then(res => {
                    dispatch('getKeeps')
                })
        },
        viewKeep({ commit, dispatch, state }, keepId) {
            api.get('/keeps/' + keepId)
                .then(res => {
                    commit('setActivekeep', res.data)
                })
        },
    }
})