
const CommonHeader = ({title}: {title: string}) => {
  return (
    <div className='text-2xl md:text-4xl text-title-color  font-medium  pb-2'>
      {title}
    </div>
  );
};

export default CommonHeader;