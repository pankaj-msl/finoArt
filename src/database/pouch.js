import PouchDB from 'pouchdb';

const initializeDatabase = async () => {
    try {
        // Create PouchDB database instance
        const db = new PouchDB('microfin');

        // Create the 'categories' documents
        const categories = [
            { _id: '1', transaction_type: 'Expense', category_name: 'Groceries', budget_amount: null, category_icon: 'basket-outline', category_icon_color: '#FF6347' },
            { _id: '2', transaction_type: 'Expense', category_name: 'Snacks', budget_amount: null, category_icon: 'pizza-outline', category_icon_color: '#FFA500' },
            { _id: '3', transaction_type: 'Expense', category_name: 'Bills & Recharge', budget_amount: null, category_icon: 'receipt-outline', category_icon_color: '#32CD32' },
            { _id: '4', transaction_type: 'Expense', category_name: 'Travels', budget_amount: null, category_icon: 'airplane-outline', category_icon_color: '#4682B4' },
            { _id: '5', transaction_type: 'Expense', category_name: 'Grooming', budget_amount: null, category_icon: 'cut-outline', category_icon_color: '#C71585' },
            { _id: '6', transaction_type: 'Expense', category_name: 'Leisure', budget_amount: null, category_icon: 'game-controller-outline', category_icon_color: '#8A2BE2' },
            { _id: '7', transaction_type: 'Expense', category_name: 'Investment', budget_amount: null, category_icon: 'trending-up-outline', category_icon_color: '#FF4500' },
            { _id: '8', transaction_type: 'Expense', category_name: 'Health', budget_amount: null, category_icon: 'medkit-outline', category_icon_color: '#DC143C' },
            { _id: '9', transaction_type: 'Expense', category_name: 'Education', budget_amount: null, category_icon: 'school-outline', category_icon_color: '#4682B4' },
            { _id: '10', transaction_type: 'Expense', category_name: 'Households', budget_amount: null, category_icon: 'home-outline', category_icon_color: '#20B2AA' },
            { _id: '11', transaction_type: 'Expense', category_name: 'Misc. Expense', budget_amount: null, category_icon: 'shuffle-outline', category_icon_color: '#DAA520' },
            { _id: '12', transaction_type: 'Income', category_name: 'Salary', budget_amount: null, category_icon: 'cash-outline', category_icon_color: '#228B22' },
            { _id: '13', transaction_type: 'Income', category_name: 'Cashback', budget_amount: null, category_icon: 'card-outline', category_icon_color: '#B8860B' },
            { _id: '14', transaction_type: 'Income', category_name: 'Commission', budget_amount: null, category_icon: 'briefcase-outline', category_icon_color: '#2E8B57' },
            { _id: '15', transaction_type: 'Income', category_name: 'Other Income', budget_amount: null, category_icon: 'wallet-outline', category_icon_color: '#DA70D6' },
            { _id: '16', transaction_type: 'Loans & Advances', category_name: 'Given', budget_amount: null, category_icon: 'arrow-forward-outline', category_icon_color: '#9932CC' },
            { _id: '17', transaction_type: 'Loans & Advances', category_name: 'Taken', budget_amount: null, category_icon: 'arrow-back-outline', category_icon_color: '#8B0000' },
        ];

        // Insert categories into the database
        await db.bulkDocs(categories);
        console.log('Categories inserted successfully');

        // Create the 'category_master' documents
        const categoryMaster = [
            { _id: '1', transaction_type: 'Expense', created_at: new Date(), updated_at: new Date() },
            { _id: '2', transaction_type: 'Income', created_at: new Date(), updated_at: new Date() },
            { _id: '3', transaction_type: 'Loans & Advances', created_at: new Date(), updated_at: new Date() },
            { _id: '4', transaction_type: 'Withdrawal', created_at: new Date(), updated_at: new Date() },
            { _id: '5', transaction_type: 'Transfer', created_at: new Date(), updated_at: new Date() },
        ];

        // Insert category master into the database
        await db.bulkDocs(categoryMaster);
        console.log('Category Master inserted successfully');

        // Create the 'parties' documents
        const parties = [
            { _id: '1', name: '+ Add Party', mob_num: '1234567890', email: 'john@example.com', status: 'active', created_at: new Date(), updated_at: new Date() },
            // Add more party documents as needed
        ];
        await db.bulkDocs(parties);
        console.log('Parties inserted successfully');

        // Create the 'transactions' documents
        // const transactions = [
        //     { _id: '1', category_id: '1', party_id: '1', account_id: '1', transaction_type: 'Expense', category_name: 'Groceries', amount: 100.00, description: 'Grocery shopping', created_at: new Date(), updated_at: new Date() },
        //     // Add more transaction documents as needed
        // ];
        // await db.bulkDocs(transactions);
        // console.log('Transactions inserted successfully');

        // Create the 'accounts' documents
        const accounts = [
            { _id: '1', account_name: 'Cash', account_type: 'Current Account', account_icon: 'bank-outline', account_icon_color: '#0000FF', created_at: new Date(), updated_at: new Date() },
            // Add more account documents as needed
        ];
        await db.bulkDocs(accounts);
        console.log('Accounts inserted successfully');

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export default initializeDatabase;
