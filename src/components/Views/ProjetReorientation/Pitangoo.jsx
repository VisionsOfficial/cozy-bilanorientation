import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
// import icon from "../../../assets/icons/pitangoo.svg";
import icon from "../../../assets/icons/default_icon.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";
import BadgeGraph from "../../Badge/BadgeGraph/BadgeGraph";

const getLastElements = (arr, x) => arr.slice(Math.max(arr.length - x, 1));

const Pitangoo = ({ headerBg, addStyles }) => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const data = getLastElements(
    jsonFiles.pitangoo?.data?.data.missions || [],
    1
  );

  return (
    <Accordion
      icon={icon}
      title={t("pitangooTitle")}
      bgHeader={headerBg}
      addStyles={addStyles}
    >
      <Grid
        className="u-mv-1 containerGraph"
        container
        spacing={2}
      >
        {data &&
          data.map((element, index) => (
            <Grid key={index} style={{ paddingBottom: 30 }}>
              <BadgeGraph data={element} />
            </Grid>
          ))}
        <p className="sourceData">
          Source de données : <span>Pitangoo</span>
        </p>
      </Grid>
    </Accordion>
  );
};

export default Pitangoo;
