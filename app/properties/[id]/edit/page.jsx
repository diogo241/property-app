import PropertyEditForm from '@/components/PropertyEditForm';
import connectDB from '@/config/database';

import Property from '@/models/Property';
import { convertToSerializableObject } from '@/utils/convertToObject';

const PropertyEditPage = async ({params}) => {
  await connectDB();
  const urlParams = await params;

  const propertyDoc = await Property.findById(urlParams.id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <section className="bg-blue-500">
      <div className="container mx-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 rounded-md shadow-md border mb-4 md:0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
