'use client';

import { createContext, useEffect, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (session && session.user) {
        try {
          const result = await getUnreadMessageCount();
          setUnreadCount(result.countUnreadMessages || 0);
        } catch (error) {
          console.error('Error fetching unread message count:', error);
        }
      } else {
        setUnreadCount(0);
      }
    };

    fetchUnreadCount();
  }, [session]);


  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
