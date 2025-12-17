import Property from '@/models/Property';
import connectDB from '@/config/database';
import PropertyCard from './PropertyCard';
import Link from 'next/link';

const HomeProperties = async ({ numberProperties }) => {
  await connectDB();
  const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(numberProperties)
    .lean();

  return (
    <section className="px-4 py-6 my-14">
      <div className="container-xl m-auto lg:container flex flex-col justify-center items-center gap-12">
        <h2 className="text-3xl font-bold text-blue-500 text-center">
          Recent Properties
        </h2>

        {recentProperties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="container-xl lg:container m-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {recentProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Link
          href="/properties"
          className="text-white bg-blue-500 hover:bg-blue-600 transition rounded-lg cursor-pointer px-6 py-4 box-border"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
};

export default HomeProperties;
