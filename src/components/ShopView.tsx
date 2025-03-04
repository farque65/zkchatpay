import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { CheckoutModal } from "./modals/CheckoutModal";
const products = [{
  id: 1,
  name: "Premium NFT #1",
  price: "0.5 ETH",
  image: "https://picsum.photos/200/200"
}, {
  id: 2,
  name: "Digital Art Collection",
  price: "0.8 ETH",
  image: "https://picsum.photos/200/201"
}, {
  id: 3,
  name: "Crypto Punk Clone",
  price: "1.2 ETH",
  image: "https://picsum.photos/200/202"
}, {
  id: 4,
  name: "Virtual Land",
  price: "2.0 ETH",
  image: "https://picsum.photos/200/203"
}, {
  id: 5,
  name: "Gaming Asset",
  price: "0.3 ETH",
  image: "https://picsum.photos/200/204"
}, {
  id: 6,
  name: "Digital Collectible",
  price: "0.6 ETH",
  image: "https://picsum.photos/200/205"
}];
export const ShopView = () => {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);
  return <div className="flex-1 bg-white">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Shop</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map(product => <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.price}</p>
              <button onClick={() => setSelectedProduct(product)} className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2">
                <ShoppingCart size={16} />
                <span>Buy Now</span>
              </button>
            </div>
          </div>)}
      </div>
      <CheckoutModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct!} />
    </div>;
};