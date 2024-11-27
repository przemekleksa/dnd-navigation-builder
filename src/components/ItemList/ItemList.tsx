import { useMenu } from '@/context/menuContext';
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

  if (topLevelItems.length === 0) {
    return null;
  }

  return (
    <div
      className="m-3 
      rounded-md 
      border-[1px]
    "
    >
      {topLevelItems.map((item, index) => (
        <Item
          item={item}
          key={item.id}
          removeItem={removeMenuItem}
          itemIndex={index}
        />
      ))}

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
