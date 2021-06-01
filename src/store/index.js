import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isEdit: false,
    auth: false,
    name: ''

  },
  mutations: {
    setName(state, name) {

      state.name = name;

    },
    isEdit(state) {
      state.isEdit = true
    },
    login(state) {
      state.auth = true
    },
    cancelEdit(state) {
      state.isEdit = false
    }


  },
  actions: {},
  modules: {},
  getters: {
    isAuth: state => state.auth,
    isEdit: state => state.isEdit,
    getName: state => state.name
  }
})