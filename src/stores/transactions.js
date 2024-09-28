import { defineStore } from 'pinia';

// export const useTransactionsStore = defineStore('transactions', {
//     state: () => ({
//         transactions: []
//     }),
//     actions: {
//         addTransaction({ commit }, transaction) {
//             commit('addTransaction', transaction);
//         },
//         removeTransaction({ commit }, transactionId) {
//             commit('removeTransaction', transactionId);
//         }
//     },
//     mutations: {
//         addTransaction(state, transaction) {
//             state.transactions.push(transaction);
//         },
//         removeTransaction(state, transactionId) {
//             state.transactions = state.transactions.filter(transaction => transaction.id!== transactionId);
//         }
//     }
// });

export const useTransactionsStore = defineStore('transactions', {
    state: () => ({
        transactions: [
            {
                id: 1,
                name: 'Grocessories',
                icon: 'basket',
                icon_color: 'primary',
                description: 'Purchase groceries and other essential items.',
                image: "https://farm3.staticflickr.com/2220/1572613671_7311098b76_z_d.jpg",
                amount: 100.00,
                date: new Date()
            },
            {
                id: 2,
                name: 'Snacks',
                icon: 'pizza',
                icon_color: 'danger',
                description: 'Purchase Kurkure and Crunch Biscuit.',
                image: "https://farm9.staticflickr.com/8505/8441256181_4e98d8bff5_z_d.jpg",
                amount: 56.00,
                date: new Date()
            },
            {
                id: 3,
                name: 'Bills and Recharges',
                icon: 'wallet',
                icon_color: 'warning',
                description: 'Jio Recharge of My Phone',
                image: "https://farm7.staticflickr.com/6089/6115759179_86316c08ff_z_d.jpg",
                amount: 301.00,
                date: new Date()
            },
        ]
    }),
})