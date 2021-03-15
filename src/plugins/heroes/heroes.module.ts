import Axios from 'axios';

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
        heroes(state: any, heroes: any) {
            state.heroes = heroes
        },

        addFavorite(state, id){
            state.favoriteIdes.push(id)
        },

        removeFavorite(state, id) {
            const index = state.favoriteIdes.indexOf(id)
            state.favoriteIdes.splice(index, 1)
        }


    },


    actions: {
        async fetchHeroes({commit}) {
            try {
                const reps = await Axios.get(`/v1/public/characters?apikey=${process.env.VUE_APP_MARVEL_API_KEY}`)
                commit('heroes', reps.data.data.results)
            } catch(err) {
                console.error(err)
                throw err
            }
        },


        async toggleFavourite({state, commit, getters}, id) {
            const mutation = getters['isHeroFavorite'](id)? 'removeFavorite': 'addFavorite'
            await commit(mutation, id)
            localStorage.setItem('favoriteIdes', JSON.stringify(state.favoriteIdes))
        }

    }
}