'use client';

import { MenuItem } from '@/types/MenuItem';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from '@/utils/ManipulateLocalStorage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (newItem: MenuItem) => void;
  removeMenuItem: (id: string) => void;
  updateMenuItem: (updatedItem: MenuItem) => void;
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const itemsData = getDataFromLocalStorage();
    if (itemsData) {
      setMenuItems(JSON.parse(itemsData));
    }
  }, []);

  const addMenuItem = (newItem: MenuItem) => {
    setMenuItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      saveDataToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const removeMenuItem = (id: string) => {
    setMenuItems((prevItems) => {
      const getChildrenIds = (
        items: MenuItem[],
        parentId: string
      ): string[] => {
        const directChildren = items.filter(
          (item) => item.parentId === parentId
        );
        return directChildren.reduce(
          (acc, child) => [
            ...acc,
            child.id,
            ...getChildrenIds(items, child.id),
          ],
          [] as string[]
        );
      };

      const idsToRemove = [id, ...getChildrenIds(prevItems, id)];

      const updatedItems = prevItems.filter(
        (item) => !idsToRemove.includes(item.id)
      );

      saveDataToLocalStorage(updatedItems);

      return updatedItems;
    });
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      saveDataToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        removeMenuItem,
        updateMenuItem,
        setMenuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
