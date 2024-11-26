import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { UseFormRegisterReturn } from 'react-hook-form';

type SearchInputProps = {
  register: UseFormRegisterReturn;
};

const SearchInput = ({ register }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </span>
      <input
        {...register}
        type="link"
        placeholder="Wklej lub wyszukaj"
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      />
    </div>
  );
};

export default SearchInput;
