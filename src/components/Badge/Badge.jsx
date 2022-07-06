import React, { useState } from "react";

import Typography from "cozy-ui/transpiled/react/Typography";
import Icon from "cozy-ui/transpiled/react/Icon";

import IdeaIcon from "../../assets/icons/icon-idea.svg";
import ShareBilanBtn from "../Button/ShareBilanBtn";
import ModalBilan from "../Modal/ModalBilan/ModalBilan";

const styles = {
  icon: {
    marginBottom: "0.5rem"
  },
  title: {
    textTransform: "capitalize",
    color: "#21BBEF",
    width: "100%",
    textAlign: "center"
  },
  subText: {
    fontWeight: 400,
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "10px"
  }
};

const Badge = ({
  title,
  mainText,
  subText,
  icon = null,
  background = "#FFFFFF",
  addStyles,
  email,
  url,
  btn = false
}) => {
  const [open, setOpen] = useState(false);

  const OpenModal = () => {
    setOpen(currentOpen => !currentOpen);
  };

  const closeModal = () => {
    setOpen(currentOpen => !currentOpen);
  };
  return (
    <>
      <div
        className="u-flex u-flex-column u-flex-items-center"
        style={{ background: background, ...addStyles }}
      >
        {icon !== null && (
          <Icon style={styles.icon} icon={icon ? icon : IdeaIcon} size={40} />
        )}
        <Typography style={styles.title} variant="h6" component="div" noWrap>
          {url ? (
            <div onClick={() => window.open(url)} className="titleJobPalm">
              {title}
            </div>
          ) : (
            <div>{title}</div>
          )}
        </Typography>
        <Typography className="u-mv-half" variant="body1">
          {mainText}
        </Typography>
        <Typography style={styles.subText} variant="body1">
          {subText}
        </Typography>
        {btn ? <ShareBilanBtn onClickFc={OpenModal} /> : null}
      </div>
      {btn ? (
        <ModalBilan
          open={open}
          closeModal={closeModal}
          title={title}
          email={email}
        />
      ) : null}
    </>
  );
};

export default Badge;
