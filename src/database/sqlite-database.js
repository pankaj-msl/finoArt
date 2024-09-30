import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';


const initializeDatabase = async () => {
  try {

    // Create an SQLiteConnection instance
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    if (Capacitor.getPlatform() === 'web') {
      const jeepEl = document.querySelector('jeep-sqlite');
      if (jeepEl) {
        console.log("first")
        await customElements.whenDefined('jeep-sqlite');
        await jeepEl.initWebStore();
      }
    }
    const db = await sqlite.createConnection('microfin', false, 'no-encryption', 1);

    await db.open();

    // Create the 'categories' table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY,
          transaction_type TEXT,
          category_name TEXT,
          budget_amount REAL,
          category_icon TEXT,
          category_icon_color TEXT,
          created_at DATETIME,
          updated_at DATETIME
        );
      `);

    //inserting necessary categories
    await db.run(`
        INSERT INTO categories (id, transaction_type, category_name, budget_amount, category_icon, category_icon_color, created_at, updated_at) VALUES
        (1, 'Expense', 'Groceries', NULL, 'basket-outline', '#FF6347', NULL, NULL),
        (2, 'Expense', 'Snacks', NULL, 'pizza-outline', '#FFA500', NULL, NULL),
        (3, 'Expense', 'Bills & Recharge', NULL, 'receipt-outline', '#32CD32', NULL, NULL),
        (4, 'Expense', 'Travels', NULL, 'airplane-outline', '#4682B4', NULL, NULL),
        (5, 'Expense', 'Grooming', NULL, 'cut-outline', '#C71585', NULL, NULL),
        (6, 'Expense', 'Leisure', NULL, 'game-controller-outline', '#8A2BE2', NULL, NULL),
        (7, 'Expense', 'Investment', NULL, 'trending-up-outline', '#FF4500', NULL, NULL),
        (8, 'Expense', 'Health', NULL, 'medkit-outline', '#DC143C', NULL, NULL),
        (9, 'Expense', 'Education', NULL, 'school-outline', '#4682B4', NULL, NULL),
        (10, 'Expense', 'Households', NULL, 'home-outline', '#20B2AA', NULL, NULL),
        (11, 'Expense', 'Misc. Expense', NULL, 'shuffle-outline', '#DAA520', NULL, NULL),
        (12, 'Income', 'Salary', NULL, 'cash-outline', '#228B22', NULL, NULL),
        (13, 'Income', 'Cashback', NULL, 'card-outline', '#B8860B', NULL, NULL),
        (14, 'Income', 'Commission', NULL, 'briefcase-outline', '#2E8B57', NULL, NULL),
        (15, 'Income', 'Other Income', NULL, 'wallet-outline', '#DA70D6', NULL, NULL),
        (16, 'Loans & Advances', 'Given', NULL, 'arrow-forward-outline', '#9932CC', NULL, NULL),
        (17, 'Loans & Advances', 'Taken', NULL, 'arrow-back-outline', '#8B0000', NULL, NULL);
        `);

    // Create the 'category_master' table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS category_master (
          id INTEGER PRIMARY KEY,
          transaction_type TEXT,
          created_at DATETIME,
          updated_at DATETIME
        );
      `);

    // inserting necessary transaction type 
    await db.run(`
     INSERT INTO category_master (id, transaction_type, created_at, updated_at) VALUES
      (1, 'Expense', '2024-09-19 15:34:05', '2024-09-19 15:34:18'),
      (2, 'Income', '2024-09-19 15:34:11', '2024-09-19 15:34:21'),
      (3, 'Loans & Advances', '2024-09-19 15:34:14', '2024-09-19 15:34:25'),
      (4, 'Withdrawal', '2024-09-19 15:34:14', '2024-09-19 15:34:25'),
      (5, 'Transfer', '2024-09-19 15:34:14', '2024-09-19 15:34:25'); 
      `)

    // Create the 'parties' table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS parties (
          id INTEGER PRIMARY KEY,
          name TEXT,
          mob_num TEXT,
          email TEXT,
          status TEXT,
          created_at DATETIME,
          updated_at DATETIME
        );
      `);

    // Create the 'transactions' table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY,
          category_id INTEGER,
          party_id INTEGER,
          account_id INTEGER,
          transaction_type TEXT,
          category_name TEXT,
          amount REAL,
          description TEXT,
          created_at DATETIME,
          updated_at DATETIME,
          FOREIGN KEY (category_id) REFERENCES categories(id),
          FOREIGN KEY (party_id) REFERENCES parties(id)
          FOREIGN KEY (account_id) REFERENCES accounts(id)
        );
      `);

    // Create the 'accounts' table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY,
        account_name TEXT,
        account_type TEXT,
        account_icon TEXT,
        account_icon_color,
        created_at DATETIME,
        updated_at DATETIME,

      );
      `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export default initializeDatabase;
