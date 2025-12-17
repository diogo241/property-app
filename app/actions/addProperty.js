'use server';

import connectDB from '@/config/database';
import getSessionUser from '@/utils/getSessionUser';
import Property from '@/models/Property';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/config/cloudinary';

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.id) {
    throw new Error('User id is required');
  }
  const { id } = sessionUser;

  const amenities = formData.getAll('amenities');
  const images = formData.getAll('images').filter((image) => image.name !== '');

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

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //Convert to base64
    const base64Image = imageData.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${base64Image}`,
      {
        folder: 'PropertyApp',
      }
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', '/layout');

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
