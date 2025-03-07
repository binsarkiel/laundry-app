import React, {useState, useEffect} from 'react'

function CustomerForm({onAddCustomer, editingCustomer, onUpdateCustomer, onCancelEdit}) {
    const [name, setName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
      if(editingCustomer){
        setName(editingCustomer.name);
        setPhoneNumber(editingCustomer.phone_number);
        setAddress(editingCustomer.address);
      }else{
        setName('');
        setPhoneNumber('');
        setAddress('');
      }
    }, [editingCustomer])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(editingCustomer){
            onUpdateCustomer({id: editingCustomer.id, name, phone_number, address});
        }else{
            onAddCustomer({name, phone_number, address});
        }
        setName('');
        setPhoneNumber('');
        setAddress('');
    }
  return (
    <form onSubmit={handleSubmit} className="mb-4">
        <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded mr-2"
        />
        <input
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 rounded mr-2"
        />
        <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {editingCustomer ? 'Update Customer' : 'Add Customer'}
        </button>
        {editingCustomer && (
            <button type='button' onClick={onCancelEdit} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                Cancel
            </button>
        )}
    </form>
  )
}

export default CustomerForm