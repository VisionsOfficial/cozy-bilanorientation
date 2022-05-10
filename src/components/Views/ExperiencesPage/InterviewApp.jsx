import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
import icon from "../../../assets/icons/interviewApp.svg";
// import icon from "../../../assets/icons/icon-eye.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const InterviewApp = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const data = jsonFiles.interviewApp?.data || [];

  return (
    <Accordion icon={icon} title={t("interviewAppTitle")}>
      <Grid className="u-mv-1" container spacing={2}>

      </Grid>
    </Accordion>
  );
};

export default InterviewApp;
