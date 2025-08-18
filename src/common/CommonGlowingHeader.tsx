const CommonGlowingHeader = ({ glowingTitle }: { glowingTitle: string }) => {
  return (
    <span
      className="text-[#38B6FF] text-2xl md:text-5xl font-semibold leading-[60px] pl-1 md:pl-3 text-shadow-glow inline-block"
      style={{
        textShadow: "0px 0px 48px #38B6FF",
      }}
    >
      {` ${glowingTitle} `}
    </span>
  );
};

export default CommonGlowingHeader;
