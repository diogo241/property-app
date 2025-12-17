import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import { convertToSerializableObject } from '@/utils/convertToObject';

const SearchResultsPage = async ({ searchParams }) => {
  const { location, type } = await searchParams;

  await connectDB();
  const locationPattern = new RegExp(location, 'i');

  const query = {
    $or: [
      { name: locationPattern },
      { address: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipCode': locationPattern },
    ],
  };

  if (type !== 'All') {
    const typePattern = new RegExp(type, 'i');
    query.type = typePattern;
  }

  const properties = await Property.find(query);

  const serializedProperties = properties.map((property) =>
    convertToSerializableObject(property)
  );


  return (
    <section>
      <div className="container lg:container m-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {serializedProperties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serializedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
