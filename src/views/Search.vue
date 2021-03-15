<template>
  <ion-page>

    <ion-header>
      <ion-toolbar >
        <ion-searchbar class="ion-margin-top"></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-list>
        
        <ion-item lines="full">
          <ion-label>test</ion-label>
          <ion-buttons>
            <ion-button>
              <ion-icon :icon="heart" />
            </ion-button>
          </ion-buttons>

        </ion-item>

      </ion-list>
      
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar,  IonContent, IonSearchbar,  } from '@ionic/vue';
import { heartDislike, heart } from 'ionicons/icons';

export default  {
  components: { IonHeader, IonToolbar,  IonContent, IonPage,  IonSearchbar},

  setup() {
    return { heartDislike, heart }
  }
}
</script>