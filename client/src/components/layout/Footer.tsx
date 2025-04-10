import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { FaTwitter, FaLinkedinIn, FaGithub, FaDiscord } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link
              href="/"
              className="text-white text-2xl font-bold flex items-center mb-4"
            >
              <ShieldCheck className="mr-2" />
              <span>ByteStation</span>
            </Link>
            <p className="text-light-text mb-4">
              The trusted platform connecting businesses with verified ethical
              hackers to secure digital assets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light-text hover:text-secondary">
                <FaTwitter />
              </a>
              <a href="#" className="text-light-text hover:text-secondary">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-light-text hover:text-secondary">
                <FaGithub />
              </a>
              <a href="#" className="text-light-text hover:text-secondary">
                <FaDiscord />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-light-text hover:text-secondary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-light-text hover:text-secondary"
                >
                  Security Services
                </Link>
              </li>
              <li>
                <Link
                  href="/submit-project"
                  className="text-light-text hover:text-secondary"
                >
                  Post a Project
                </Link>
              </li>
              <li>
                <Link
                  href="/hackers"
                  className="text-light-text hover:text-secondary"
                >
                  Browse Hackers
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-light-text hover:text-secondary"
                >
                  Client Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">For Hackers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/join-hacker"
                  className="text-light-text hover:text-secondary"
                >
                  Join as a Hacker
                </Link>
              </li>
              <li>
                <Link
                  href="/verification"
                  className="text-light-text hover:text-secondary"
                >
                  Verification Process
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-light-text hover:text-secondary"
                >
                  Find Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/payment-protection"
                  className="text-light-text hover:text-secondary"
                >
                  Payment Protection
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-light-text hover:text-secondary"
                >
                  Hacker Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-light-text hover:text-secondary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-light-text hover:text-secondary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-light-text hover:text-secondary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-light-text hover:text-secondary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-light-text hover:text-secondary"
                >
                  Legal & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-text text-sm mb-4 md:mb-0">
              &copy; {currentYear} ByteStation. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/terms"
                className="text-light-text text-sm hover:text-secondary"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-light-text text-sm hover:text-secondary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/security"
                className="text-light-text text-sm hover:text-secondary"
              >
                Security
              </Link>
              <Link
                href="/sitemap"
                className="text-light-text text-sm hover:text-secondary"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
