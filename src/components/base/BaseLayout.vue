<template>
    <ion-page id="main-content">
    <ion-menu side="end" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the menu content.</ion-content>
  </ion-menu>   
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <ion-menu-button></ion-menu-button>
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
        IonBackButton,
        IonMenu,
        IonMenuButton, 
    } from "@ionic/vue";

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
    /* Your CSS styles here */
    </style>