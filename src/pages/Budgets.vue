<template>
<app-layout page-title="Manage Budget" page-default-back-link="/microfin">
<ion-card>
        <ion-card-header color="light">
            <ion-card-subtitle>Budget Management</ion-card-subtitle>
        </ion-card-header>
            
    
        <ion-card-content>
            <ion-row
            v-for="budget in budgets"
            :key="budget.id"
            :router-link="'/budget/' + budget.id"
            >
                <ion-col class="ion-padding-top">
                    <ion-label>{{ budget.category_name }}</ion-label>
                    <ion-label class="ion-float-right">Rs. {{ budget.budget_amount }}</ion-label>
                </ion-col>
                <ion-progress-bar type="linear" :value="useBudgetStore().progressValue(budget.category_name, budget.budget_amount)"
                :style="{'--ion-color-primary': useBudgetStore().progressColor(budget.category_name, budget.budget_amount)}"
                ></ion-progress-bar>
            </ion-row>
            <ion-row style="justify-content: center; margin-top: 12px;">
                <ion-button @click="createBudget">+ Create Budget</ion-button>
            </ion-row>
        </ion-card-content>
    </ion-card>
</app-layout>
</template>

<script setup>
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
import { useBudgetStore } from "../stores/budgets";
import BudgetModal from '../components/base/BudgetModal.vue';
import { ref, onMounted, computed } from 'vue';
import AppLayout from "../components/base/AppLayout.vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";


const toast = useToast();

const transactionsStore = useTransactionsStore();
const { transactions, exp_categories, income_categories, parties, accounts } = storeToRefs(transactionsStore);

const budgets = computed(() => exp_categories.value.filter(e => e.budget_amount != null));

// ====================== Open Budget Form Modal =====================
const createBudget = async() => {
    const budgetModal = await modalController.create({
        component: BudgetModal,
    });
    budgetModal.present();
    const { data } = await budgetModal.onWillDismiss();
    console.log(data);
  }

  onMounted(() => {
    transactionsStore.fetchAPIs(); 
    if(localStorage.getItem('budgetCreated')){
        toast.success("Budget Created Successfully!", {timeout: 3000});
        localStorage.removeItem('budgetCreated');
    }
    if(localStorage.getItem('budgetUpdated')){
        toast.success("Budget Updated Successfully!", {timeout: 3000});
        localStorage.removeItem('budgetUpdated');
    }
    if(localStorage.getItem('budgetDeleted')){
        toast.success("Budget Deleted Successfully!", {timeout: 3000});
        localStorage.removeItem('budgetDeleted');
    }
});
</script>

<style scoped></style>