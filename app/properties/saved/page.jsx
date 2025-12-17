import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/database';
import User from '@/models/User';
import getSessionUser from '@/utils/getSessionUser';

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.user?.id;

  if (!userId) {
    return <div>You must be logged in to view saved properties</div>;
  }

  try {
    await connectDB();
    const { id } = await getSessionUser();
    const { bookmarks } = await User.findById(id).populate('bookmarks');
    return (
      <section>
        <div className="container lg:container m-auto py-12 px-4">
          <h1 className="text-2xl font-bold mb-4">Saved Properties</h1>
          {bookmarks.length === 0 ? (
            <p>No saved properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bookmarks.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    return <div>Error fetching saved properties</div>;
  }
};
export default SavedPropertiesPage;
