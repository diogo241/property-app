'use client';

import { useFormStatus } from 'react-dom';

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending
          ? 'bg-red-500 text-white px-3 py-2 rounded-md'
          : 'bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
      } text-white font-bold py-2 px-4 rounded-full`}
    >
      {pending ? 'Deleting Property...' : 'Delete'}
    </button>
  );
}
