<template>
    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
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