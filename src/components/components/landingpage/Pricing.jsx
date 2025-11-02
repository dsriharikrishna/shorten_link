// src/components/pages/Pricing.jsx
import { useState } from "react";
import LoginPage from "../auth/LoginPage";
import styles from "../../styles/pricing.module.css";

const Pricing = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic features for personal use",
      features: [
        "2 Short Links per month",
        "Basic Analytics",
        "No Custom Domain",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$9/mo",
      description: "For professionals and teams",
      features: [
        "All Free Features",
        "Slug name Change",
        "Custom Domains",
        "Advanced Analytics",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      description: "Custom solutions for large businesses",
      features: [
        "All Pro Features",
        "Dedicated Account Manager",
        "SLA & Uptime Guarantee",
      ],
      highlight: false,
    },
  ];

  return (
    <div className={styles.pricing}>
      <h1 className={styles.title}>Simple & Transparent Pricing</h1>
      <p className={styles.subtitle}>Choose a plan that fits your needs</p>

      <div className={styles.grid}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`${styles.card} ${plan.highlight ? styles.highlight : ""}`}
          >
            <h2>{plan.name}</h2>
            <p className={styles.price}>{plan.price}</p>
            <p className={styles.desc}>{plan.description}</p>
            <ul>
              {plan.features.filter(Boolean).map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>

            <button className={styles.button} onClick={handleLoginOpen}>
              {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
            </button>
          </div>
        ))}
      </div>

      {/* <LoginPage open={showLoginModal} onClose={handleLoginClose} /> */}
    </div>
  );
};

export default Pricing;
