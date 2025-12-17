'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import { useGlobalContext } from '@/context/GlobalContext';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { unreadCount, setUnreadCount } = useGlobalContext();
  const router = useRouter();

  const handleMarkAsRead = async () => {
    setIsLoading(true);
    try {
      await markMessageAsRead(message._id);
      setIsRead(true);
      setUnreadCount(unreadCount === 1 ? 0 : unreadCount - 1);
      toast.success('Message readed successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to read message');
      console.error('Error marking message as read:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }
    console.log('handle delete',  message, message.read);

    if (message.read === false) {
      setUnreadCount(unreadCount === 1 ? 0 : unreadCount - 1);
    }

    setIsDeleting(true);
    try {
      await deleteMessage(message._id);
      toast.success('Message deleted successfully');
      router.refresh();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
      setIsDeleting(false);
    }
  };

  console.log(message.email);

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      <h2 className="text-xl mb-4">
        <span className="font-bold">
          Property Inquiry: {message.property.name}
        </span>
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleMarkAsRead}
        disabled={isRead || isLoading}
        className={`mt-4 mr-3 py-1 px-3 rounded-md text-white ${
          isRead
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Marking...' : isRead ? 'Read' : 'Mark as Read'}
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`mt-4 mr-3 py-1 px-3 rounded-md text-white ${
          isDeleting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default MessageCard;
