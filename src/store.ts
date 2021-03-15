import { createStore } from "vuex"
import favorite from '@/plugins/favorite/favorite.module'
import search from "./plugins/search/search.module"

export default createStore({
  modules: {
    favorite,
    search
  }
})
