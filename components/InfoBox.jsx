import Link from 'next/link';

const InfoBox = ({ isDark, title, subtitle, linkTo, btnText }) => {
  const classes = {
    background: isDark ? 'bg-blue-100' : 'bg-gray-100',
    btn: isDark ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-black text-white hover:bg-gray-700',
  };

  return (
    <div className={`${classes.background} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{subtitle}</p>
      <Link
        href={linkTo}
        className={`inline-block ${classes.btn} rounded-lg px-4 py-2`}
      >
        {btnText}
        text
      </Link>
    </div>
  );
};

export default InfoBox;
