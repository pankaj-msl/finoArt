<template>
    <app-layout page-title="Update Account" page-default-back-link="/microfin">
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle>Edit Account</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-list>
                    <ion-item class="ion-padding-top">
                        <ion-label color="primary">
                            <h2>{{ account.account_name }}</h2>
                            <p>{{ account.account_type }}</p>
                        </ion-label>
                        <ion-label  color="primary">
                        <ion-item style="width:100%; --inner-border-width: 0;">
                            <ion-label class="ion-text-center">
                                <h2>&#x20B9 {{ account.account_amount }}</h2>
                            </ion-label>
                        </ion-item>
                </ion-label>
                    </ion-item>
                    <ion-label 
                    @click="deleteAccount"
                    color="success">
                            <ion-button color="danger" expand="block">
                                <ion-icon :icon="icons.trashBinOutline"></ion-icon>Delete
                            </ion-button>
                    </ion-label>
                </ion-list>
            </ion-card-content>
        </ion-card>
    </app-layout>
    </template>
    
    <script setup>
    import { storeToRefs } from "pinia";
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
    import { ref, reactive, computed, watch, onMounted } from "vue";
import { useTransactionsStore } from "../stores/transactions";
import * as icons from "ionicons/icons";
import AppLayout from "../components/base/AppLayout.vue";

import axios from "axios";


    const route = useRoute();
    const accountId = parseInt(route.params.id);
    const isEditable = ref(false);
    
    const transactionsStore = useTransactionsStore();
    const { accounts } = storeToRefs(transactionsStore);
    
    const account =  computed(() => accounts.value.find(acc => acc.id === accountId));

    const deleteAccount = () => {
    if (confirm("Are you sure you want to delete this Account?")) {
        axios.delete(`https://microfin.ritdos.com/api/account/delete/${accountId}`) 
        .then(() => {  
            window.location.href = '/accounts'; 
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        console.log("User Cancelled to delete this Account");
        return;
    }
}

    
</script>
    
    <style scoped></style>