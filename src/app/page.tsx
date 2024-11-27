'use client';

import AddItem from '@/components/AddItem/AddItem';
import EmptyList from '@/components/EmptyList/EmptyList';
import { useState } from 'react';

export default function Home() {
  const [showThis, setShowThis] = useState(null);

  const [menuList, setMenuList] = useState(null);

  const saveDataToLocalStorage = (menuList: string[]) => {
    localStorage.setItem('Menu list', JSON.stringify(menuList));
  };

  return (
    <div>
      <EmptyList />
      <AddItem />
    </div>
  );
}
