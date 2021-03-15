import { createStore } from "vuex";
import heroes from '@/plugins/heroes/heroes.module'

export default createStore({
    modules: {
        heroes
    }
})