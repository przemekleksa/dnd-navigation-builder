import { MenuItem } from '@/types/MenuItem';

export const saveDataToLocalStorage = (menuList: MenuItem[]) => {
  localStorage.setItem('Menu list', JSON.stringify(menuList));
};

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('Menu list');
  return data ? data : '[]';
};
