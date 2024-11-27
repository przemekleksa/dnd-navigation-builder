'use client';

import AddItem from '@/components/AddItem/AddItem';
import EmptyList from '@/components/EmptyList/EmptyList';
import ItemList from '@/components/ItemList/ItemList';
import { MenuItem } from '@/types/MenuItem';
import { getDataFromLocalStorage } from '@/utils/ManipulateLocalStorage';
import { useEffect, useState } from 'react';

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    const itemsData = getDataFromLocalStorage();
    if (itemsData) {
      setMenuItems(JSON.parse(itemsData));
    }
  }, []);

  return (
    <div>
      <EmptyList />
      <AddItem setMenuItems={setMenuItems} />
      <ItemList menuItems={menuItems} setMenuItems={setMenuItems} />
    </div>
  );
}
