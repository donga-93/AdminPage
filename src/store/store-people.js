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
  },
  search: ''
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
  },
  setSearch(state,value) {
    state.search = value
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
  },
  setSearch({commit}, value) {
    commit('setSearch',value)
  }
}

const getters = {
  tasksFiltered: (state) => {
    let tasksFiltered = {}
    if (state.search) {
      Object.keys(state.people).forEach(function(key) {
        let task = state.people[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return state.people
  },
  peopleTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let people = {}
    Object.keys(tasksFiltered).forEach(function(key) {
      let task = tasksFiltered[key]
      if (!task.completed) {
        people[key] = task
      }
    })
    return people
  },
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
