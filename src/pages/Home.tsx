import Banner from "@/components/Modules/Home/Banner";

import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import AnalyticsSection from "@/components/Modules/Home/Analytics";
import DynamicPricing from "@/components/Modules/Home/DynamicPricing/DynamicPricing";
import { FeaturedLocationsCarousel } from "@/components/Modules/Home/FeaturedLocation";

import ContactSection from "@/components/Modules/Home/Contact/Contact";
import FaqSection from "@/components/Modules/Home/FAQ/FAQ";
import HowItWorksSection from "@/components/Modules/Home/HowItWorks/HowItWorks";
import Testimonial from "@/components/Modules/Home/Testimonial/Testimonial";
import CommonWrapper from "../common/CommonWrapper";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <CommonWrapper>
        <Banner />
      </CommonWrapper>
      <div className=" ">
        <h1 className="text-white text-center text-2xl md:text-5xl leading-[60px]  md:mb-10">
          Featured
          <CommonGlowingHeader glowingTitle="Locations " />
        </h1>
        <FeaturedLocationsCarousel />
      </div>
      <CommonWrapper>
        <AnalyticsSection />
        <HowItWorksSection />
        <DynamicPricing />
        <Testimonial />
        <FaqSection />
        <ContactSection />
      </CommonWrapper>
    </div>
  );
};

export default Home;
