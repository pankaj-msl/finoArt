<template>
    <app-layout page-title="Update Party" page-default-back-link="/microfin">
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle>Edit Party</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
                <ion-list>
                    <ion-item class="ion-padding-top">
                        <ion-label class="ion-text-center" color="primary">
                            <h2>{{ party.party_name }}</h2>
                        </ion-label>   
                    </ion-item>
                    <ion-list v-for="transaction in partyTransactions" style="width:100%; --inner-border-width: 0;">
                            <ion-item :router-link="'/transaction/' + transaction.id">
                                <ion-label>{{transaction.category_name }}</ion-label>
                                <ion-label><h2>&#x20B9 {{transaction.amount }}</h2></ion-label>
                                    <ion-icon size="large" color="warning" :icon="icons.createOutline"></ion-icon>
                            </ion-item>
                        </ion-list>
                    <ion-item>
                        <ion-label 
                    @click="deleteParty"
                    color="danger">
                            <ion-tab-button>
                                <ion-icon :icon="icons.trashBinOutline"></ion-icon>Delete Party
                            </ion-tab-button>
                    </ion-label>
                    <ion-label 
                    @click="fullySettled"
                    color="success">
                            <ion-tab-button>
                                <ion-icon :icon="icons.trashBinOutline"></ion-icon>Full Settlement
                            </ion-tab-button>
                    </ion-label>
                    </ion-item>
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
    const partyId = parseInt(route.params.id);
    const isEditable = ref(false);
    
    const transactionsStore = useTransactionsStore();
    const { parties, transactions } = storeToRefs(transactionsStore);
    
    const party =  computed(() => parties.value.find(p => p.id === partyId));
    const partyTransactions = computed(() => transactions.value.filter(t => t.party_id === partyId))


    console.log(partyTransactions.value);

    const deleteParty = () => {
    if (confirm("Are you sure you want to delete this Party?")) {
        axios.delete(`https://microfin.ritdos.com/api/party/delete/${partyId}`) 
        .then(() => {  
            window.location.href = '/parties'; 
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        console.log("User Cancelled to delete this Party");
        return;
    }
}

    const fullySettled = () => {

        //
    }

    
</script>
    
    <style scoped></style>