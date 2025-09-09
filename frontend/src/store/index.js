import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    role: null,
    assignments: [],
    proposals: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.role = user.role
    },
    SET_ASSIGNMENTS(state, assignments) {
      state.assignments = assignments
    },
    SET_PROPOSALS(state, proposals) {
      state.proposals = proposals
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('/api/auth/login', credentials)
      commit('SET_USER', response.data.user)
    },
    async fetchAssignments({ commit }) {
      const response = await axios.get('/api/assignments/ungraded')
      commit('SET_ASSIGNMENTS', response.data)
    },
    async fetchProposals({ commit }) {
      const response = await axios.get('/api/proposals')
      commit('SET_PROPOSALS', response.data)
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user
    },
    isExaminer(state) {
      return state.role === 'pemeriksa'
    },
    isSupervisor(state) {
      return state.role === 'atasan'
    }
  }
})