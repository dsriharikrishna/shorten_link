import { useState } from "react";
import styles from "../../styles/docs.module.css";
import GetStarted from "./GetStarted";
import APISReference from "./APISReference";
import CustomDomains from "./CustomDomains";
import RateLimits from "./RateLimits";

const topicComponents = {
  "Getting Started": GetStarted,
  "API Reference": APISReference,
  "Custom Domains": CustomDomains,
  "Rate Limits": RateLimits,
};

const Docs = () => {
  const [selected, setSelected] = useState(Object.keys(topicComponents)[0]);

  const SelectedComponent = topicComponents[selected];

  return (
    <div className={styles.docs}>
      <aside className={styles.sidebar}>
        {Object.keys(topicComponents).map((topic) => (
          <button
            key={topic}
            className={`${styles.topicBtn} ${
              topic === selected ? styles.active : ""
            }`}
            onClick={() => setSelected(topic)}
          >
            {topic}
          </button>
        ))}
      </aside>

      <main className={styles.content}>
        <h2>{selected}</h2>
        <SelectedComponent />
      </main>
    </div>
  );
};

export default Docs;
