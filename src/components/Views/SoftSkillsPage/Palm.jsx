import React, { useState } from "react";

import Grid from "cozy-ui/transpiled/react/MuiCozyTheme/Grid";
import Accordion from "../../Accordion";

import PalmMatching from "../../PalmMatching/PalmMatching";

import palmIcon from "../../../assets/icons/palm.svg";
import { Input } from "@material-ui/core";

const PALM_MATCHING_URL = "https://palm-app.io/vision-matchings/?email=";

const styles = {
  button: {
    padding: "5px",
    margin: 5,
    background: "rgb(33, 187, 239)",
    color: "white",
    fontSize: 18,
    borderRadius: 5,
    border: "none",
    cursor: "pointer"
  },
  h5: {
    padding: 25
  }
};

const Palm = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [matchings, setMatchings] = useState([]);

  const tryLoadMatchings = async e => {
    const res = await fetch(PALM_MATCHING_URL + email);
    if (res.status != 200)
      return alert("Une erreur est survenue auprès de PALM");

    const resMatchings = await res.json();
    if (resMatchings.length === 0) {
      setStep(2);
      return;
    }

    setMatchings(resMatchings);
    setStep(1);
  };

  return (
    <Accordion icon={palmIcon} title={"Mes matchings"}>
      <Grid className="u-mv-1" container spacing={2}>
        {step === 0 && (
          <div style={styles.h5}>
            <h5>Bientôt disponible</h5>
            {/* <h5>
              Pour récupérer vos Matchings de métiers, veuillez vous assurer que
              vous avec activé PALM depuis la page d'accueil de votre Cozy, puis
              revenez ici et entrez votre email.
            </h5>
            <Grid item xs={12} sm={12}>
              <Input
                placeholder="Veuillez entrer votre email"
                value={email}
                onInput={e => setEmail(e.target.value)}
              />
            </Grid>
            <button style={styles.button} onClick={tryLoadMatchings}>
              Valider
            </button> */}
          </div>
        )}
        {step === 1 &&
          matchings.length &&
          matchings.map((matching, index) => (
            <Grid key={index} item xs={12} sm={4}>
              <PalmMatching
                match_details={matching.match_details}
                mission_name={matching.mission_name}
                mission_url={matching.mission_url}
                mission_description={matching.mission_description}
                similarity={matching.similarity}
                company_name={matching.company_name}
              />
            </Grid>
          ))}
        {step === 2 && (
          <div style={styles.h5}>
            <h5>
              PALM est toujours en train de matcher vos données. Veuillez
              réessayer dans une minute
            </h5>
          </div>
        )}
      </Grid>
    </Accordion>
  );
};

export default Palm;
