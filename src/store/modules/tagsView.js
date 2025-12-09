const state = {
  visitedViews: [], // tabs
  cachedViews: []
}

const mutations = {
  // ADD_VISITED_VIEW: (state, view) => {
  //   if (state.visitedViews.some(v => v.fullPath === view.fullPath)) return
  //   state.visitedViews.push({
  //     ...view,
  //     title: view.meta.title || 'no-name'
  //   })
  // },
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.fullPath === view.fullPath)) return
    let title = view.meta.title || 'no-name'
    // 如果是 OrderProcess，加上订单号
    console.log(view)
    if (view.name === 'OrderProcess' && view.query && view.query.OrderNo) {
      title += ` - ${view.query.OrderNo}`
    }
    state.visitedViews.push({
      ...view,
      title
    })
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (view.name === 'OrderProcess' && !state.cachedViews.includes(view.fullPath)) {
      state.cachedViews.push(view.fullPath)
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => v.fullPath !== view.fullPath)
  },
  DEL_CACHED_VIEW: (state, view) => {
    if (view.name === 'OrderProcess') {
      state.cachedViews = state.cachedViews.filter(v => v !== view.fullPath)
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => v.meta.affix || v.fullPath === view.fullPath)
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    if (view.name === 'OrderProcess') {
      state.cachedViews = state.cachedViews.filter(v => v === view.fullPath)
    } else {
      state.cachedViews = []
    }
  },

  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedViews = state.visitedViews.filter(v => v.meta.affix)
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (const v of state.visitedViews) {
      if (v.fullPath === view.fullPath) {
        Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews')
      dispatch('delAllCachedViews')
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
