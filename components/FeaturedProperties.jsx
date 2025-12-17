import connectDB from '@/config/database';
import Property from '@/models/Property';
import FeaturedPropertyCard from './FeaturedPropertyCard';

const FeaturedProperties = async () => {
  await connectDB();
  const properties = await Property.find({ is_featured: true }).limit(3).lean();

  return properties.length === 0 ? null : (
    <section className="bg-blue-50 px-4 py-18">
      <div className="container-xl lg:container m-auto ">
        <h2 className="text-3xl text-center font-bold text-blue-600 mb-12">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
