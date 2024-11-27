import { useMenu } from '@/context/menuContext';
import { MenuItem } from '@/types/MenuItem';
import { useState } from 'react';
import AddItem from '../AddItem/AddItem';
import Titlebar from './Titlebar';

type Props = {
  item: MenuItem;
  removeItem: (id: string) => void;
  itemIndex?: number;
};

const Item = ({ item, removeItem, itemIndex }: Props) => {
  const [isSubitemForm, setIsSubitemForm] = useState<boolean | null>(null);
  const { menuItems } = useMenu();
  const { id: parentId } = item;

  const childItems = menuItems.filter((child) => child.parentId === parentId);

  const addSubItem = () => {
    setIsSubitemForm(true);
  };

  const hideForm = () => setIsSubitemForm(false);

  const subItemForm = () => {
    if (isSubitemForm) {
      return <AddItem hideForm={hideForm} parentId={parentId} />;
    }
    return null;
  };

  return (
    <div>
      <Titlebar
        item={item}
        removeItem={removeItem}
        addSubItem={addSubItem}
        itemIndex={itemIndex}
      />
      {subItemForm()}
      {childItems.length > 0 && (
        <div className="pl-16 ">
          {childItems.map((child) => (
            <Item key={child.id} item={child} removeItem={removeItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
