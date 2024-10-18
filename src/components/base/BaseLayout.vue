<template>
    <ion-page id="main-content">
    <ion-menu side="end" menu-id="app-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-button routerLink="/transactions">
            <ion-icon :icon="icons.cash" color="success"></ion-icon>
            <ion-label style="padding-left: 4px;">Transactions</ion-label>
        </ion-button>
        <ion-item routerLink="/accounts">
            <ion-icon :icon="icons.briefcase" color="primary"></ion-icon>
            <ion-label style="padding-left: 4px;">Accounts</ion-label>
        </ion-item>
        <!-- <ion-item :router-link="'/parties'">
            <ion-icon :icon="icons.person" color="warning"></ion-icon>
            <ion-label style="padding-left: 4px;">Parties</ion-label>
        </ion-item> -->
        <!-- <ion-item :router-link="'/categories'">
            <ion-icon :icon="icons.albums" color="tertiary"></ion-icon>
            <ion-label style="padding-left: 4px;">Categories</ion-label>
        </ion-item> -->
        <ion-item routerLink="/budgets">
            <ion-icon :icon="icons.cart" color="danger"></ion-icon>
            <ion-label style="padding-left: 4px;">Budgets</ion-label>
        </ion-item>
        
    </ion-content>
  </ion-menu>   
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button @click="toggleMenu"></ion-menu-button>
                </ion-buttons>    
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <slot>Microfin</slot>
        </ion-content>        
    </ion-page>
    </template>
    
    <script setup>
    import { 
        IonPage, 
        IonHeader, 
        IonToolbar, 
        IonTitle, 
        IonContent, 
        IonButtons,
        IonButton,
        IonBackButton,
        IonMenu,
        IonMenuButton, 
        IonList, 
        IonItem,
        IonLabel,
        IonIcon,
        menuController,
        onIonViewWillEnter
    } from "@ionic/vue";
    import * as icons from "ionicons/icons";
    import { onMounted} from "vue";
    import { useRouter } from 'vue-router';

    const toggleMenu = async () => {
    menuController.open('app-menu');
    console.log('Toggling menu');
};

// Use Vue Router for navigation
const router = useRouter();
    defineProps({
        pageTitle: {
            type: String,
            required: true
        },
        pageDefaultBackLink: {
            type: String,
            required: false
        }
    })
    </script>
    
<style scoped>
.menu-content-open {
  pointer-events: auto !important;
}
</style>