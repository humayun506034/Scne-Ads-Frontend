import fb from "@/assets/footer/fb.svg";
import mail from "@/assets/footer/mail.svg";
import twitter from "@/assets/footer/twitter.svg";
import yahoo from "@/assets/footer/yahoo.svg";
import logo from "@/assets/logo.png";
import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribe with email:", email);
    // Handle newsletter subscription
    setEmail("");
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Billboards", href: "/billboards" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Career", href: "/career" },
  ];
  const date = new Date();
  const socialLinks = [
    { icon: fb, href: "#" },
    { icon: twitter, href: "#" },
    { icon: mail, href: "#" },
    { icon: yahoo, href: "#" },
  ];

  return (
    <footer className="bg-[#0A4589] text-[#F0F0F0]">
      <CommonWrapper>
        <div className="flex flex-col md:flex-row items-center justify-start lg:justify-between  gap-12 lg:gap-24 pt-12 md:flex-wrap">
          <div className="w-full  lg:w-1/4 flex flex-col  lg:items-start">
            <Link to={"/"}>
              <div className="w-[200px] h-[90px]">
                <img src={logo} alt="SCNE Ads Logo" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed my-5  lg:text-left">
              SCNE Ads is a digital billboard advertising platform that allows
              businesses to display their ads on high-traffic digital billboards
              across the Bahamas.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Link
                    to={social.href}
                    className="hover:bg-[#38B6FF] duration-200 hover:border-[#38B6FF] rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={social.icon}
                      className="w-8 h-8 object-cover"
                      alt="SOCIAL MEDIA LINKS"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex md:gap-24 w-full text-nowrap  justify-between  lg:w-1/4 md:flex-1">
            {" "}
            <div className="w-full    flex flex-col  lg:items-start">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Link
                        to={link.href}
                        className="text-blue-100 transition-colors hover:text-[#38B6FF] duration-200 text-sm md:text-base "
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full   flex flex-col  lg:items-start items-end">
              <h3 className="text-lg text-start font-semibold mb-4 mr-2 md:mr-6">
                Company
              </h3>
              <ul className="space-y-3 text-start">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Link
                        to={link.href}
                        className="text-blue-100 transition-colors hover:text-[#38B6FF] duration-200 text-sm md:text-base"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full  lg:w-1/4 flex flex-col  items-start">
            <h3 className="text-xl font-semibold md:mb-4 mb-2">Newsletter</h3>
            <p className="text-sm leading-relaxed lg:text-left">
              Get the latest news and updates <br className="hidden md:block" />{" "}
              with our newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  text-white border-white  focus:ring-1 focus:ring-[#F0F0F0] bg-transparent rounded-md placeholder:text-white "
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.8 }}
              >
                <Button
                  onClick={handleSubscribe}
                  className="bg-white hover:bg-[#38B6FF] hover:text-white ease-in-out duration-200 rounded-md text-[#161616] text-sm font-medium px-2 py-3 border-none cursor-pointer w-full sm:w-auto"
                >
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-6 lg:mt-16">
          <p className="text-center text-blue-100 pt-6 pb-12 text-sm">
            © {date.getFullYear()} SCNE Ads Website. All Rights Reserved
          </p>
        </div>
      </CommonWrapper>
    </footer>
  );
}
