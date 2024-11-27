import { MenuItem } from '@/types/MenuItem';
import { saveDataToLocalStorage } from '@/utils/ManipulateLocalStorage';
import Item from '../Item/Item';

type Props = {
  menuItems: MenuItem[];
  setMenuItems: (menuItems: MenuItem[]) => void;
};

const ItemList = ({ menuItems, setMenuItems }: Props) => {
  const removeItem = (id: string) => {
    const updatedItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedItems);
    saveDataToLocalStorage(updatedItems);
  };

  const items = menuItems
    .map((item) => {
      return <Item item={item} key={item.id} removeItem={removeItem} />;
    })
    .reverse();

  if (menuItems.length === 0) {
    return null;
  }

  return <div>{items}</div>;
};

export default ItemList;
