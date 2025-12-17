'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import getSessionUser from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const updateProperty = async (propertyId, formData) => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error('User id is required');
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('Property not found');
  }
  if (property.owner.toString() !== sessionUser.id) {
    throw new Error('Unauthorized action');
  }

  const { id } = sessionUser;

  const amenities = formData.getAll('amenities');

  const propertyData = {
    owner: id,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: parseInt(formData.get('beds')),
    baths: parseInt(formData.get('baths')),
    square_feet: formData.get('square_feet'),
    amenities: amenities,
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath('/', 'layout');

  redirect(`/properties/${updatedProperty._id}`);
};

export default updateProperty;
