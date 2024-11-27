'use client';

import AddItem from '@/components/AddItem/AddItem';
import EmptyList from '@/components/EmptyList/EmptyList';
import ItemList from '@/components/ItemList/ItemList';
import { useMenu } from '@/context/menuContext';
import { useState } from 'react';

export default function Home() {
  const { menuItems } = useMenu();
  const [showAddItem, setShowAddItem] = useState<boolean>(
    menuItems.length > 0 ? true : false
  );

  const addItem = () => {
    setShowAddItem(true);
  };

  return (
    <div>
      {!showAddItem && menuItems.length === 0 && (
        <EmptyList addItem={addItem} />
      )}
      {showAddItem && menuItems.length < 1 && <AddItem />}
      <ItemList />
    </div>
  );
}
