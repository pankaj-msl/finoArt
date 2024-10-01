<template>
    <base-layout page-title="Microfin">
    <!-- =================== Latest Transaction ============================ -->
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Monthly Transactions</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item v-if="loading">Loading transactions...</ion-item>
            <ion-item 
            v-for="transaction in transactions.slice(0,2)" 
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
        <ion-button color="tertiary" expand="block" :router-link="'/transactions'">View More</ion-button>
        </ion-card>
        <!-- <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Recent Transactions</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item 
            v-for="transaction in transactions.slice(0,2)" 
            :key="transaction.id"
            :router-link="'/transaction/' + transaction.id">
                <ion-icon :icon="icons[transaction.icon]" :color="transaction.icon_color"></ion-icon>
                <ion-label class="aligned-label"  color="primary">{{ transaction.category_name }}</ion-label>
                <ion-label class="ion-text-right" color="danger">&#x20B9 {{ transaction.amount }}</ion-label>
            </ion-item>
        </ion-list>
        <ion-button color="tertiary" expand="block" :router-link="'/transactions'">View More</ion-button>
        </ion-card> -->

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
import Modal from '../components/base/Modal.vue';
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";

const transactionsStore = ref([]);

transactionsStore.value = useTransactionsStore();

// onMounted(() => {
//     useTransactionsStore().fetchAPIs();
// })

const { transactions, exp_categories, income_categories, parties, accounts } = storeToRefs(transactionsStore.value);
console.log("component", transactions);


//  ===================== Open Modal ============================
    const openModal = async () => {
    const modal = await modalController.create({
      component: Modal,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      message.value = `Hello, ${data}!`;
    }
  };

  onMounted(()=>{
    console.log("mounted");
    useTransactionsStore().fetchAPIs();
  })
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

/* .aligned-label {
    display: flex;
    align-items: center;
} */

.ellipsis-text {
  display: block; 
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; /* Adds the ellipsis (...) */
  max-width: 100%; 
}
</style>