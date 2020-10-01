export const state = () => ({
  categoryFamilies: [],
  logged: false,
  profile: {},
})

export const mutations = {
  setLogged(state, payload) {
    state.logged = payload
  },
  setProfile(state, payload) {
    state.profile = payload
  },
  setEmail(state, payload) {
    state.profile.email = payload
  },
  updateMemberType(state, payload) {
    state.auth.user.memberType = payload
  },
}

export const actions = {
  async getProfile({ commit, state }) {
    try {
      const getProjectOwner = async id =>
        this.$axios.$get(
          `/api/v1/project-owner/${id}?excludeFields=highSearchText,highSearchWords,lowSearchText&published=any`,
        )

      let profile = { edit: true }

      if (state.auth.user.memberType === 'project-owner') {
        Object.assign(profile, await getProjectOwner(state.auth.user.projectOwner._id))
      } else {
        if (state.auth.user.memberType === 'both') {
          const projectOwner = await getProjectOwner(`${state.auth.user.projectOwner._id}`)
          Object.assign(profile, projectOwner, { projectOwnerId: projectOwner._id })
        }

        const results = await this.$axios.$get(
          `/api/v1/contractor/${state.auth.user.contractor._id}?excludeFields=highSearchText,highSearchWords,lowSearchText&published=any`,
        )
        Object.assign(profile, results)
      }

      commit('setProfile', profile)
    } catch (error) {
      commit('setProfile', {})
    }
  },
}

export const getters = {
  isLegitimateToEdit: state => profile =>
    Boolean(state.auth.loggedIn && profile.edit && profile.email && state.auth.user.username === profile.email),
}
