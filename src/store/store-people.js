import Vue from 'vue'
import {uid} from 'quasar'

const state = {
  people: {
    'ID1': {
      id:1,
      name:'John',
      surname:'Doe',
      mobileNumber:'1111111',
      position:'IT',
      status:'active',
      password:'master-333'
    },
    'ID2': {
      id:2,
      name:'Jane',
      surname:'Doe',
      mobileNumber:'1111111',
      position:'HR',
      status:'active',
      password:'hello-123'
    },
    'ID3': {
      id:2,
      name:'George',
      surname:'Doe',
      mobileNumber:'2222222',
      position:'IT',
      status:'Passive',
      password:'Bigboss-111'
    }
  }
}

const mutations = {
  updateTask(state, payload) {
    Object.assign(state.people[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.people, id)
  },
  addTask(state, payload) {
    Vue.set(state.people, payload.id, payload.task)
  }
}

const actions = {
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  }
}

const getters = {
  people: (state) => {
    return state.people
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters

}
