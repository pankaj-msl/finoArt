<template>
    <base-layout page-title="Accounts" page-default-back-link="/microfin">
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Accounts</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item v-if="loading">Loading accounts...</ion-item>
            <ion-item 
            v-for="account in accounts" 
            :key="account.id"
            :router-link="'/account/' + account.id">
            <!-- <ion-icon :icon="icons[useTransactionsStore().catIcon(transaction.category_id)]" :color="useTransactionsStore().catIconColor(transaction.category_id)"></ion-icon> -->
            <ion-label class="ion-padding-start ellipsis-text" color="primary">
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
                <!-- <ion-label class="ion-text-right" color="danger">&#x20B9 {{ account.amount }}</ion-label> -->
            </ion-item>
        </ion-list>
        <ion-row style="justify-content: center; margin-bottom: 6px;">
                <ion-button @click="createAccount">+ Create Account</ion-button>
            </ion-row>
        </ion-card>
    </base-layout>
</template>

<script setup>
import { IonCard, IonCardHeader, IonCardSubtitle, IonList, IonItem, IonLabel, IonButton, IonIcon, IonRow, modalController, } from "@ionic/vue";
import * as icons from "ionicons/icons"
import { useTransactionsStore } from "../stores/transactions";
import AccountModal from '../components/base/AccountModal.vue';
import { ref, watch, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";

const transactionsStore = useTransactionsStore();
const { accounts } = storeToRefs(transactionsStore);

onMounted(() => {
    transactionsStore.fetchAPIs(); 
});

// ====================== Open Budget Form Modal =====================
const createAccount = async() => {
    const accountModal = await modalController.create({
        component: AccountModal,
    });

    accountModal.present();

    const { data } = await accountModal.onWillDismiss();

    console.log(data);
  }
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
  text-overflow: ellipsis;
  max-width: 100%; 
}
</style>