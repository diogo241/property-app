import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import PropertyDetailsInfo from '@/components/PropertyDetailsInfo';

const PropertyPage = async ({ params }) => {
  await connectDB();
  const urlParams = await params;
  const property = await Property.findById(urlParams.id).lean();
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
        <div className="container m-auto py-18 px-6 mb-[-6rem]">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full gap-6">
            {/* Property Info */}
            <PropertyDetailsInfo property={property} />
            <div>asd</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
