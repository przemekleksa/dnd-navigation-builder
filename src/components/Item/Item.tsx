import { MenuItem } from '@/types/MenuItem';
import Button from '../Button/Button';
import Titlebar from './Titlebar';

type Props = {
  item: MenuItem;
  removeItem: (id: string) => void;
};

const Item = ({ item, removeItem }: Props) => {
  return (
    <div className="m-3">
      <Titlebar item={item} removeItem={removeItem} />
      <div className="px-6 py-5 rounded-b-md border-[1px] border-t-0">
        <Button>Dodaj pozycję menu</Button>
      </div>
    </div>
  );
};

export default Item;
