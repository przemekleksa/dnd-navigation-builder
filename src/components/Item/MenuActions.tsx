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
  };

  const handleEdit = () => {
    editItemId(id);
  };

  // const stopDragPropagation = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  // };

  return (
    <div className="rounded-md border-[1px]" data-no-drag>
      <button
        className="px-4 py-2.5 text-sm font-medium text-center border-r-[1px] font-semibold hover:bg-gray-200"
        // onMouseDown={stopDragPropagation}
        onClick={handleRemove}
        // data-no-drag
      >
        Usuń
      </button>
      <button
        className="px-4 py-2.5 text-sm font-medium text-center border-r-[1px] font-semibold hover:bg-gray-200"
        // onMouseDown={stopDragPropagation}
        onClick={handleEdit}
        // data-no-drag
      >
        Edytuj
      </button>
      <button
        className="px-4 py-2.5 text-sm font-medium text-center font-semibold hover:bg-gray-200"
        // onMouseDown={stopDragPropagation}
        onClick={addSubItem}
        // data-no-drag
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};
