const Customer = require('../models/customer');

const customerController = {
  createCustomer: async (req, res) => {
    try {
      const { name, phone_number, address } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
      const newCustomer = await Customer.create(name, phone_number, address);
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(500).json({ message: 'Error creating customer', error: error.message });
    }
  },
  getAllCustomers: async (req, res) => {
    try {
        console.log("getAllCustomers called"); // Tambahkan log ini
        const customers = await Customer.getAll(); // Pastikan method getAll ada.
        console.log("Customers fetched from model:", customers); // Tambahkan log ini
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error fetching customers:", error); // Pastikan ini ada
        console.error("Error stack:", error.stack); // Tambahkan log ini (PENTING)
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
},
    getCustomerById: async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await Customer.findById(parseInt(id, 10));
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching customer', error: error.message });
        }
    },

    updateCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, phone_number, address } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'name are required' });
            }
            const updatedCustomer = await Customer.update(parseInt(id, 10), name, phone_number, address);

            if (!updatedCustomer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json(updatedCustomer);
        } catch (error) {
            res.status(500).json({ message: 'Error updating customer', error: error.message });
        }
    },

    deleteCustomer: async (req, res) => {
        try {
            const { id } = req.params;
            await Customer.delete(parseInt(id, 10));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting customer', error: error.message });
        }
    },
};

module.exports = customerController;