import connectDB from '@/config/database';
import Property from '@/models/Property';
import getSessionUser from '@/utils/getSessionUser';
import { convertToSerializableObject } from '@/utils/convertToObject';
import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '@/components/ProfileProperties.jsx';

const ProfilePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { id } = sessionUser;

  if (!sessionUser || !sessionUser.id) {
    throw new Error('User id is required');
  }

  const userProperties = await Property.find({ owner: id }).lean();
  const serializableProperties = userProperties.map(convertToSerializableObject);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 px-8">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-24 w-24 md:h-24 md:w-24 rounded-full mx-auto md:mx-0"
                  src={sessionUser?.user.image || profileDefault}
                  width={96}
                  height={96}
                  alt={sessionUser?.user.name || 'Profile Image'}
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{' '}
                {sessionUser?.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{' '}
                {sessionUser?.user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties properties={serializableProperties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
