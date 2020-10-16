import Vue from 'vue'

export const state = () => ({
  order: {},
})

export const mutations = {
  addToOrder(state, payload) {
    Vue.set(state.order, payload.slug, {
      ...payload,
      quantity: state.order[payload.slug] ? state.order[payload.slug].quantity + 1 : 1,
    })
  },
  updateQuantity(state, payload) {
    state.order[payload.slug].quantity = payload.quantity
  },
  removeFromOrder(state, payload) {
    if (state.order[payload.slug].quantity > 0) {
      state.order[payload.slug].quantity--
    }
  },
  emptyOrder(state) {
    state.order = {}
  },
}
