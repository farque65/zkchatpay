import React, { useEffect, useState } from 'react';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import './tailwind.css';
import { EthereumAddress } from './types';

const App: React.FC = () => {
  const [addresses, setAddresses] = useState<EthereumAddress[]>([]);
  const [address, setAddress] = useState<string>('');
  const [newAddress, setNewAddress] = useState('');
  const [addressList, setAddressList] = useState<any[]>([]);
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    if (localStorage?.getItem('evmAT')) {
      const result = JSON.parse(localStorage.getItem('evmAT') ?? '');
      console.log('result', result);
      if (result) {
        setAddresses(result[address] || []);
      }
    }
  }, []);

  // ... (useEffect for loading and saving addresses) ...

  const handleAddAddress = (address: EthereumAddress) => {
    setAddresses([...addresses, address]);
  };

  const handleDeleteAddress = (index: number) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  return (
    <div className="container px-5 py-24 mx-auto">
      <h1 className='text-blue-500'>Ethereum Address Tracker</h1>
      <AddressForm onAddAddress={handleAddAddress} />
      <AddressList addresses={addresses} onDeleteAddress={handleDeleteAddress} />
    </div>
  );
};

export default App;