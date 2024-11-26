import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  type?: 'withIcon' | 'regular' | 'cta';
  children: ReactNode;
};

const Button = ({ type, children }: Props) => {
  if (type === 'withIcon') {
    return (
      <button
        type="button"
        className="px-[14px] py-[10px] text-sm font-medium text-center inline-flex items-center text-white bg-button-withIcon-base rounded-lg hover:bg-button-withIcon-hover focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-button-withIcon-base dark:hover:bg-button-withIcon-hover dark:focus:ring-blue-800"
      >
        <div className="mr-2">
          <Image
            src="/assets/icons/add.svg"
            alt={'Add menu item'}
            width={18}
            height={18}
          />
        </div>
        {children}
      </button>
    );
  }

  return <div>{children}</div>;
};

export default Button;
