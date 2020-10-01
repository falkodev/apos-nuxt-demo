const defaultSnackbar = {
  top: true,
  show: false,
  message: '',
  bottom: false,
  timeout: 6000,
  color: 'success',
}

export const state = () => defaultSnackbar

export const actions = {
  displaySnack({ commit }, payload) {
    commit('setSnack', payload)
    setTimeout(() => commit('resetSnack'), payload.timeout || defaultSnackbar.timeout)
  },
}

export const mutations = {
  setSnack(state, payload) {
    state.show = true
    state.message = payload.message
    state.top = payload.top || (!payload.bottom && defaultSnackbar.top)
    state.color = payload.color || defaultSnackbar.color
    state.bottom = (!payload.top && payload.bottom) || defaultSnackbar.bottom
    state.timeout = payload.timeout || defaultSnackbar.timeout
  },
  resetSnack(state) {
    state.top = defaultSnackbar.top
    state.show = defaultSnackbar.show
    state.color = defaultSnackbar.color
    state.bottom = defaultSnackbar.bottom
    state.timeout = defaultSnackbar.timeout
    state.message = defaultSnackbar.message
  },
}
