import { defineStore } from 'pinia';
import { computed, ref, reactive } from "vue";
import axios from "axios";


export const useTransactionsStore = defineStore('transactions', () => {
    const transactions = ref([]);
    const exp_categories = ref([]);
    const income_categories = ref([]);
    const loan_type = ref([]);
    const parties = ref([]);
    const accounts = ref([]);

    const fetchAPIs = () => {
        axios
            .get("https://microfin.ritdos.com/api/get/apis")
            .then((response) => {
                console.log(response);
                transactions.value = response.data.transactions;
                console.log("pinia transactions: ", transactions.value);

                exp_categories.value = response.data.expCat.map((c) => ({
                    id: c.id,
                    category_name: c.category_name,
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

    fetchAPIs();

    return { transactions, exp_categories, income_categories, parties, loan_type, accounts, fetchAPIs }
});