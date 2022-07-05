import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
// import icon from "../../../assets/icons/pitangoo.svg";
import icon from "../../../assets/icons/default_icon.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const Pitangoo = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const data = jsonFiles.pitangoo?.data?.data || [];

  return (
    <Accordion icon={icon} title={t("pitangooTitle")}>
      <Grid>
        {data.missions &&
          data.missions.map((m, i) => (
            <div key={i}>
              <p>{m.name}</p>
              <ul>
                {m.tendencies.map((t, y) => (
                  <li key={`${i}_${y}`}>
                    {t.name}: {t.score}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </Grid>
    </Accordion>
  );
};

export default Pitangoo;
