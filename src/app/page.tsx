'use client';

import AddItem from '@/components/AddItem/AddItem';
import Button from '@/components/Button/Button';
import { data } from '@/components/data/data';
import EmptyList from '@/components/EmptyList/EmptyList';
import ItemList from '@/components/ItemList/ItemList';
import { useMenu } from '@/context/MenuContext';
import { saveDataToLocalStorage } from '@/utils/ManipulateLocalStorage';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { menuItems, setMenuItems } = useMenu();
  const [showAddItem, setShowAddItem] = useState<boolean>(
    menuItems.length > 0 ? true : false
  );

  const addItem = () => {
    setShowAddItem(true);
  };

  const resetData = () => {
    saveDataToLocalStorage(data);
    setMenuItems(data);
  };

  return (
    <div>
      <Button onClick={resetData}>Reset data</Button>
      {!showAddItem && menuItems.length === 0 && (
        <EmptyList addItem={addItem} />
      )}
      {showAddItem && menuItems.length < 1 && <AddItem />}
      <ToastContainer />
      <ItemList />
    </div>
  );
}
