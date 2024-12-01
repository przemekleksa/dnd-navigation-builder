'use client';

import { useMenu } from '@/context/MenuContext';
import { MenuItem } from '@/types/MenuItem';
import { TrashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import Button from '../Button/Button';
import SearchInput from './SearchInput';

const schema = z.object({
  name: z
    .string()
    .min(1, 'Nazwa jest wymagana')
    .max(50, 'Maksymalnie 50 znaków'),
  link: z.string().url('Podaj prawidłowy URL'),
});

type FormData = z.infer<typeof schema>;

const AddItem = ({
  hideForm,
  parentId,
  editItemId: editMode,
}: {
  hideForm?: () => void;
  parentId?: string;
  editItemId?: string;
}) => {
  const { addMenuItem, updateMenuItem, menuItems } = useMenu();
  const notify = () => toast('Wow so easy!');

  const editedItem = menuItems.find((item) => item.id === editMode);

  const defaultValues = editedItem
    ? {
        name: editedItem.name,
        link: editedItem.link,
      }
    : {
        name: '',
        link: '',
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleReset = () => {
    hideForm?.();
    reset(defaultValues);
  };

  const clearForm = () => {
    reset(defaultValues);
    toast.success('Forma została zresetowana');
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (editMode && editedItem) {
      const updatedItem: MenuItem = {
        ...editedItem,
        ...data,
      };

      updateMenuItem(updatedItem);
      toast.success('Pozycja została zaktualizowana');
    } else {
      const parentItem = parentId
        ? menuItems.find((item) => item.id === parentId)
        : undefined;

      const parentColumn = parentItem ? parentItem.column : undefined;
      const parentLevel = parentItem ? parentItem.level : 0;

      const maxColumn = Math.max(
        0,
        ...menuItems.filter((item) => !item.parentId).map((item) => item.column)
      );

      const newItem: MenuItem = {
        ...data,
        id: uuidv4(),
        parentId: parentId || '',
        level: parentLevel + 1,
        column: parentId ? (parentColumn ?? 0) : maxColumn + 1,
      };

      addMenuItem(newItem);
      toast.success('Pozycja dodana');
    }

    hideForm?.();
    reset(defaultValues);
  };

  return (
    <div className="rounded-md text-center border border-gray-200 m-3 px-6 py-4 bg-components-bg-primary">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="flex-1">
          <div className="flex flex-col space-y-1.5 items-start">
            <label
              htmlFor="name"
              className="font-semibold text-secondary-700 text-sm"
            >
              Nazwa
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              placeholder="np. Promocje"
              className="rounded-md p-2 border border-gray-300 w-full px-3 py-2"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-1.5 items-start mt-2">
            <label
              htmlFor="link"
              className="font-semibold text-secondary-700 text-sm"
            >
              Link
            </label>
            <SearchInput register={register('link')} />
            {errors.link && (
              <span className="text-red-500 text-sm">
                {errors.link.message}
              </span>
            )}
          </div>
          <div className="flex my-5 gap-2">
            <Button onClick={handleReset}>Anuluj</Button>
            <Button variant="cta" type="submit">
              {editMode ? 'Zapisz' : 'Dodaj'}
            </Button>
          </div>
        </div>

        <div className="ml-[26px] mr-[10px]">
          <button
            type="button"
            className="text-gray-500 hover:text-button-cta-color"
            onClick={clearForm}
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
