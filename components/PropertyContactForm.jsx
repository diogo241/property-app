'use client';
import { useActionState, useEffect } from 'react';
import SubmitButton from './shared/SubmitButton';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addMessage from '@/app/actions/addMessage';

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [state, formAction] = useActionState(addMessage, {});

  useEffect(() => {
    if (state && state.error) {
      toast.error(`Error: ${state.error}`);
    }
    if (state && state.submitted) {
      toast.success('Message sent successfully!');
    }
  }, [state]);

  if (!session) {
    return <p>Please log in to contact the property manager.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={formAction}>
        <input type="hidden" name="recipient" value={property.owner} />
        <input type="hidden" name="property" value={property._id} />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <SubmitButton defaultText="Send Message" pendingText="Sending..." />
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
