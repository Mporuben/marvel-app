import Axios from 'axios'
import { createApp } from 'vue'
import {
  IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonicVue, IonItem,
  IonLabel, IonList, IonPage, IonTitle, IonToolbar
} from '@ionic/vue'

import App from './App.vue'
import router from './views/router'
import store from './store'

import '@/assets/styles/global.sass'


Axios.defaults.baseURL = process.env.VUE_APP_API_URL


const app = createApp(App)
  .use(IonicVue, {mode: 'ios'})
  .use(router)
  .use(store)

//Global components
app
  //page
  .component('ion-page', IonPage)
  .component('ion-content', IonContent)
  .component('ion-header', IonHeader)
  .component('ion-toolbar', IonToolbar)
  .component('ion-title', IonTitle)
  //lists
  .component('ion-list', IonList)
  .component('ion-item', IonItem)
  .component('ion-label', IonLabel)
  .component('ion-avatar', IonAvatar)
  //buttons
  .component('ion-button', IonButton)
  .component('ion-buttons', IonButtons)
  //icons
  .component('ion-icon', IonIcon)


router.isReady().then(() => {
  app.mount('#app')
})
