import React from 'react';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
} from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';

function FeaturedPropertyCard({ property }) {
  const getRateDisplay = () => {
    const rateMonthly = property.rates.monthly && {
      value: property.rates.monthly,
      type: 'mo',
    };

    const rateWeekly = property.rates.weekly && {
      value: property.rates.weekly,
      type: 'we',
    };

    const rateNightly = property.rates.nightly && {
      value: property.rates.nightly,
      type: 'ni',
    };

    const mainRate = property.rates.monthly
      ? { value: property.rates.monthly, type: 'mo' }
      : property.rates.weekly
      ? { value: property.rates.weekly, type: 'we' }
      : { value: property.rates.nightly, type: 'ni' };

    return { mainRate, rateMonthly, rateWeekly, rateNightly };
  };
  const { mainRate, rateMonthly, rateWeekly, rateNightly } = getRateDisplay();

  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={property.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vh"
        className="h-auto object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          ${mainRate.value}/{mainRate.type}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed /> {property.beds}
            <span className="md:hidden lg:inline"> Beds</span>
          </p>
          <p>
            <FaBath /> {property.baths}
            <span className="md:hidden lg:inline"> Baths</span>
          </p>
          <p>
            <FaRulerCombined />
            {property.square_feet}
            <span className="md:hidden lg:inline"> sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          <p>
            <FaMoneyBill /> Weekly
          </p>
          <p>
            <FaMoneyBill /> Monthly
          </p>
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
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
}

export default FeaturedPropertyCard;
