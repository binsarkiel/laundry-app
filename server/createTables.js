const User = require('./models/user');
const Product = require('./models/product');
const Customer = require('./models/customer');
const Transaction = require('./models/transaction');
const TransactionDetail = require('./models/transactionDetail');


const createTables = async () => {
  try {
    await User.createTable();
    await Product.createTable();
    await Customer.createTable();
    await Transaction.createTable();
    await TransactionDetail.createTable();

    console.log('Tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    process.exit(); // Exit the process after creating tables
  }
};

createTables();