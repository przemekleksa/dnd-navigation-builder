import { MenuItem } from '@/types/MenuItem';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { MenuActions } from './MenuActions';

type Props = {
  item: MenuItem;
  removeItem: (id: string) => void;
};

const Titlebar = ({ item, removeItem }: Props) => {
  const { name, link, id } = item;

  return (
    <div className="justify-between rounded-t-md border border-gray-200 px-6 py-4 flex items-center bg-components-bg-primary">
      <div className="flex items-center">
        <ArrowsPointingOutIcon className="h-6 w-6 mr-3 rotate-45" />
        <div className="flex gap-1.5 flex-col">
          <h3 className="font-semibold font-sm">{name ? name : 'Promocje'}</h3>
          <p className="font-sm font-normal text-tertiary-600">
            {link ? link : `https://www.google.com`}
          </p>
        </div>
      </div>

      <MenuActions id={id} removeItem={removeItem} />
    </div>
  );
};

export default Titlebar;
