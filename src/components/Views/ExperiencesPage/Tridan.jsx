import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
import icon from "../../../assets/icons/tridan.svg";
// import icon from "../../../assets/icons/default_icon.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const Tridan = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const data = jsonFiles.tridan.data?.data?.last_test || {};

  return (
    <Accordion icon={icon} title={t("tridanTitle")}>
      <Grid className="u-mv-1" container spacing={2}>
        {Object.keys(data).length !== 0 ? (
          <div style={{padding: "25px"}}>
            <h3>Dernier test : {data.name}</h3>
            <p>Score obtenu : {data.score}/{data.score_max}</p>
            <hr />
            <h6>Détail des scores</h6>
            <ul>
              {Object.keys(data.skill_scores).map((skill, index) => (
                <li key={index}>{skill}: {data.skill_scores[skill]}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Aucune donnée</div>
        )}
      </Grid>
    </Accordion>
  );
};

export default Tridan;
