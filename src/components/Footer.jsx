import React from "react";
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
import { THEME } from "../utils/constants";

const AppFooter = () => {
  return (
    <Footer
      container
      className="rounded-none border-t-0 text-gray-800 transition-all duration-500"
      style={{
        background: `linear-gradient(
          180deg,
          #FFF5F8 0%,        /* very soft blush pink */
          #FADADD 50%,       /* soft pastel pink */
          #F8C9D0 100%       /* slightly warm rose */
        )`,
        fontFamily: THEME.fonts.primary,
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <FooterBrand
              href="/"
              src="/favicon.png"
              alt="Love Date Crush Logo"
              name=""
            />
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#B83B7D" }}
            >
              Love Date Crush
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Find your perfect match and build real connections. 💖
            </p>
          </div>

          {/* About */}
          <div>
            <FooterTitle title="About" className="text-gray-900 font-semibold" />
            <FooterLinkGroup col>
              <FooterLink href="#" className="hover:text-pink-600">
                Our Story
              </FooterLink>
              <FooterLink href="#" className="hover:text-pink-600">
                Meet the Team
              </FooterLink>
              <FooterLink href="#" className="hover:text-pink-600">
                Blog
              </FooterLink>
            </FooterLinkGroup>
          </div>

          {/* Support */}
          <div>
            <FooterTitle title="Support" className="text-gray-900 font-semibold" />
            <FooterLinkGroup col>
              <FooterLink href="#" className="hover:text-pink-600">
                Help Center
              </FooterLink>
              <FooterLink href="#" className="hover:text-pink-600">
                FAQs
              </FooterLink>
              <FooterLink href="#" className="hover:text-pink-600">
                Safety Tips
              </FooterLink>
            </FooterLinkGroup>
          </div>

          {/* Legal */}
          <div>
            <FooterTitle title="Legal" className="text-gray-900 font-semibold" />
            <FooterLinkGroup col>
              <FooterLink href="#" className="hover:text-pink-600">
                Privacy Policy
              </FooterLink>
              <FooterLink href="#" className="hover:text-pink-600">
                Terms & Conditions
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>

        <FooterDivider className="border-pink-200" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <FooterCopyright
            href="/"
            by="Love Date Crush™"
            year={new Date().getFullYear()}
            className="text-gray-700 text-sm"
          />
          <div className="flex space-x-6 text-xl text-pink-600">
            {[BsInstagram, BsTwitter, BsFacebook, BsGithub, BsDribbble].map(
              (Icon, i) => (
                <FooterIcon
                  key={i}
                  href="#"
                  icon={Icon}
                  className="hover:scale-125 transition-transform hover:text-pink-800"
                />
              )
            )}
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;
