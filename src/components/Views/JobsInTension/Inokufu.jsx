import React from "react";

import { useI18n } from "cozy-ui/transpiled/react/I18n";
import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";

import Accordion from "../../Accordion";
import BadgeRow from "../../Badge/BadgeRow/BadgeRow";
import icon from "../../../assets/icons/inokufu.svg";

import EyeIcon from "../../../assets/icons/icon-eye.svg";
import { useJsonFiles } from "../../Hooks/useJsonFiles";

const styles = {
  card: {
    borderRadius: "15px"
  },
  badge: {
    padding: "5px 10px",
    borderRadius: "10px",
    height: "100%"
  }
};

const bgBadge = "#f3f4f6";
const getLastElements = (arr, x) => arr.slice(Math.max(arr.length - x, 1));

const Inokufu = ({ isPublicPage = false }) => {
  const { t } = useI18n();
  const { jsonFiles } = useJsonFiles();
  const datas = getLastElements(jsonFiles.inokufu.data?.data || [], 3);

  return (
    <Accordion
      icon={icon}
      title={t("formationOffers")}
      addStyles={styles.card}
      bgHeader={"#FFF"}
    >
      <Grid className="u-mv-1" container spacing={2}>
        {datas.map(({ title, keywords, picture, url }, index) => (
          <Grid key={index} item xs={12} sm={12} lg={6} xl={4}>
            <BadgeRow
              title={title}
              mainText={keywords}
              icon={EyeIcon}
              picture={picture}
              url={url}
              background={bgBadge}
              addStyles={styles.badge}
              isPublicPage={isPublicPage}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  );
};

export default Inokufu;
