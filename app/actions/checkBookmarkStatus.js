'use server';

import User from '@/models/User';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const session = await getSessionUser();
  if (!session) {
    throw new Error('User not authenticated');
  }

  const userId = session.user.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }

  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;
