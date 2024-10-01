import { defineStore } from 'pinia';
import { ref, watch, computed, reactive, onMounted } from 'vue';
import { format, isToday, isYesterday } from "date-fns";
import axios from 'axios';

export const useTransactionsStore = defineStore('transactions', () => {
    const transactions = ref([]);
    const exp_categories = ref([]);
    const income_categories = ref([]);
    const loan_type = ref([]);
    const parties = ref([]);
    const accounts = ref([]);
    const loading = ref(false); // New loading state
    const error = ref(null); // Error state if needed

    const fetchAPIs = async () => {
        loading.value = true; // Set loading to true
        error.value = null; // Reset error

        try {
            const response = await axios.get("https://microfin.ritdos.com/api/get/apis");
            console.log(response);
            transactions.value = response.data.transactions;
            console.log("pinia transactions: ", transactions.value);

            exp_categories.value = response.data.expCat.map((c) => ({
                id: c.id,
                category_name: c.category_name,
                cat_icon: c.cat_icon,
                cat_icon_color: c.cat_icon_color,
            }));
            console.log("Pinia Expense Categories", exp_categories.value);

            income_categories.value = response.data.incomeCat.map((c) => ({
                id: c.id,
                category_name: c.category_name,
            }));
            console.log("Pinia Income Categories: ", income_categories.value);

            loan_type.value = response.data.loanCat.map((c) => ({
                id: c.id,
                category_name: c.category_name,
            }));
            console.log("Pinia Loan Type: ", loan_type.value);

            parties.value = response.data.parties.map((p) => ({
                id: p.id,
                party_name: p.name,
            }));
            parties.value.push({ id: null, party_name: "+ Add Party" });
            console.log("Pinia Parties: ", parties.value);

            accounts.value = response.data.accounts.map((a) => ({
                id: a.id,
                account_name: a.account_name,
            }));
            console.log("Pinia Accounts: ", accounts.value);
        } catch (error) {
            console.error(error);
            error.value = 'Failed to fetch data'; // Set error message
        } finally {
            loading.value = false; // Set loading to false
        }
    };

    const editTransaction = (transactionId) => {
        console.log("Pinia Hitted", transactionId);
        return computed(() => transactions.value.find(transaction => transaction.id === transactionId));
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);

        if (isToday(date)) {
            return `Today at ${format(date, "HH:mm")}`;
        } else if (isYesterday(date)) {
            return `Yesterday at ${format(date, "HH:mm")}`;
        } else {
            return format(date, "d MMM',' HH:mm");
        }
    }

    const catIcon = (catId) => {
        const category = computed(() => exp_categories.value.find(exp => exp.id == catId));
        return category.value ? category.value.cat_icon : 'default-icon'
    }
    const catIconColor = (catId) => {
        const category = computed(() => exp_categories.value.find(exp => exp.id == catId));
        return category.value ? category.value.cat_icon_color : 'default-icon_color'
    }

    return {
        transactions, exp_categories, income_categories, parties, loan_type, accounts, loading, error,
        fetchAPIs, editTransaction, formatDateTime, catIcon, catIconColor
    };
});
