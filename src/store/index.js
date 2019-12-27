import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
// import mutations from './mutations'
import * as actions from './actions'
import { devState, testState} from './state' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: devState,
  getters,
  mutations:{
    changehasToken (state, value) {
      state.hasToken = value
    },
    changeuserInfo (state, value) {
      state.userInfo = value
    },
  },
  actions
})

