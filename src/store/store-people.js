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
      name:'David',
      surname:'Taylor',
      mobileNumber:'1111111',
      position:'HR',
      status:'active',
      password:'hello-123'
    },
    'ID3': {
      id:2,
      name:'Alan',
      surname:'Walker',
      mobileNumber:'2222222',
      position:'IT',
      status:'Passive',
      password:'Bigbos-111'
    }
  },
  search: '',
  sort: 'name'
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
  },
  setSort(state,value) {
    state.sort = value
  },
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
  },
  setSort({commit}, value) {
    commit('setSort',value)
  }
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.people)
    keysOrdered.sort((a,b) => {
      let taskAProp = state.people[a][state.sort].toLowerCase(),
          taskBProp = state.people[b][state.sort].toLowerCase()
      if(taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return  -1
      else return 0
    })
      keysOrdered.forEach((key) => {
        tasksSorted[key] = state.people[key]
      })

    return tasksSorted
  },

  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted,
     tasksFiltered = {}
    if (state.search) {
      Object.keys(tasksSorted).forEach(function(key) {
        let task = tasksSorted[key],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
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
