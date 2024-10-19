<template>
    <app-layout page-title="Categories" page-default-back-link="/microfin">
    <ion-card>
            <ion-card-header color="light">
                <ion-card-subtitle color="primary">Categories</ion-card-subtitle>
            </ion-card-header>
            <ion-list>
            <ion-item v-if="loading">Loading categories...</ion-item>
            <ion-item 
            v-for="category in categories" 
            :key="category.id"
            :router-link="'/category/' + category.id">
            <!-- <ion-icon :icon="icons[useTransactionsStore().catIcon(transaction.category_id)]" :color="useTransactionsStore().catIconColor(transaction.category_id)"></ion-icon> -->
            <ion-label class="ion-padding-start ellipsis-text" color="primary">
                <h2>{{ category.category_name }}</h2>
                <p>{{ category.category_type }}</p>
            </ion-label>
                <ion-label @click="deleteCategory(category.id)" color="primary">
                    <ion-item style="width:100%; --inner-border-width: 0;">
                        <ion-label class="ion-text-right">
                            <ion-tab-button>
                                <ion-icon
                                :icon="icons.trashBinOutline"
                                color="danger"
                                ></ion-icon
                                >Delete
                            </ion-tab-button>
                        </ion-label>
                    </ion-item>
                </ion-label>
                <!-- <ion-label class="ion-text-right" color="danger">&#x20B9 {{ account.amount }}</ion-label> -->
            </ion-item>
        </ion-list>
        <ion-row style="justify-content: center; margin-bottom: 6px;">
                <ion-button @click="createCategory">+ Create Category</ion-button>
            </ion-row>
        </ion-card>
    </app-layout>
</template>

<script setup>
import { IonCard, IonCardHeader, IonCardSubtitle, IonList, IonItem, IonLabel, IonButton, IonIcon, IonRow, modalController, IonTabButton } from "@ionic/vue";
import * as icons from "ionicons/icons"
import { useTransactionsStore } from "../stores/transactions";
import AppLayout from "../components/base/AppLayout.vue";
import { ref, watch, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';
import CategoryModal from "../components/base/CategoryModal.vue";
import axios from "axios";

const route = useRoute();

const transactionsStore = useTransactionsStore();
const { exp_categories, income_categories, loading } = storeToRefs(transactionsStore);

const categories = [...exp_categories.value, ...income_categories.value];

onMounted(() => {
    transactionsStore.fetchAPIs(); 
});

// ====================== Open Budget Form Modal =====================
const createCategory = async() => {
    const categoryModal = await modalController.create({
        component: CategoryModal,
    });
    categoryModal.present();
    const { data } = await categoryModal.onWillDismiss();
    console.log(data);
  }

  // ====================== Delete Category =====================
  const deleteCategory = (categoryId) => {
  console.log("deleteCategory");
  if (confirm("Are you sure you want to delete this Category?")) {
    axios
      .delete(`https://microfin.ritdos.com/api/category/delete/${categoryId}`)
      .then(() => {
        window.location.href = "/categories";
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log("User Cancelled to delete this Category");
    return;
  }
};
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