<template>
    <base-layout page-title="Transactions" page-default-back-link="/microfin">
        <ion-card>
            <ion-card-header>
                <ion-card-title>Transaction Detail Page</ion-card-title>
            </ion-card-header>
        </ion-card>
    </base-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { 
    IonList, IonItem, IonLabel, IonImg, IonThumbnail, 
    IonRow, IonCol, 
    IonCard, IonCardHeader,  IonCardTitle, IonCardSubtitle, IonCardContent, IonProgressBar,
    IonButton, IonIcon,
    IonFab, IonFabButton, IonFabList, modalController
} from "@ionic/vue";
import { useTransactionsStore } from '../stores/transactions';
import { useRoute } from 'vue-router';
import { onMounted, ref, computed } from "vue";


const route = useRoute();
const transactionId = parseInt(route.params.id);
console.log(transactionId);


onMounted(()=>{
    const transaction = useTransactionsStore().editTransaction(transactionId).value;
    console.log(transaction.value);
})
</script>

<style scoped>

</style>