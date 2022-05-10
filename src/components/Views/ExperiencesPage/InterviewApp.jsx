import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
import icon from "../../../assets/icons/interviewApp.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const InterviewApp = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const data = jsonFiles.interviewApp?.data || [];

  return (
    <Accordion icon={icon} title={t("interviewAppTitle")}>
      <div style={{ padding: "25px" }}>
        <h4>Simulateur: {data.data.name}</h4>
        <ul>
          {data.data.responses.map((r, idx) => (
            <li key={idx}>
              <p>Question: {r.question}</p>
              <p>
                <a href={r.media}>Fichier</a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Accordion>
  );
};

export default InterviewApp;
