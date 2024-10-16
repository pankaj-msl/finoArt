<template>
  <base-layout page-title="Update Budget" page-default-back-link="/microfin">
    <ion-card>
      <ion-card-header color="light">
        <ion-card-subtitle>Edit Budget</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item class="ion-padding-top">
            <ion-label color="primary"
              ><h2>{{ budget.category_name }}</h2></ion-label
            >

            <ion-input
            class="ion-text-right"
              v-model="form.amount"
              type="number"
              placeholder="Amount"
            ></ion-input>
          </ion-item>
          <ion-progress-bar type="linear" value=".40"></ion-progress-bar>
          <ion-item>
            <ion-label @click="updateBudget" color="success">
              <ion-tab-button
                ><ion-icon :icon="icons.checkmarkCircleOutline"></ion-icon
                >Save</ion-tab-button
              >
            </ion-label>
            <ion-label @click="deleteBudget" class="ion-text-right">
              <ion-tab-button>
                <ion-icon
                  :icon="icons.trashBinOutline"
                  color="danger"
                ></ion-icon
                >Delete
              </ion-tab-button>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
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
import axios from "axios";

const route = useRoute();
const budgetId = parseInt(route.params.id);
const isEditable = ref(false);

const transactionsStore = useTransactionsStore();
const { exp_categories } = storeToRefs(transactionsStore);

const budget = computed(() =>
  exp_categories.value.find((exp) => exp.id === budgetId)
);

const Amount = ref(budget.value.budget_amount);

const deleteBudget = () => {
  console.log("deleteBudget");
  if (confirm("Are you sure you want to delete this budget?")) {
    axios
      .delete(`https://microfin.ritdos.com/api/budget/delete/${budgetId}`)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log("User Cancelled to delete this budget");
    return;
  }
};

const form = reactive({
  exp_category: budgetId,
  amount: Amount,
});

//   console.log(form.exp_category)

const updateBudget = () => {
  axios
    .post("https://microfin.ritdos.com/api/budget/update", form)
    .then(() => {
      console.log("Budget created successfully");
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style scoped></style>
