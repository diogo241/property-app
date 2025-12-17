'use client';
import { PuffLoader } from 'react-spinners';

const override = {
  margin: '0 auto',
  paddingTop: '4rem',
};

const Spinner = () => {
  return (
    <div className='bg-white h-full w-full absolute top-0 flex justify-center items-center z-1000'>
      <PuffLoader
        color="oklch(62.3% 0.214 259.815)"
        cssOverride={override}
        size={100}
      />
    </div>
  );
};

export default Spinner;
