export const prioritizeCards = cards => {
  const tensionCards = cards.filter(jc => jc.isTension);
  const nonTensionCards = cards.filter(jc => !jc.isTension);
  const ikCards = nonTensionCards.filter(
    jc => jc.positionnement?.toLowerCase() === 'ça me correspond'
  );
  const idkCards = nonTensionCards.filter(
    jc => jc.positionnement?.toLowerCase() === 'je ne sais pas'
  );
  const noCards = nonTensionCards.filter(
    jc => jc.positionnement?.toLowerCase() === 'ça ne me correspond pas'
  );

  return [...ikCards, ...idkCards, ...tensionCards, ...noCards];
};
