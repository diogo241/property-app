const PageHeader = ({ title }) => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8 flex flex-col items-center">
      <h1 className="text-4xl text-center font-bold text-blue-500">{title}</h1>
    </div>
  );
};

export default PageHeader;
