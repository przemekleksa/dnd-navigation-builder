'use client';

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type Props = {
  variant?: 'withIcon' | 'regular' | 'cta';
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const Button = ({ variant, children, onClick, type = 'button' }: Props) => {
  if (variant === 'withIcon') {
    return (
      <button
        type={type}
        className="px-3.5 py-2.5 text-sm font-medium text-center inline-flex items-center text-white bg-button-withIcon-base rounded-lg hover:bg-button-withIcon-hover focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-button-withIcon-base dark:hover:bg-button-withIcon-hover dark:focus:ring-blue-800"
        onClick={onClick}
      >
        <div className="mr-2">
          <PlusCircleIcon className="w-6 h-6" />
        </div>
        {children}
      </button>
    );
  }

  if (variant === 'cta') {
    return (
      <button
        type={type}
        className="px-3.5 py-2.5  rounded-md text-sm font-medium text-center border-[1px] font-semibold border-button-cta-border text-button-cta-color hover:bg-button-cta-color hover:text-stone-50 hover:border-slate-900 bg-components-bg-primary"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      className="px-3.5 py-2.5 rounded-md text-sm font-medium text-center border-[1px] font-semibold hover:bg-gray-200 bg-components-bg-primary"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
