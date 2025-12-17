import PageHeader from '@/components/PageHeader';
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/shared/Pagination';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PorpertiesPage = async ({ searchParams }) => {
  const { page = 1, pageSize = 4 } = await searchParams;
  console.log('Search Params:', page, pageSize);

  await connectDB();

  const skip = (page - 1) * pageSize;
  const totalCount = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);
  const showPagination = totalCount > pageSize;

  return (
    <section className="px-4 py-6">
      <PageHeader title={'Properties'} />
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      {showPagination && (
        <Pagination
          page={parseInt(page)}
          pageSize={parseInt(pageSize)}
          totalItems={parseInt(totalCount)}
        />
      )}
    </section>
  );
};

export default PorpertiesPage;
