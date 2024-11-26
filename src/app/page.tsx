'use client';

import AddItem from '@/components/AddItem/AddItem';
import EmptyList from '@/components/EmptyList/EmptyList';

export default function Home() {
  return (
    <div>
      <EmptyList />
      <AddItem />
    </div>
  );
}
