import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { convertToSerializableObject } from '@/utils/convertToObject';
import PropertyDetailsInfo from '@/components/PropertyDetailsInfo';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/shared/BookmarkButton';
import ShareButtons from '@/components/shared/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';

const PropertyPage = async ({ params }) => {
  await connectDB();
  const urlParams = await params;
  const property = await Property.findById(urlParams.id).lean();
  const serializableProperty = convertToSerializableObject(property);
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="text-sm mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-24 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full gap-6">
            {/* Property Info */}
            <PropertyDetailsInfo property={serializableProperty} />
            <aside className="space-y-4">
              <BookmarkButton property={serializableProperty} />
              <ShareButtons property={serializableProperty} />
              <PropertyContactForm property={serializableProperty} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={serializableProperty.images} />
    </>
  );
};

export default PropertyPage;
