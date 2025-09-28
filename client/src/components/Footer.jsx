import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-copyright">
            © 2025 Mern Stack. All rights reserved.
          </span>
        </div>
        <div className="footer-right">
          <a href="#" aria-label="Facebook" className="footer-icon"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter" className="footer-icon"><FaTwitter /></a>
          <a href="#" aria-label="Instagram" className="footer-icon"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn" className="footer-icon"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};
