// import React from "react";
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import { THEME } from "@constants/colors";

const AppFooter = () => {
  return (
    <Footer
      container
      className="rounded-none border-t-0 transition-all duration-500"
      style={{
        background: `linear-gradient(180deg, #fff5f9 0%, #fde0e7 40%, #f7c4d3 100%)`,
        fontFamily: THEME.fonts.primary,
        boxShadow: "inset 0 8px 25px rgba(184, 59, 125, 0.15)",
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 py-14 relative overflow-hidden">
        {/* Soft glow accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-200/20 to-transparent pointer-events-none" />

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10 mb-10 relative z-10">
          {/* Brand */}
          <div className="space-y-3">
            <FooterBrand
              href="/"
              src="/favicon.png"
              alt="Love Date Crush Logo"
              name=""
            />
            <h2 className="text-2xl font-extrabold tracking-tight text-[#B83B7D]">
              Love Date Crush
            </h2>
            <p className="text-sm text-[#4a2c3a] leading-relaxed">
              Find your perfect match and build real connections 💞
            </p>
          </div>

          {/* About */}
          <div>
            <FooterTitle
              title="About"
              className="text-[#7b2d54] font-bold mb-2"
            />
            <FooterLinkGroup col>
              {["Our Story", "Meet the Team", "Blog"].map((item) => (
                <FooterLink
                  key={item}
                  href="#"
                  className="text-[#5a3a48] hover:text-[#b83b7d] transition font-medium"
                >
                  {item}
                </FooterLink>
              ))}
            </FooterLinkGroup>
          </div>

          {/* Support */}
          <div>
            <FooterTitle
              title="Support"
              className="text-[#7b2d54] font-bold mb-2"
            />
            <FooterLinkGroup col>
              {["Help Center", "FAQs", "Safety Tips"].map((item) => (
                <FooterLink
                  key={item}
                  href="#"
                  className="text-[#5a3a48] hover:text-[#b83b7d] transition font-medium"
                >
                  {item}
                </FooterLink>
              ))}
            </FooterLinkGroup>
          </div>

          {/* Legal */}
          <div>
            <FooterTitle
              title="Legal"
              className="text-[#7b2d54] font-bold mb-2"
            />
            <FooterLinkGroup col>
              {["Privacy Policy", "Terms & Conditions"].map((item) => (
                <FooterLink
                  key={item}
                  href="#"
                  className="text-[#5a3a48] hover:text-[#b83b7d] transition font-medium"
                >
                  {item}
                </FooterLink>
              ))}
            </FooterLinkGroup>
          </div>
        </div>

        <FooterDivider className="border-pink-200 relative z-10" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
          <FooterCopyright
            href="/"
            by="Love Date Crush™"
            year={new Date().getFullYear()}
            className="text-[#7b2d54] text-sm"
          />
          <div className="flex space-x-6 text-xl text-[#b83b7d]">
            {[BsInstagram, BsTwitter, BsFacebook, BsGithub, BsDribbble].map(
              (Icon, i) => (
                <FooterIcon
                  key={i}
                  href="#"
                  icon={Icon}
                  className="hover:scale-125 hover:text-[#e14d7a] transition-transform duration-300"
                />
              )
            )}
          </div>
        </div>

        {/* Soft bottom glow */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-pink-300/30 blur-[80px] rounded-full pointer-events-none" />
      </div>
    </Footer>
  );
};

export default AppFooter;
