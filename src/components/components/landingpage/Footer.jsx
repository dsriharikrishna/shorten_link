import { Link } from "react-router-dom";
import styles from "../../styles/footer.module.css";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
    { to: "/terms", label: "Terms & Conditions" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: <Facebook />, label: "Facebook" },
    { href: "https://twitter.com", icon: <Twitter />, label: "Twitter" },
    { href: "https://instagram.com", icon: <Instagram />, label: "Instagram" },
  ];

  const contactInfo = [
    { icon: <Mail />, text: "info@signitives.net" },
    { icon: <Phone />, text: "+1 (555) 123-4567" },
    {
      icon: <MapPin />,
      text: "19th Floor, Vijaya Krishna Towers, Madhava Reddy Colony, Gachibowli – 500032, Hyderabad, Telangana, India",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <Link to="/" className={styles.brand}>
            <div className={styles.logo}>
              <LinkIcon />
            </div>
            <span>ShortLink</span>
          </Link>
          <p className={styles.description}>
            The most trusted URL shortener service.
          </p>
          <div className={styles.social}>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contact Info</h4>
          <ul>
            {contactInfo.map((item, i) => (
              <li key={i}>
                <span className={styles.icon}>{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {currentYear} ShortLink. All rights reserved.</p>
        <div className={styles.policies}>
          <Link to="/terms">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
