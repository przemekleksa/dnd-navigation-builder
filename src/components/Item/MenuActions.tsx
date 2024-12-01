import { toast } from 'react-toastify';

type Props = {
  id: string;
  removeItem: (id: string) => void;
  addSubItem: () => void;
  editItemId: (id: string) => void;
};

export const MenuActions = ({
  id,
  removeItem,
  addSubItem,
  editItemId,
}: Props) => {
  const handleRemove = () => {
    removeItem(id);
    toast.info('Pozycja usunięta');
  };

  const handleEdit = () => {
    editItemId(id);
  };

  return (
    <div className="rounded-md border-[1px]" data-no-drag>
      <button
        className="px-4 py-2.5 text-sm font-medium text-center border-r-[1px] font-semibold hover:bg-gray-200"
        onClick={handleRemove}
        data-testid="remove-item"
      >
        Usuń
      </button>
      <button
        className="px-4 py-2.5 text-sm font-medium text-center border-r-[1px] font-semibold hover:bg-gray-200"
        onClick={handleEdit}
        data-testid="edit-item"
      >
        Edytuj
      </button>
      <button
        className="px-4 py-2.5 text-sm font-medium text-center font-semibold hover:bg-gray-200"
        onClick={addSubItem}
        data-testid="add-sub-child"
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};
