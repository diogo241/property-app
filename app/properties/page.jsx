import PageHeader from '@/components/PageHeader';
import PorpertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PorpertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

  return (
    <section className="px-4 py-6">
      <PageHeader title={'Properties'} />
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
            {properties.map((property) => (
              <PorpertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PorpertiesPage;
