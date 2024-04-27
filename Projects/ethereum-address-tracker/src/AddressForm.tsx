import React, { useState, useEffect } from 'react';
import { isAddress } from 'viem';
import { EthereumAddress } from './types';

interface AddressFormProps {
  onAddAddress: (address: EthereumAddress) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddAddress }) => {
  const [address, setAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [addressList, setAddressList] = useState<any[]>([]);
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    if (localStorage?.getItem('evmAT')) {
      const result = JSON.parse(localStorage.getItem('evmAT') ?? '');
      console.log('result', result);
      if (result) {
        setAddressList(result[address]);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAddress(address)) {
      alert('Invalid address');
      return;
    }
    if (address.trim() !== '') {
      onAddAddress({ address });
      setAddress('');
    }

    // Add Address
    if (localStorage?.getItem('evmAT')) {
      // get string array from local storage with key 'evmAT'
      const oldPayload = JSON.parse(localStorage.getItem('evmAT') as string);;
      console.log('view old payload ', oldPayload[address]);
      oldPayload[address] = [...oldPayload[address], newAddress];
      localStorage.setItem('evmAT', JSON.stringify(oldPayload));
      setAddressList([...addressList, newAddress] as string[] | never[]); // Fix: Provide type annotation for addressList
      setNewAddress('');
    } else {
      const newItem: { [key: string]: string[] } = {}; // Fix: Add type annotation for newItem
      newItem[address] = [newAddress];
      localStorage.setItem('evmAT', JSON.stringify(newItem));
      setAddressList([newAddress] as string[] | never[]); // Fix: Provide type annotation for addressList
      setNewAddress('');
    }
    console.log('newAddress', newAddress);
  };

    //remove address from address list
    const removeAddress = (address: any) => {
      console.log('removeAddress', address);
      const oldPayload = JSON.parse(localStorage.getItem('evmAT') as string);
      const payload = oldPayload.address.filter((item: any) => item !== address) || [];
      localStorage.setItem('evmAT', JSON.stringify(payload));
      setAddressList(oldPayload.address.filter((item: any) => item !== address));
    };
  
    //edit address from address list
    const editAddress = (address: any, newAddress: any) => {
      console.log('editAddress', address, newAddress);
      const oldPayload = JSON.parse(localStorage.getItem('evmAT') as string); // Add type assertion
      const payload = oldPayload.address.map((item: any) => (item === address ? newAddress : item));
      localStorage.setItem('evmAT', JSON.stringify(payload));
      setAddressList(oldPayload.address.map((item: any) => (item === address ? newAddress : item)));
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Ethereum address"
      />
      <button type="submit">Add Address</button>
    </form>
  );
};

export default AddressForm;