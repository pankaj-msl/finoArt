<template>
    <base-layout page-title="Microfin">
    <!-- =================== Latest Transaction ============================ -->
        <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Recent Transactions</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item 
            v-for="transaction in transactionsStore.transactions" 
            :key="transaction.id" 
            :router-link="'/transaction/' + transaction.id">
            
            
            <ion-icon :icon="icons[transaction.icon]" :color="transaction.icon_color"></ion-icon>
            <!-- <ion-icon :icon="icons.heart"></ion-icon> -->

            
                <ion-label class="aligned-label"  color="primary">{{ transaction.name }}</ion-label>
                <ion-label class="ion-text-right" color="danger">&#x20B9 {{ transaction.amount }}</ion-label>
            </ion-item>
        </ion-list>
        <ion-button color="tertiary" expand="block">View More</ion-button>
        </ion-card>

    <!-- =================== Cash and Accounts ============================== -->
     <ion-row>
        <ion-col size-md="6">
            <ion-card>
                <ion-card-header color="light">
                    <ion-card-subtitle>Cash</ion-card-subtitle>
                    <ion-card-title>Rs. 10,000</ion-card-title>
                </ion-card-header>
            </ion-card>
        </ion-col>
        <ion-col size-md="6">
            <ion-card>
                <ion-card-header color="light">
                    <ion-card-subtitle>Accounts</ion-card-subtitle>
                    <ion-card-title>06</ion-card-title>
                </ion-card-header>
            </ion-card>
        </ion-col>
     </ion-row>

     <!-- ========================= Budget Management ========================== -->
      <ion-card>
        <ion-card-header color="light">
            <ion-card-subtitle>Budget Management</ion-card-subtitle>
        </ion-card-header>
            
    
        <ion-card-content>
            <ion-row>
                <ion-col class="ion-padding-top">
                    <ion-label>Food</ion-label>
                    <ion-label class="ion-float-right">Rs. 5,000</ion-label>
                </ion-col>
                <ion-progress-bar type="linear" value=".40"></ion-progress-bar>
            </ion-row>
            <ion-row>
                <ion-col class="ion-padding-top">
                    <ion-label>Entertainment</ion-label>
                    <ion-label class="ion-float-right">Rs. 2500</ion-label>
                </ion-col>
                <ion-progress-bar type="linear" value=".30"></ion-progress-bar>
            </ion-row>
        </ion-card-content>
        <ion-button color="tertiary" expand="block">View More</ion-button>
    </ion-card>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button color="primary">
                <ion-icon :icon="icons.add"></ion-icon>
            </ion-fab-button>
            <ion-fab-list side="top">
                <ion-fab-button color="secondary" @click="addTransaction('income')">
                    <ion-icon :icon="icons.cash"></ion-icon>
                </ion-fab-button>
                <ion-fab-button color="tertiary" @click="addTransaction('expense')">
                    <ion-icon :icon="icons.card"></ion-icon>
                </ion-fab-button>
            </ion-fab-list>
        </ion-fab>
    </base-layout>
</template>

<script setup>
import * as icons from "ionicons/icons"
import { 
    IonList, IonItem, IonLabel, IonImg, IonThumbnail, 
    IonRow, IonCol, 
    IonCard, IonCardHeader,  IonCardTitle, IonCardSubtitle, IonCardContent, IonProgressBar,
    IonButton, IonIcon,
    IonFab, IonFabButton, IonFabList
} from "@ionic/vue";
import { useTransactionsStore } from "../stores/transactions";

const transactionsStore = useTransactionsStore();
console.log(transactionsStore.transactions);
</script>

<style scoped>
.aligned-label {
  line-height: 1; /* Adjust as needed */
  vertical-align: middle; /* Aligns with the icon */
  margin-left: 4px; /* Adjust margin as needed */
}
</style>