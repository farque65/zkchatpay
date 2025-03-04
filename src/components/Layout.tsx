import React from "react";
import { Sidebar } from "./Sidebar";
import { CryptoWidget } from "./CryptoWidget";
export const Layout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <CryptoWidget />
        {children}
      </main>
    </div>;
};