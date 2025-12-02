import Link from 'next/link';


const UnauthorizedPage = () => {
  return (
    <section className="bg-blue-50 min-h-screen flex-grow mb-[-8rem]">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-12">No Access</h1>
            <Link
              href="/"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default UnauthorizedPage;
