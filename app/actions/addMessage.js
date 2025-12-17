'use server';

import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import Message from '@/models/Message';
import { useGlobalContext } from '@/context/GlobalContext';

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.id) {
    throw new Error('User id is required');
  }
  const { id } = sessionUser;
  const recipient = formData.get('recipient');

  // if (id === recipient) {
  //   throw new Error('Cannot send message to yourself');
  // }

  const newMessage = new Message({
    sender: id,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
  });

  await newMessage.save();

  return {submitted: true}
}

export default addMessage;
