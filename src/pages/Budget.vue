<template>
    <base-layout page-title="Update Budget" page-default-back-link="/microfin">
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle>Edit Budget</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-row>
                    <ion-col class="ion-padding-top">
                        <ion-label>Food</ion-label>
                        <ion-label class="ion-float-right">Rs. 5,000</ion-label>
                        <ion-input v-model="foodAmount" type="number" placeholder="Amount"></ion-input>
                    </ion-col>
                    <ion-progress-bar type="linear" value=".40"></ion-progress-bar>
                </ion-row>
            </ion-card-content>
        </ion-card>
    </base-layout>
    </template>
    
    <script setup>
    import {
      IonList,
      IonItem,
      IonLabel,
      IonImg,
      IonThumbnail,
      IonRow,
      IonCol,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonTabButton,
      IonCardSubtitle,
      IonCardContent,
      IonProgressBar,
      IonInput,
      IonButton,
      IonIcon,
      IonFab,
      IonFabButton,
      IonFabList,
      modalController,
      IonDatetime,
    } from "@ionic/vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const budgetId = parseInt(route.params.id);
    const isEditable = ref(false);

    
    </script>
    
    <style scoped></style>