import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaLocationDot,
} from 'react-icons/fa6';

const PropertyCard = ({ property }) => {
  const getRateDisplay = () => {
    const rate = property.rates.monthly
      ? { value: property.rates.monthly, type: 'mo' }
      : { value: property.rates.weekly, type: 'we' };

    return rate;
  };
  const rate = getRateDisplay();

  return (
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${property._id}`}>
        <Image
          src={`${property.images[0]}`}
          alt=""
          width={500}
          height={500}
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${rate.value}/{rate.type}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4 flex-wrap">
          <p className="flex justify-center items-center gap-2">
            <FaBed /> {property.beds}{' '}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p className="flex justify-center items-center gap-2">
            <FaBath /> {property.baths}{' '}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p className="flex justify-center items-center gap-2">
            <FaRulerCombined />
            {property.square_feet}{' '}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p className="flex justify-center items-center gap-2">
            <FaMoneyBill /> Weekly
          </p>
          <p className="flex justify-center items-center gap-2">
            <FaMoneyBill /> Monthly
          </p>
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row gap-2 justify-between mb-4">
          <div className="flex justify-center items-top gap-2 mb-4 lg:mb-0">
            <FaLocationDot className="text-orange-700 mt-1 text-sm" />
            <span className="text-orange-700">
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500
            hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center
            text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
