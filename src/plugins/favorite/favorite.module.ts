import Axios from 'axios'

export default {
  namespaced: true,

  state: {
    heroes: [],
    favoriteIdes: JSON.parse(localStorage.getItem('favoriteIdes')) || []
  },

  getters: {
    isHeroFavorite: (state) => (id) => state.favoriteIdes.includes(id)
  },

  mutations: {
    cleanUpLoadedHeroes(state) {
      state.heroes = []
    },

    heroLoaded(state, hero) {
      state.heroes.push(hero)
    },

    addFavorite(state, id){
      state.favoriteIdes.push(id)
    },

    removeFavorite(state, {idIndex, heroesIndex}) {
      state.favoriteIdes.splice(idIndex, 1)
      state.heroes.splice(heroesIndex, 1)
    }
  },


  actions: {
    async fetchFavoriteHeroes({state, commit, dispatch}) {
      await commit('cleanUpLoadedHeroes')
      state.favoriteIdes.forEach((id) => dispatch('fetchHeroById', id))
    },

    async fetchHeroById({commit}, id) {
      try {
        const resp = await Axios.get(`/v1/public/characters/${id}?apikey=${process.env.VUE_APP_MARVEL_API_KEY}`)
        resp.data.data.results[0]
        commit('heroLoaded', resp.data.data.results[0])
      } catch(err){
        console.error(err)
      }
    },

    async toggleFavourite({state, getters, dispatch}, id) {
      const actionName = getters['isHeroFavorite'](id) ? 'removeFavorite' : 'addFavorite'
      await dispatch(actionName, id)
      localStorage.setItem('favoriteIdes', JSON.stringify(state.favoriteIdes))
    },

    async addFavorite({commit, dispatch}, id) {
      await commit('addFavorite', id)
      await dispatch('fetchHeroById', id)
    },

    async removeFavorite({state, commit}, id) {
      const idIndex = state.favoriteIdes.indexOf(id)
      const heroesIndex = state.heroes.findIndex((hero) => hero.id == id)
      await commit('removeFavorite', {idIndex, heroesIndex})
    }

  }

}




