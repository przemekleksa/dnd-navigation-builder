import { useMenu } from '@/context/MenuContext';
import { MenuItem } from '@/types/MenuItem';
import { saveDataToLocalStorage } from '@/utils/ManipulateLocalStorage';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AddItem from '../AddItem/AddItem';
import Button from '../Button/Button';
import Item from '../Item/Item';

const ItemList = () => {
  const { menuItems, removeMenuItem, setMenuItems } = useMenu();
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
        <div key={item.id} style={{ marginLeft: `${level !== 0 && 64}px` }}>
          <Item item={item} removeItem={removeMenuItem} itemIndex={index} />
          {childItems.length > 0 && renderItems(childItems, level + 1)}
        </div>
      );
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      console.log('No target, restoring original state');
      setMenuItems([...menuItems]);
      return;
    }

    const activeItem = menuItems.find((item) => item.id === active.id);
    const overItem = menuItems.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      console.log('Active or over item not found!');
      return;
    }
    if (activeItem.id === overItem.id) {
      console.log('Cannot assign self as parent!');
      return;
    }

    const isDescendant = (parentId: string, childId: string): boolean => {
      let current = menuItems.find((item) => item.id === childId);

      while (current) {
        if (current.parentId === parentId) {
          return true;
        }
        current = menuItems.find((item) => item.id === current?.parentId);
      }

      return false;
    };

    if (isDescendant(activeItem.id, overItem.id)) {
      console.log('Cannot move to a descendant!');
      toast.error('Nie można przesunąć do potomka');
      return;
    }

    const updatedItems = menuItems.map((item) => {
      if (item.id === activeItem.id) {
        return {
          ...item,
          parentId: overItem.parentId,
          level: overItem.level,
        };
      }

      if (item.id === overItem.id) {
        return {
          ...item,
          parentId: activeItem.id,
          level: activeItem.level + 1,
        };
      }

      return item;
    });

    setMenuItems(updatedItems);
    saveDataToLocalStorage(updatedItems);
    toast.info('Pozycja przesunięta');
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="m-3 
      rounded-md 
      border-[1px]
    "
        onPointerDown={(e) => isItemForm && e.stopPropagation()}
      >
        <SortableContext
          items={menuItems}
          strategy={verticalListSortingStrategy}
        >
          {renderItems(topLevelItems)}
        </SortableContext>
      </div>
      {isItemForm ? (
        itemForm()
      ) : (
        <div className="px-6 py-5 rounded-b-md border-[1px] border-t-0">
          <Button onClick={addItem}>Dodaj pozycję menu</Button>
        </div>
      )}
    </DndContext>
  );
};

export default ItemList;
