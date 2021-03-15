import Axios from 'axios'

export default {
  namespaced: true,

  state: {
    searchText: '',
    totalOffset: 0,
    heroes: []
  },

  getters: {
    isSearchEmpty: (state) => !!state.searchText.length,
    areAllHeroesLoaded: (state) => state.totalOffset == state.heroes.length
  },

  mutations: {
    searchText(state, text) {
      state.searchText = text
      state.heroes = []
    },

    heroesFinded(state, {heroes, totalOffset}) {
      state.heroes = state.heroes.concat(heroes)
      state.totalOffset = totalOffset
    },

  },

  actions: {
    async findHeroesByName({commit, dispatch}, search) {
      await commit('searchText', search)
      await dispatch('fetchHeroes')
    },

    async fetchHeroes({commit, state}) {
      try {
        const offset = state.heroes.length
        const resp = await Axios.get(`/v1/public/characters?apikey=${process.env.VUE_APP_MARVEL_API_KEY}&nameStartsWith=${state.searchText}&offset=${offset}`)
        await commit('heroesFinded', {
          heroes: resp.data.data.results,
          totalOffset: resp.data.data.total
        })
      } catch(err) {
        console.error(err)
      }
    }

  }
}
