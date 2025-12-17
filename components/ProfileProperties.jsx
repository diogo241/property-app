'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import deleteProperty from '@/app/actions/deleteProperty';
import DeleteButton from './shared/DeleteButton';
import { toast } from 'react-toastify';

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      'Are you sure that you whant delete the property?'
    );

    if (!confirmed) return;
    await deleteProperty(propertyId);

    const updatedProperties = properties.filter(
      (porperty) => porperty._id !== propertyId
    );

    setProperties(updatedProperties);

    toast.success('Property deleted successfully');
  };

  return properties.map((property) => (
    <div key={property._id} className="mb-10">
      <Link href={`/properties/${property._id}`}>
        <Image
          alt={property.title || 'default'}
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0] || property.images}
          width={200}
          height={500}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.title}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city}{' '}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2 flex">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <form action={() => handleDeleteProperty(property._id)}>
          <DeleteButton />
        </form>
      </div>
    </div>
  ));
};

export default ProfileProperties;
