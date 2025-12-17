'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa6';
import toggleBookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { useSession } from 'next-auth/react';

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    const fetchBookmarkStatus = async () => {
      try {
        const { isBookmarked } = await checkBookmarkStatus(property._id);
        setIsBookmarked(isBookmarked);
        setLoading(false);
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };

    fetchBookmarkStatus();
  }, [property._id, userId, checkBookmarkStatus]);

  const handleBookmark = async () => {
    if (!userId) {
      toast.error('You must be logged in to bookmark a property');
      return;
    }

    try {
      const { message } = await toggleBookmarkProperty(property._id);
      setIsBookmarked(!isBookmarked);
      toast.success(message);
    } catch (error) {
      toast.error('Error bookmarking property');
    }
  };

  if (loading) return <div>Loading...</div>;

  return isBookmarked ? (
    <button
      onClick={() => handleBookmark()}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark Property
    </button>
  ) : (
    <button
      onClick={() => handleBookmark()}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
