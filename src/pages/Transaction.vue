<template>
  <base-layout page-title="Transactions" page-default-back-link="/microfin">
    <ion-card>
      <ion-card-header>
        <ion-card-title class="ion-text-center">{{
          transaction.category_name
        }}</ion-card-title>
        <ion-list>
          <ion-item>
            <ion-label>Amount</ion-label>
            <ion-label class="ion-text-right"
              >Rs {{ transaction.amount }}</ion-label
            >
          </ion-item>
          <ion-item>
            <ion-label>Description</ion-label>
            <ion-label class="ion-text-right">{{
              transaction.description
            }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Transaction Date</ion-label>
            <ion-label class="ion-text-right">{{
              useTransactionsStore().formatDateTime(transaction.created_at)
            }}</ion-label>
          </ion-item>
          <ion-item style="--inner-border-width: 0">
            <ion-label color="warning">
              <ion-tab-button
                ><ion-icon :icon="icons.createOutline"></ion-icon
                >Edit</ion-tab-button
              >
            </ion-label>
            <ion-label color="danger">
              <ion-tab-button
                ><ion-icon :icon="icons.trashBinOutline"></ion-icon
                >Delete</ion-tab-button
              >
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-header>
    </ion-card>
  </base-layout>
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
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
  modalController,
} from "@ionic/vue";
import { useTransactionsStore } from "../stores/transactions";
import { useRoute } from "vue-router";
import * as icons from "ionicons/icons";
import { onMounted, ref, computed } from "vue";

const route = useRoute();
const transactionId = parseInt(route.params.id);
console.log(transactionId);

const transaction = useTransactionsStore().editTransaction(transactionId).value;
</script>

<style scoped></style>
