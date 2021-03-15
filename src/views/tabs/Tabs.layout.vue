<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="search" href="/tabs/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>


        <ion-tab-button tab="favorite" href="/tabs/favorite">
          <ion-icon :icon="heart" />
          <ion-label>Favorite</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { search, heart } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },

  setup() {
    return { search, heart }
  }
}
</script>