<template>
  <app-layout page-title="Transaction" page-default-back-link="/microfin">
    <ion-card>
      <ion-card-header>
        <ion-card-title class="ion-text-center">{{
          transaction.category_name
        }}</ion-card-title>
        <ion-list>
          <ion-item>
            <ion-label>Amount</ion-label>
            <ion-label v-if="!isEditable" class="ion-text-right"
              >Rs {{ transaction.amount }}</ion-label
            >
            <ion-input
            class="ion-text-right"
              v-else
              v-model="editableTransaction.amount"
              type="number"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Description</ion-label>
            <ion-label v-if="!isEditable" class="ion-text-right">{{
              transaction.description
            }}</ion-label>
            <ion-input
            class="ion-text-right"
              v-else
              v-model="editableTransaction.description"
              type="text"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Transaction Date</ion-label>
            <ion-label v-if="!isEditable" class="ion-text-right">{{
              useTransactionsStore().formatDateTime(transaction.created_at)
            }}</ion-label>
            <ion-datetime
              v-else
              v-model="formattedCreatedAt"
              presentation="date-time"
            ></ion-datetime>
          </ion-item>
          <ion-item style="--inner-border-width: 0">
            <ion-label 
            v-if="!isEditable"
            @click="isEditable = !isEditable"
            color="warning">
              <ion-tab-button 
                ><ion-icon :icon="icons.createOutline"></ion-icon
                >Edit</ion-tab-button
              >
            </ion-label>
            <ion-label 
            v-else
            @click="updateTransaction"
            color="success">
              <ion-tab-button
                ><ion-icon :icon="icons.checkmarkCircleOutline"></ion-icon
                >Save</ion-tab-button
              >
            </ion-label>
            <ion-label 
            v-if="isEditable"
            @click="isEditable = !isEditable"
            color="danger">
              <ion-tab-button 
                ><ion-icon :icon="icons.closeCircleOutline"></ion-icon
                >Cancel</ion-tab-button
              >
            </ion-label>
            <ion-label
            v-if="!isEditable"
            @click="deleteTransaction"
            color="danger">
              <ion-tab-button
                ><ion-icon :icon="icons.trashBinOutline"></ion-icon
                >Delete</ion-tab-button
              >
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-header>
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
import { useTransactionsStore } from "../stores/transactions";
import { format, parseISO } from 'date-fns';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for CSS
import { useRoute } from "vue-router";
import * as icons from "ionicons/icons";
import { onMounted, ref, computed, watch } from "vue";
import AppLayout from "../components/base/AppLayout.vue";
import { useToast } from "vue-toastification";

import axios from "axios";

const toast = useToast();
const route = useRoute();
const transactionId = parseInt(route.params.id);
const isEditable = ref(false);
console.log(transactionId);

watch(()=>isEditable.value, (newVal)=>{
  console.log(newVal);
})

const transaction = useTransactionsStore().editTransaction(transactionId).value;
const editableTransaction = ref({ ...transaction});

const updateTransaction = () => {
    axios.put('https://microfin.ritdos.com/api/transaction/update', editableTransaction.value)
    .then(response => {
       isEditable.value = false;
       localStorage.setItem("transactionUpdated", true);
       window.location.href = "/transactions";
      
     })
     .catch(error => {
        toast.error('Failed to update transaction.');
       console.error('Error updating transaction:', error);
     });
}

const deleteTransaction = () => {
  axios.delete(`https://microfin.ritdos.com/api/transaction/delete/${transactionId}`)
    .then(response => {
       isEditable.value = false;
       localStorage.setItem("transactionDeleted", true);
       window.location.href = "/transactions";
     })
    .catch(error => {
       toast.error('Failed to delete transaction.');
       console.error('Error deleting transaction:', error);
     });
}

const formattedCreatedAt = computed(()=>{
  const date = new Date(editableTransaction.value.created_at);
  return date.toISOString().slice(0, 16);
})

console.log(formattedCreatedAt.value)

</script>

<style scoped></style>
