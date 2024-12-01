'use client';

import AddItem from '@/components/AddItem/AddItem';
import EmptyList from '@/components/EmptyList/EmptyList';
import ItemList from '@/components/ItemList/ItemList';
import { useMenu } from '@/context/MenuContext';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { menuItems } = useMenu();
  const [showAddItem, setShowAddItem] = useState<boolean>(menuItems.length > 0);

  const showAddItemForm = () => {
    setShowAddItem(true);
  };

  const handleBackToEmptyList = () => {
    setShowAddItem(false);
  };

  useEffect(() => {
    if (menuItems.length === 0) setShowAddItem(false);
  }, [menuItems]);

  return (
    <div>
      {!showAddItem && menuItems.length === 0 && (
        <EmptyList addItem={showAddItemForm} />
      )}
      {showAddItem && menuItems.length < 1 && (
        <AddItem backToEmptyList={handleBackToEmptyList} />
      )}
      <ToastContainer />
      <ItemList />
    </div>
  );
}
