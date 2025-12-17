import FeaturedProperties from '@/components/FeaturedProperties';
import Hero from '@/components/Hero';
import HomeProperties from '@/components/HomeProperties';
import InfoBoxes from '@/components/InfoBoxes';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties numberProperties={4} />
      <FeaturedProperties />
    </>
  );
};

export default HomePage;
