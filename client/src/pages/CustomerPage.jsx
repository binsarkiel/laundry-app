import React, { useState, useEffect } from 'react';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';
import { customerService } from '../services/customerService';

function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const response = await customerService.getAllCustomers();
        if (response.success) {
            setCustomers(response.data)
        } else {
            setMessage(response.message)
        }
    }

    const handleAddCustomer = async (newCustomer) => {
        const response = await customerService.createCustomer(newCustomer.name, newCustomer.phone_number, newCustomer.address);
        if (response.success) {
            setCustomers([...customers, response.data]);
            setMessage("Success Create Data")
        } else {
            setMessage(response.message);
        }
    }

    const handleUpdateCustomer = async (updatedCustomer) => {
        const response = await customerService.updateCustomer(updatedCustomer.id, updatedCustomer.customer_code, updatedCustomer.name, updatedCustomer.phone_number, updatedCustomer.address);

        if (response.success) {
            const updatedCustomers = customers.map((customer) =>
                customer.id === updatedCustomer.id ? response.data : customer
            );
            setCustomers(updatedCustomers);
            setEditingCustomer(null);
            setMessage("Success Update Data")
        } else {
            setMessage(response.message)
        }
    };
    const handleDeleteCustomer = async (customerId) => {

        const response = await customerService.deleteCustomer(customerId);
        if (response.success) {
            setCustomers(customers.filter((customer) => customer.id !== customerId));
            setMessage("Success Delete Data")
        } else {
            setMessage(response.message);
        }
    };
    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
    };
    const handleCancelEdit = () => {
        setEditingCustomer(null);
    }
    return (
        <div className='container mx-auto p-4'>
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            {message && <p className='text-red-500'>{message}</p>}
            <CustomerForm
                onAddCustomer={handleAddCustomer}
                editingCustomer={editingCustomer}
                onUpdateCustomer={handleUpdateCustomer}
                onCancelEdit={handleCancelEdit}
            />
            <CustomerList
                customers={customers}
                onDeleteCustomer={handleDeleteCustomer}
                onEditCustomer={handleEditCustomer}
            />
        </div>
    )
}

export default CustomerPage