import React from 'react';
import { isAddress } from 'viem';
import { EthereumAddress } from './types';

interface AddressListProps {
  addresses: EthereumAddress[];
  onDeleteAddress: (index: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onDeleteAddress }) => {
  const handleDelete = (index: number) => {
    onDeleteAddress(index);
  };

  const isValidAddress = (address: string) => {
    return isAddress(address);
  };

  return (
    <ul>
      {addresses.map((address, index) => (
        <li key={index}>
          {address.address}
          {isValidAddress(address.address) ? (
            <span className="valid-address">Valid</span>
          ) : (
            <span className="invalid-address">Invalid</span>
          )}
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default AddressList;