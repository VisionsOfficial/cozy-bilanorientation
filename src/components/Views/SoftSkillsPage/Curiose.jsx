import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";

import Accordion from "../../Accordion";
import CurioseIcon from "../../../assets/icons/curiose.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const styles = {
  keywords: {
    marginLeft: "10px",
    color: "#C4C4C4",
    padding: "8px",
    textTransform: "uppercase",
    backgroundColor: "#18233F",
    borderRadius: "6px",
    fontSize: "12px"
  },
  list: {
    listStyleType: "none"
  },
  separator: {
    width: 40,
    height: 3,
    background: "orange"
  }
};

const Curiose = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const data = jsonFiles.curiose?.data?.response || [];

  return (
    <Accordion icon={CurioseIcon} title={t("curiose.jobs")}>
      <div style={{ padding: "25px" }}>
        <h5>Bientôt disponible</h5>
      </div>
      {/* {data.length === 0 ? (
        <div style={{ padding: '25px' }}>
          <h5>Bientôt disponible</h5>
        </div>
      ) : (
        <div style={{ padding: '25px' }}>
          <h3>Mes types de personnalité</h3>
          <p>
            <span style={styles.keywords}>{data.trait_dominant}</span>,
            <span style={styles.keywords}>{data.trait_secondaire}</span>
          </p>
          <h3>Ton profil correspond à {data.metiers_match.length} métiers</h3>
          <ul style={styles.list}>
            {data.metiers_match.map((job, index) => (
              <li key={index}>
                <p>{job.charAt(0).toUpperCase() + job.slice(1)}</p>
                <div style={styles.separator}></div>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </Accordion>
  );
};

export default Curiose;
