type Props = {
  id: string;
  removeItem: (id: string) => void;
};

export const MenuActions = ({ id, removeItem }: Props) => {
  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <div className="rounded-md border-[1px]">
      <button
        className="px-4 py-2.5 text-sm font-medium text-center border-r-[1px] font-semibold hover:bg-gray-200"
        onClick={handleRemove}
      >
        Usuń
      </button>
      <button className="px-4 py-2.5 text-sm font-medium text-center border-r-[1px] font-semibold hover:bg-gray-200 ">
        Edytuj
      </button>
      <button className="px-4 py-2.5 text-sm font-medium text-center  font-semibold hover:bg-gray-200 ">
        Dodaj pozycję menu
      </button>
    </div>
  );
};
