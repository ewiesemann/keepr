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
        vaults: [],
        userKeeps: [],
        userVaults: [],
        activeVault: {}
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
        setUserKeeps(state, userKeeps) {
            state.userKeeps = userKeeps
        },
        addVault(state, vaults) {
            state.vaults = []
        },
        setVaults(state, payload) {
            state.vaults = payload
        },
        setUserVaults(state, userVaults) {
            state.userVaults = userVaults
        },
        setActive(state, vault) {
            state.activeVault = vault
        },
        setVaultKeeps(state, keeps){
            state.keeps=keeps
        }
    },

    actions: {
        //AUTH STUFF
        login({ commit, dispatch }, loginCredentials) {
            auth.post('login', loginCredentials)
                .then(res => {
                    console.log('Successfully logged in')
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                    dispatch('getVaults', res.data.id)
                })
                .catch(err => {
                    console.log("Invalid Credentials")
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
                    if (res.status == 200) {
                        router.push({ name: 'Home' })
                        dispatch('getVaults', res.data.id)
                    } else {
                        router.push({ name: 'login' })
                    }
                })
                .catch(res => {
                    console.log(res.data)
                })
        },
        addKeep({ dispatch, commit }, keep) {
            api.post('/keeps', keep)
                .then(res => {
                    dispatch('getKeeps', res.data)
                })
        },
        getKeeps({ commit, dispatch }) {
            api.get('/keeps')
                .then(res => {
                    commit('setKeeps', res.data)
                })
        },
        getUserKeeps({ commit, dispatch }, user) {
            api.get("/keep/user" + user.id)
                .then(res => {
                    commit("setUserKeeps", res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        removeKeep({ commit, dispatch, state }, keep) {
            api.delete('/keeps/' + keep._id, keep)
                .then(res => {
                    commit("deleteKeep", res.data)
                    dispatch('getKeeps')
                })
        },
        viewKeep({ commit, dispatch, state }, keep) {
            api.get('/keeps/' + keep.id, keep)
                .then(res => {
                    commit('setActivekeep', res.data)
                })
        },
        updateKeep({ commit, dispatch }, keep) {
            api.put('/keeps/' + keep.id, keep)
                .then(res => {
                    dispatch('getKeeps')
                })
        },

        addVault({ dispatch, commit }, vault) {
            api.post('/vault', vault)
                .then(res => {
                    dispatch('getVaults')
                })
        },
        getVaults({ commit, dispatch, state }, userid) {
            api.get('/vault/author/' + userid)
                .then(res => {
                    commit('setUserVaults', res.data)
                })
        },
        // getUserVaults({ commit, dispatch }, user) {
        //     api.get("/vault/user" + user.id)
        //         .then(res => {
        //             commit("setUserVaults", res.data)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },
        removeVault({ commit, dispatch, state }, vault) {
            api.delete('/vaults/' + vault._id, vault)
                .then(res => {
                    commit("removeVault", res.data)
                    dispatch('getvaults')
                })
        },
        viewVault({ commit, dispatch, state }, vault) {
            api.get('/vaults/' + vault.id, vault)
                .then(res => {
                    commit('setUserVaults', res.data)
                })
        },
        updateVault({ commit, dispatch }, vault) {
            api.put('/vaults/' + vault.id, vault)
                .then(res => {
                    dispatch('getVaults')
                })
        },
        addVaultKeep({ dispatch, commit }, vaultkeep) {
            api.post('/vaultkeep', vaultkeep)
                .then(res => {
                })
        },

        setActiveVault({ commit, dispatch }, vault) {
            commit('setActive', vault)
        },

        getVaultKeeps({ commit, dispatch }, vault) {
            api.get('/vaultkeep/' + vault.id)
                .then(res => {
                    dispatch('getkeeps')
                })
        },
        getVaultKeepById({commit, dispatch}, vault) {
            api.get('/vaultkeep/'+ vault.id)
            .then(res=>{
                commit('setVaultKeep', res.data)
            })
        }
    }
})