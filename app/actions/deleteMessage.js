'use server';

import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import Message from '@/models/Message';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.id) {
    throw new Error('User id is required');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found');
  }

  // Check if the user is the recipient of the message
  if (message.recipient.toString() !== sessionUser.id) {
    throw new Error(
      'Unauthorized: You can only delete your own messages'
    );
  }

  await message.deleteOne();

  revalidatePath('/messages', 'page');

  return { success: true };
}

export default deleteMessage;
