<template>
  <ion-header>
    <ion-toolbar>
      <ion-title class="ion-text-center">{{ modalTitle }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="ion-padding">
      <ion-card-header>
        <ion-card-title class="ion-text-center text-pink-darken-3">
          Add a Transaction
        </ion-card-title>
        <ion-card-subtitle
          class="ion-text-center ion-margin-bottom text-indigo-darken-1"
        >
          Use this form to create a transaction.
        </ion-card-subtitle>
      </ion-card-header>
      <form @submit.prevent="createOrUpdateTransaction()">
        <ion-item>
          <ion-label>Select Transaction Type</ion-label>
          <ion-select
            v-model="form.transaction_type"
            interface="popover"
            placeholder="Select One"
          >
            <ion-select-option
              v-for="type in populate.transaction_type"
              :key="type"
              :value="type"
            >
              {{ type }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item v-if="form.transaction_type === 'Expense'">
          <ion-label>Select Expense Categories</ion-label>
          <ion-select
            v-model="form.exp_category"
            interface="popover"
            placeholder="Select One"
          >
            <ion-select-option
              v-for="category in populate.exp_categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.category_name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item v-if="form.transaction_type === 'Income'">
          <ion-label>Select Income Type</ion-label>
          <ion-select
            v-model="form.income_category"
            interface="popover"
            placeholder="Select One"
          >
            <ion-select-option
              v-for="category in populate.income_categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.category_name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item v-if="form.transaction_type === 'Loans & Advances'">
          <ion-label>Select Loans & Advances</ion-label>
          <ion-select
            v-model="form.loan_type"
            interface="popover"
            placeholder="Select One"
          >
            <ion-select-option
              v-for="loan in populate.loan_type"
              :key="loan.id"
              :value="loan.id"
            >
              {{ loan.category_name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item
          v-if="form.transaction_type === 'Loans & Advances' && form.loan_type"
        >
          <ion-label>Select Party</ion-label>
          <ion-select
            v-model="form.party_id"
            interface="popover"
            placeholder="Select One"
          >
            <ion-select-option
              v-for="party in populate.parties"
              :key="party.id"
              :value="party.id"
            >
              {{ party.party_name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item
          v-if="
            form.transaction_type === 'Loans & Advances' &&
            form.party_name === '+ Add Party'
          "
        >
          <ion-label position="floating">Add New Party</ion-label>
          <ion-input
            v-model="form.new_party_name"
            placeholder="Enter New Party Name"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Amount</ion-label>
          <ion-input type="number" v-model="form.amount"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea v-model="form.description"></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label>Select Account</ion-label>
          <ion-select
            v-model="form.account"
            interface="popover"
            placeholder="Select One"
          >
            <ion-select-option
              v-for="account in populate.accounts"
              :key="account.id"
              :value="account.id"
            >
              {{ account.account_name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-grid>
          <ion-row>
            <ion-col size="6">
              <ion-button expand="full" type="submit" color="primary"
                >Submit</ion-button
              >
            </ion-col>
            <ion-col size="6">
              <ion-button expand="full" color="danger" @click="cancel"
                >Close</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-card>
  </ion-content>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonInput,
  modalController,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonTextarea,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";

const cancel = () => modalController.dismiss(null, "cancel");
const confirm = () => modalController.dismiss(name.value, "confirm");

import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";

const name = ref();
let drawer = ref(false);
let showTransactionModal = ref(false);
let transactions = ref({});

const modalTitle = ref("Create Transaction");

const populate = reactive({
  transaction_type: [
    "Expense",
    "Income",
    "Loans & Advances",
    "Withdraw",
    "Transfer",
  ],
  exp_categories: [
    {
      id: 1,
      category_name: "Grocessories",
      category_icon: "basket",
      category_icon_color: "success",
    },
    {
      id: 2,
      category_name: "Travels",
      category_icon: "basket",
      category_icon_color: "success",
    },
    {
      id: 3,
      category_name: "Bills & Recharges",
      category_icon: "basket",
      category_icon_color: "success",
    },
    {
      id: 4,
      category_name: "Snacks",
      category_icon: "basket",
      category_icon_color: "success",
    },
    {
      id: 5,
      category_name: "Households",
      category_icon: "basket",
      category_icon_color: "success",
    },
    {
      id: 6,
      category_name: "Liesures",
      category_icon: "basket",
      category_icon_color: "success",
    },
    {
      id: 7,
      category_name: "Clothing",
      category_icon: "basket",
      category_icon_color: "success",
    },
    {
      id: 8,
      category_name: "Rent",
      category_icon: "basket",
      category_icon_color: "success",
    },
  ],
  income_categories: ["Salary", "Cashback", "Commission"],
  loan_type: [],
  parties: ["Sunil", "Amit Bhaiya", "+ Add Others"],
  accounts: [],
  amount: 0,
  description: "",
});

const form = reactive({
  transaction_type: "",
  exp_category: "",
  income_category: "",
  loan_type: "",
  amount: 0,
  description: "",
  account: "",
  party_id: "",
  new_party_name: "",
});
</script>
