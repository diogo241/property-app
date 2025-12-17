'use server';

import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import Message from '@/models/Message';

async function getUnreadMessageCount() {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.id) {
    throw new Error('User id is required');
  }
  const { id } = sessionUser;

  const countUnreadMessages = await Message.countDocuments({
    recipient: id,
    read: false,
  });

  return { countUnreadMessages };
}

export default getUnreadMessageCount;
