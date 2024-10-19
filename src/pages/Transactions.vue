<template>
    <app-layout page-title="Transactions" page-default-back-link="/microfin">
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Monthly Transactions</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item v-if="loading">Loading transactions...</ion-item>
            <ion-item 
            v-for="transaction in exp_transactions" 
            :key="transaction.id"
            :router-link="'/transaction/' + transaction.id">
            <ion-icon :icon="icons[useTransactionsStore().catIcon(transaction.category_id)]" :color="useTransactionsStore().catIconColor(transaction.category_id)"></ion-icon>
            <ion-label class="ion-padding-start ellipsis-text" color="primary">
                <h2>{{ transaction.description }}</h2>
                <p>{{ transaction.category_name }}</p>
            </ion-label>
                <ion-label  color="primary">
                    <ion-item style="width:100%; --inner-border-width: 0;">
                        <ion-label class="ion-text-center">
                            <h2>&#x20B9 {{ transaction.amount }}</h2>
                            <p>{{ useTransactionsStore().formatDateTime(transaction.created_at) }}</p>
                        </ion-label>
                    </ion-item>
                </ion-label>
                <!-- <ion-label class="ion-text-right" color="danger">&#x20B9 {{ transaction.amount }}</ion-label> -->
            </ion-item>
        </ion-list>
        </ion-card>
    </app-layout>
</template>

<script setup>
import { IonCard, IonCardHeader, IonCardSubtitle, IonList, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/vue";
import * as icons from "ionicons/icons"
import { useTransactionsStore } from "../stores/transactions";
import { ref, watch, onMounted, computed } from "vue";
import AppLayout from "../components/base/AppLayout.vue";

import { storeToRefs } from "pinia";

const transactionsStore = useTransactionsStore();
const { transactions, loading, exp_categories, error} = storeToRefs(transactionsStore);
const exp_transactions = computed(() => transactions.value.filter(t => t.transaction_type === "Expense"));

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

.ellipsis-text {
  display: block; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; /* Adds the ellipsis (...) */
  max-width: 100%; 
}
</style>