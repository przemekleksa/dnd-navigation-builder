import { MenuItem } from '@/types/MenuItem';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { MenuActions } from './MenuActions';

type Props = {
  item: MenuItem;
  removeItem: (id: string) => void;
  addSubItem: () => void;
  itemIndex?: number;
  editItemId: (id: string) => void;
};

const Titlebar = ({
  item,
  removeItem,
  addSubItem,
  itemIndex,
  editItemId,
}: Props) => {
  const { name, link, id, parentId } = item;

  const mainItemClass = `rounded-t-md !border-t-0 border-l-0 border-r-0`;

  const borderClass = parentId
    ? 'border-l-[1px] rounded-bl-md border-b-[1px] border-r-[1px] '
    : `border-t-[1px] border-b-[1px] border-gray-200 ${itemIndex === 0 && mainItemClass}`;

  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({
  //     id: item.id,
  //   });

  // const style = {
  //   transform: CSS.Translate.toString(transform),
  //   transition,
  // };

  return (
    <div
      className={`justify-between px-6 py-4 flex items-center bg-components-bg-primary ${borderClass}`}
    >
      <div
        className="flex items-center"
        // ref={setNodeRef}
        // style={style}
        // {...attributes}
        // {...listeners}
      >
        <ArrowsPointingOutIcon className="h-6 w-6 mr-3 rotate-45" />
        <div className="flex gap-1.5 flex-col">
          <h3 className="font-semibold font-sm">{name}</h3>
          <p className="font-sm font-normal text-tertiary-600">{link}</p>
        </div>
      </div>

      <MenuActions
        id={id}
        removeItem={removeItem}
        addSubItem={addSubItem}
        editItemId={editItemId}
        // data-no-drag
      />
    </div>
  );
};

export default Titlebar;
