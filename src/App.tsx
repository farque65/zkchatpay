import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ChatInterface } from "./components/ChatInterface";
import { ChatList } from "./components/ChatList";
import { AddressBook } from "./components/AddressBook";
import { ShopView } from "./components/ShopView";
export function App() {
  return <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/chat/:id" element={<ChatInterface />} />
          <Route path="/contacts" element={<AddressBook />} />
          <Route path="/shop" element={<ShopView />} />
        </Routes>
      </Layout>
    </Router>;
}