import { useMenu } from '@/context/menuContext';
import { MenuItem } from '@/types/MenuItem';
import { useState } from 'react';
import AddItem from '../AddItem/AddItem';
import Button from '../Button/Button';
import Item from '../Item/Item';

const ItemList = () => {
  const { menuItems, removeMenuItem } = useMenu();
  const [isItemForm, setItemForm] = useState<boolean | null>(null);

  const topLevelItems = menuItems.filter((item) => !item.parentId);

  const addItem = () => {
    setItemForm(true);
  };

  const hideForm = () => setItemForm(false);

  const itemForm = () => {
    if (isItemForm) {
      return <AddItem hideForm={hideForm} />;
    }
    return null;
  };

  const renderItems = (items: MenuItem[], level: number = 0) => {
    return items.map((item, index) => {
      const childItems = menuItems.filter(
        (child) => child.parentId === item.id
      );

      return (
        <div
          key={item.id}
          style={{ marginLeft: `${level > 0 && level * 64}px` }}
        >
          <Item item={item} removeItem={removeMenuItem} itemIndex={index} />
          {childItems.length > 0 && renderItems(childItems, level + 1)}
        </div>
      );
    });
  };

  return (
    <div
      className="m-3 
      rounded-md 
      border-[1px]
    "
    >
      {renderItems(topLevelItems)}

      {isItemForm ? (
        itemForm()
      ) : (
        <div className="px-6 py-5 rounded-b-md border-[1px] border-t-0">
          <Button onClick={addItem}>Dodaj pozycję menu</Button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
