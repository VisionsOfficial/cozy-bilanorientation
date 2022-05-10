import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
import Badge from "../../Badge";
import SkilitIcon from "../../../assets/icons/skilit.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const JobCards = () => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const datas = jsonFiles.studyAdvisor.data? || [];

  return (
    <Accordion icon={SkilitIcon} title={t("studyAdvisorTitle")}>
      <Grid className="u-mv-1" container spacing={2}>

      </Grid>
    </Accordion>
  );
};

export default JobCards;
