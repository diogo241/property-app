'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  defaultText = 'Add Property',
  pendingText = 'Adding Property...',
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending
          ? 'bg-blue-300 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white font-bold py-2 px-4 rounded-full w-full`}
    >
      {pending ? pendingText : defaultText}
    </button>
  );
}
