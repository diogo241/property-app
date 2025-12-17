'use server';

import User from '@/models/User';
import Property from '@/models/Property';
import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

export async function toggleBookmarkProperty(propertyId) {
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
  
  let message;
  
  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = 'Property removed from bookmarks';
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = 'Property added to bookmarks';
    isBookmarked = true;
  }
  
  await user.save();
  
  revalidatePath('/properties/saved', 'page');
  
  return { message, isBookmarked };
}

export default toggleBookmarkProperty;
