import React from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

const footerLinks = {
  product: [
    { name: "Overview", href: "#" },
    { name: "Features", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  company: [
    { name: "About us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#", new: true },
    { name: "News", href: "#" },
  ],
  social: [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Dribbble", href: "#" },
  ],
  legal: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

const socialIcons = [
  { name: "Twitter", href: "#", icon: FaTwitter },
  { name: "LinkedIn", href: "#", icon: FaLinkedin },
  { name: "Facebook", href: "#", icon: FaFacebook },
  { name: "GitHub", href: "#", icon: FaGithub },
  { name: "Dribbble", href: "#", icon: FaDribbble },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and description section */}
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">e-learning</h1>
            <p className="text-sm leading-6 text-gray-300">
              Top learning experiences that create more talent in the world.
            </p>
          </div>

          {/* Links section */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Product
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.product.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                        {item.new && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-900">
                            New
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Social
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.social.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and social icons */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} e-learning. All rights reserved.
            </p>
          </div>
          <div className="mt-8 flex items-center space-x-6 lg:mt-0">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
