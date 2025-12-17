import {
  FaLocationDot,
  FaBed,
  FaBath,
  FaXmark,
  FaRulerCombined,
  FaCheck,
} from 'react-icons/fa6';
import PropertyMap from './PropertyMap';

const PropertyDetailsInfo = ({ property }) => {

  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaLocationDot className="text-lg text-orange-700 mr-2" />
          <p className="text-orange-700">
            {property.location.street}, {property.location.state}{' '}
            {property.location.city} {property.location.zipcode}
          </p>
        </div>
        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-start gap-0 md:gap-12">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold">
              {!property.rates.nightly ? (
                <FaXmark className="text-red-700" />
              ) : (
                <div className="text-2xl font-bold text-blue-500">
                  ${property.rates.nightly}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Weekly</div>
            {!property.rates.weekly ? (
              <FaXmark className="text-red-700" />
            ) : (
              <div className="text-2xl font-bold text-blue-500">
                ${property.rates.weekly}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Monthly</div>
            {!property.rates.monthly ? (
              <FaXmark className="text-red-700" />
            ) : (
              <div className="text-2xl font-bold text-blue-500">
                ${property.rates.monthly}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-start gap-0 md:gap-12 flex-wrap text-blue-500 mb-4 text-xl space-x-9">
          <div className="flex items-center justify-center">
            <FaBed className="mr-2" /> {property.beds}
            <span className="hidden sm:inline">Beds</span>
          </div>
          <div className="flex items-center justify-center">
            <FaBath className="mr-2" /> {property.baths}
            <span className="hidden sm:inline">Baths</span>
          </div>
          <div className="flex items-center justify-center">
            <FaRulerCombined className="mr-2" /> {property.square_feet}
            <span className="hidden sm:inline">sqft</span>
          </div>
        </div>
        <p className="text-gray-500 mb-4">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none gap-2">
          {!property.amenities ? (
            <p>No ammenities found</p>
          ) : (
            property.amenities.map((ammenity, index) => (
              <li key={`${ammenity}-${index}`} className='flex items-center justify-start'>
                <FaCheck className="fas fa-check text-green-600 mr-2" />
                {ammenity}
              </li>
            ))
          )}
        </ul>
      </div>
      {/* <!-- Map --> */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailsInfo;
