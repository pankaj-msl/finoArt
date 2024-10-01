<template>
    <base-layout page-title="Transactions" page-default-back-link="/microfin">
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Monthly Transactions</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item v-if="loading">Loading transactions...</ion-item>
            <ion-item 
            v-for="transaction in transactions" 
            :key="transaction.id"
            :router-link="'/transaction/' + transaction.id">
                <!-- <ion-icon :icon="icons[transaction.icon]" :color="transaction.icon_color"></ion-icon> -->
                <ion-label class="aligned-label"  color="primary">{{ transaction.category_name }}</ion-label>
                <ion-label class="ion-text-right" color="danger">&#x20B9 {{ transaction.amount }}</ion-label>
                <ion-icon @click="editTransactionModal(transaction.id)" class="ion-margin-left" :icon="icons.createOutline" color="primary"></ion-icon>
            </ion-item>
        </ion-list>
        </ion-card>
    </base-layout>
</template>

<script setup>
import { IonCard, IonCardHeader, IonCardSubtitle, IonList, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/vue";
import * as icons from "ionicons/icons"
import { useTransactionsStore } from "../stores/transactions";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";

const transactionsStore = useTransactionsStore();
const { transactions, fetchAPIs, loading, error } = storeToRefs(transactionsStore);

const editTransactionModal = (transactionId) => {
    // Open the modal here
    console.log("Modal open");
};

onMounted(() => {
    transactionsStore.fetchAPIs(); 
});
</script>

<style scoped>
.ion-margin-left {
    margin-left: 10px;
}

.ion-text-right {
    text-align: right;
}

.aligned-label {
    display: flex;
    align-items: center;
}
</style>