import styles from "../../styles/terms.module.css";

const Terms = () => {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using ShortLink's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      id: "description",
      title: "2. Service Description",
      content:
        'ShortLink provides URL shortening services that allow users to create shortened versions of long URLs. Our service is provided "as is" and we reserve the right to modify or discontinue the service at any time without notice.',
    },
    {
      id: "user-conduct",
      title: "3. User Conduct",
      content:
        "You agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the service in any way that could damage the service or general business of ShortLink.",
      subsections: [
        "Creating links to malicious, illegal, or harmful content",
        "Spamming or sending unsolicited messages",
        "Violating any applicable local, state, national, or international law",
        "Infringing upon or violating our intellectual property rights or the intellectual property rights of others",
      ],
    },
    {
      id: "privacy",
      title: "4. Privacy Policy",
      content:
        "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.",
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property Rights",
      content:
        "The service and its original content, features, and functionality are and will remain the exclusive property of ShortLink and its licensors. The service is protected by copyright, trademark, and other laws.",
    },
    {
      id: "limitation",
      title: "6. Limitation of Liability",
      content:
        "In no event shall ShortLink, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
    },
    {
      id: "termination",
      title: "7. Termination",
      content:
        "We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
    },
    {
      id: "changes",
      title: "8. Changes to Terms",
      content:
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Terms & <span>Conditions</span>
          </h1>
          <p className={styles.subtitle}>
            Please read these terms and conditions carefully before using our
            service.
          </p>
        </div>

        <div className={styles.card}>
          {sections.map((section) => (
            <div key={section.id} id={section.id} className={styles.section}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <p className={styles.sectionText}>{section.content}</p>

              {section.subsections && (
                <>
                  <p className={styles.subListIntro}>
                    This includes but is not limited to:
                  </p>
                  <ul className={styles.subList}>
                    {section.subsections.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
