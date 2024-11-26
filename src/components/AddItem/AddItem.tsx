'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

type MenuItem = FormData & { id: string };

const AddItem = () => {
  const [searchValue, setSearchValue] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleRemove = () => {
    console.log('remove');
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Form Data:', data);
    const newItem: MenuItem = {
      ...data,
      id: uuidv4(),
    };
    setMenuItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="rounded-md text-center border border-gray-200 m-3 px-6 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
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
            <SearchInput
              value={searchValue}
              onChange={setSearchValue}
              register={register('link')}
            />
            {errors.link && (
              <span className="text-red-500 text-sm">
                {errors.link.message}
              </span>
            )}
          </div>
          <div className="flex my-5 gap-2">
            <Button onClick={() => console.log('Form Canceled')}>Anuluj</Button>
            <Button variant="cta" type="submit">
              Dodaj
            </Button>
          </div>
        </div>
        <div className="ml-[26px] mr-[10px]">
          <button
            type="button"
            className=" text-gray-500 hover:text-button-cta-color"
            onClick={handleRemove}
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
