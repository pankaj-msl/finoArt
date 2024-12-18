<template>
    <base-layout page-title="Microfin">
    <!-- =================== Dasboard Chart ================================ -->
    <apexchart
  type="donut"
  :options="chartOptions"
  :series="chartSeries"
></apexchart>
     <ion-card>
        <ion-card-header color="light">
            <ion-card-subtitle color="primary">Microfinance Dashboard</ion-card-subtitle>
        </ion-card-header>
        <Pie :data="data" :options="options" />
     </ion-card>
    <!-- =================== Latest Transaction ============================ -->
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Recent Transactions &#x20B9{{ totalExpense }}</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item v-if="loading">Loading transactions...</ion-item>
            <ion-item 
            v-for="transaction in exp_transactions.slice(0,3)" 
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
            </ion-item>
        </ion-list>
        <ion-button color="tertiary" expand="block" :router-link="'/transactions'">View More</ion-button>
        </ion-card>

    <!-- =================== Cash and Accounts ============================== -->
     <ion-row>
        <ion-col size-md="6">
            <ion-card>
                <ion-card-header color="light">
                    <ion-card-subtitle>Cash</ion-card-subtitle>
                    <ion-card-title :style="accounts[0]?.account_amount > 0 ? 'color: #347928' : 'color: #72BF78'">{{ accounts[0]?.account_amount }}</ion-card-title>
                </ion-card-header>
            </ion-card>
        </ion-col>
        <ion-col size-md="6">
            <ion-card :router-link="'/accounts'">
                <ion-card-header color="light">
                    <ion-card-subtitle>Accounts</ion-card-subtitle>
                    <ion-card-title style="color:#433878">{{ accounts.length - 1 }}</ion-card-title>
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
            <ion-row 
            v-for="budget in budgets.slice(0,3)"
            :key="budget.id"
            :router-link="'/budget/' + budget.id"
            >
                <ion-col class="ion-padding-top">
                    <ion-label>{{ budget.category_name }}</ion-label>
                    <ion-label class="ion-float-right">Rs. {{ budget.budget_amount }}</ion-label>
                </ion-col>
                <ion-progress-bar type="linear" 
                :value="useBudgetStore().progressValue(budget.category_name, budget.budget_amount)"
                :style="{'--ion-color-primary': useBudgetStore().progressColor(budget.category_name, budget.budget_amount)}"
                ></ion-progress-bar>
            </ion-row>

            <ion-row v-if="budgets.length === 0" style="justify-content: center; margin-top: 12px;">
                <ion-button @click="createBudget">+ Create Budget</ion-button>
            </ion-row>
        </ion-card-content>
        <ion-button color="tertiary" :router-link="'/budgets'" expand="block">View More</ion-button>
    </ion-card>

    <!-- =========================== Speed Dial =========================== -->
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="openModal" color="primary">
                <ion-icon :icon="icons.add"></ion-icon>
            </ion-fab-button>
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
    IonFab, IonFabButton, IonFabList, modalController
} from "@ionic/vue";
import { useTransactionsStore } from "../stores/transactions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import * as chartConfig from './chartConfig.js'
import { useBudgetStore } from "../stores/budgets";
import Modal from '../components/base/Modal.vue';
import BudgetModal from '../components/base/BudgetModal.vue';
import BaseLayout from "../components/base/BaseLayout.vue";
import { useToast } from "vue-toastification";
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue';
import { storeToRefs } from "pinia";

const toast = useToast();

ChartJS.register(ArcElement, Tooltip, Legend)

const transactionsStore = ref([]);

transactionsStore.value = useTransactionsStore();
const { transactions, exp_categories, income_categories, parties, accounts, loading } = storeToRefs(transactionsStore.value);
const exp_transactions = computed(() => transactions.value.filter(t => t.transaction_type === "Expense"));

const budgets = computed(() => exp_categories.value.filter(e => e.budget_amount != null));

const totalExpense = computed(() => exp_transactions.value.reduce((total, t) => total + t.amount, 0));

// ====================== Apex Charts ===========================
// const expCat_total = computed(
//     () => exp_transactions.value
//     .reduce((sum, total) => {
//         let category_name = total.category_name;
//         if (category_name in sum){
//             sum[category_name] += total.amount;
//         } else {
//             sum[category_name] = total.amount;
//         }
//         return sum;
//     }, {}))

// Watch for changes in the computed totals
watch(expCat_total, (newVal) => {
  console.log('Total of Each Category of Expense: ', newVal);
  console.log("Keys: ", Object.keys(newVal));
  console.log("Values: ", Object.values(newVal));
});

const expCat_total = {
  "Snacks": 593,
  "Donation": 1540,
  "Clothings": 500,
  "Households": 2643,
  "Travels": 210,
  "Health": 80,
  "Grocessories": 210,
  "Rent": 4500,
  "Bills & Recharge": 651,
  "Investment": 399
}

function generateDistinctVibrantColors(count) {
  const goldenRatio = 0.618033988749895;
  return Array.from({ length: count }, (_, index) => {
    // Use golden ratio to create evenly distributed hues
    const hue = (index * goldenRatio * 360) % 360;
    
    // Alternate saturation and lightness to create more variation
    const saturation = 70 + (index % 2) * 30; // Alternates between 70% and 100%
    const lightness = 50 + (index % 3 === 0 ? 10 : 0); // Slight variation in lightness
    
    return `hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`;
  });
}

const data = {
    labels: Object.keys(expCat_total),
    datasets: [
      {
        backgroundColor: generateDistinctVibrantColors(Object.keys(expCat_total).length),
        data: Object.values(expCat_total)
      }
    ]
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
        padding: 10
    },
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                font: {
                    size: 10
                }
            }
        }
    }
}



// const { data, options } = chartConfig


//  ===================== End Apex Charts =========================

//  ===================== Open Modal ============================
    const openModal = async () => {
    const modal = await modalController.create({
      component: Modal,
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
  };

  onMounted(()=>{
    useTransactionsStore().fetchAPIs();
    if(localStorage.getItem('transactionCreated')){
        toast.success("Transaction Created Successfully!");
        localStorage.removeItem('transactionCreated');
    }
  })

  // ====================== Open Budget Form Modal =====================
  const createBudget = async() => {
    const budgetModal = await modalController.create({
        component: BudgetModal,
    });

    budgetModal.present();

    const { data } = await budgetModal.onWillDismiss();

    console.log(data);
  }
</script>

<style scoped>
.aligned-label {
  line-height: 1; /* Adjust as needed */
  vertical-align: middle; /* Aligns with the icon */
  margin-left: 4px; /* Adjust margin as needed */
}

.ion-margin-left {
    margin-left: 10px;
}

.ion-text-right {
    text-align: right;
}
.ellipsis-text {
  display: block; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; /* Adds the ellipsis (...) */
  max-width: 100%; 
}
</style>