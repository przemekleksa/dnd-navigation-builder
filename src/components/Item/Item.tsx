import { MenuItem } from '@/types/MenuItem';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
  const [openEditItemForm, setOpenEditItemForm] = useState<string | null>(null);
  const { id: parentId } = item;

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

  const editItemId = (id: string) => {
    setOpenEditItemForm(id);
  };

  const editItemForm = (id: string) => {
    if (openEditItemForm) {
      return (
        <AddItem hideForm={() => setOpenEditItemForm(null)} editItemId={id} />
      );
    }
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const customListeners = {
    ...listeners,
    onPointerDown: (e: React.PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-no-drag]')) {
        e.preventDefault();
        return;
      }
      listeners?.onPointerDown?.(e);
    },
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...customListeners}>
      <Titlebar
        item={item}
        removeItem={removeItem}
        addSubItem={addSubItem}
        itemIndex={itemIndex}
        editItemId={editItemId}
      />
      {subItemForm()}
      {editItemForm(item.id)}
    </div>
  );
};

export default Item;
