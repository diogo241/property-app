import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto my-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            isDark={false}
            title={'For Renters'}
            subtitle={`Find your dream rental property. Bookmark properties and contact owners.`}
            btnText={'Browse Properties'}
            linkTo={'/properties'}
          />
          <InfoBox
            isDark={true}
            title={'For Property Owners'}
            subtitle={`List your properties and reach potential tenants. Rent as an
              airbnb or long term`}
            btnText={'Add Property'}
            linkTo={'/add-property'}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
