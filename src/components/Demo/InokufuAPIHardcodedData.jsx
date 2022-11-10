import React from 'react';
import { useState } from 'react';
import { useMappingData } from '../Hooks/useMappingData';

import Accordion from '../Accordion';
import Grid from 'cozy-ui/transpiled/react/MuiCozyTheme/Grid';
import BadgeRow from '../Badge/BadgeRow';
import Loader from '../Loader';
import { useI18n } from 'cozy-ui/transpiled/react/I18n';

import icon from '../../assets/icons/inokufu.svg';
import EyeIcon from '../../assets/icons/icon-eye.svg';

export const DEMO_DATA = [
  {
    title: 'Anglais C1 "Niveau Avancé "',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/90129741600017_AnglaisToeicC1/90129741600017_AnglaisToeicC11',
    description:
      'COMPÉTENCES ÉCRITES : . - Savoir s exprimer avec clarté et structure . - Rédiger des lettres ou essais en adoptant un style adapté . . COMPÉTENCES ORALES : . - Comprendre un long discours structuré, les programmes télévisuels sans effort particulier . - Apprendre à connaître le sens de textes littér...',
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/8moncompteformation.png',
    provider: 'MonCompteFormation',
    bloom: ['Degree'],
    type: ['Training'],
    address: '155 Rue Paul LANGEVIN 13290 AIX EN PROVENCE FRANCE',
    publisher: [
      {
        name: 'FABRE FORMATION AIX'
      }
    ],
    author: [
      {
        name: 'Delmas Margaux'
      }
    ],
    level: 1.0,
    lang: 'fr',
    PriceSpecification: {
      '@context': 'https://schema.org/',
      '@type': 'PriceSpecification',
      price: 765.0,
      priceCurrency: '€',
      'price-free': false
    }
  },
  {
    title: 'Anglais B2 "Niveau indépendant"',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/90129741600017_AnglaisToeicB2/90129741600017_AnglaisToeicB21',
    description:
      'COMPÉTENCES ÉCRITES : . - Comprendre le contenu essentiel de sujets concrets ou abstraits dans un texte complexe, y compris une discussion technique dans votre spécialité . - Décrire des événements . - Parler de ses souhaits ou de ses sentiments personnels - Ecrire un texte cohérent . - Ecrire des l...',
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/6moncompteformation.png',
    provider: 'MonCompteFormation',
    bloom: ['Degree'],
    type: ['Training'],
    address: '155 Rue Paul Langevin 13290 AIX EN PROVENCE FRANCE',
    publisher: [
      {
        name: 'FABRE FORMATION AIX'
      }
    ],
    author: [
      {
        name: 'Delmas Margaux'
      }
    ],
    level: -0.5,
    lang: 'fr',
    PriceSpecification: {
      '@context': 'https://schema.org/',
      '@type': 'PriceSpecification',
      price: 2502.0,
      priceCurrency: '€',
      'price-free': false
    }
  },
  {
    title: 'Anglais A2 "Niveau de Survie"',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/90129741600017_AnglaisToeicA2/90129741600017_AnglaisToeicA21',
    description:
      'COMPÉTENCES ÉCRITES : . - Saisir le sens de textes portant sur des sujets courants . - Etre en mesure de produire des rédactions courtes portant sur sujets communs . . COMPÉTENCES ORALES : . - Etre capable de comprendre le sens général de dialogues en anglais de tous les jours et dont le débit pourr...',
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/3moncompteformation.png',
    provider: 'MonCompteFormation',
    bloom: ['Degree'],
    type: ['Training'],
    address: '155 Rue Paul Langevin 13290 AIX EN PROVENCE FRANCE',
    publisher: [
      {
        name: 'FABRE FORMATION AIX'
      }
    ],
    author: [
      {
        name: 'Delmas Margaux'
      }
    ],
    level: -0.5,
    lang: 'fr',
    PriceSpecification: {
      '@context': 'https://schema.org/',
      '@type': 'PriceSpecification',
      price: 1583.0,
      priceCurrency: '€',
      'price-free': false
    }
  },
  {
    title: 'Anglais B1 " Niveau Seuil"',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/90129741600017_AnglaisToeicB1/90129741600017_20220103-00216',
    description:
      'COMPÉTENCES ÉCRITES : . - Lire des textes . - Décrire des événements . - Parler de ses souhaits ou de ses sentiments personnels . - Ecrire un texte cohérent . - Ecrire des lettres pour raconter des expériences . . COMPÉTENCES ORALES : . - Conversations sur des sujets familiers concernant son passé, ...',
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/6moncompteformation.png',
    provider: 'MonCompteFormation',
    bloom: ['Degree'],
    type: ['Training'],
    address: '155 Rue Paul Langevin 13290 AIX EN PROVENCE FRANCE',
    publisher: [
      {
        name: 'FABRE FORMATION AIX'
      }
    ],
    author: [
      {
        name: 'Delmas Margaux'
      }
    ],
    level: -0.5,
    lang: 'fr',
    learningTimeValue: 15,
    learningTimeUnit: 'h',
    PriceSpecification: {
      '@context': 'https://schema.org/',
      '@type': 'PriceSpecification',
      price: 540.0,
      priceCurrency: '€',
      'price-free': false
    }
  },
  {
    title: 'Anglais A1 "découverte"',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/90129741600017_AnglaisToeicA1/90129741600017_AnglaisToeicA11',
    description:
      'COMPÉTENCES ÉCRITES : . - Rédiger l équivalent d une carte postale et raconter ses vacances. - Décrire sa personne, sa nationalité et son physique. . COMPÉTENCES ORALES : . - Apprendre à communiquer de manière simple . - Savoir poser des questions et y répondre . - Savoir utiliser des expressions si...',
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/10moncompteformation.png',
    provider: 'MonCompteFormation',
    bloom: ['Degree'],
    type: ['Training'],
    address: '155 Rue Paul Langevin 13290 AIX EN PROVENCE FRANCE',
    publisher: [
      {
        name: 'FABRE FORMATION AIX'
      }
    ],
    author: [
      {
        name: 'Delmas Margaux'
      }
    ],
    level: -0.5,
    lang: 'fr',
    PriceSpecification: {
      '@context': 'https://schema.org/',
      '@type': 'PriceSpecification',
      price: 540.0,
      priceCurrency: '€',
      'price-free': false
    }
  },
  {
    title: 'CLOE Anglais',
    url:
      'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/90129741600017_CLOE-Anglais/90129741600017_AnglaisCloe',
    description:
      "Analyser des écrits courts en identifiant les éléments langagiers clés et en tenant compte de leur exactitude afin d'employer ces éléments dans des écrits courants et professionnels, et notamment en utilisant un vocabulaire courant ou professionnel adapté au contexte, en utilisant les principales st...",
    picture:
      'https://picturelo.s3.eu-west-3.amazonaws.com/provider/moncompteformation/9moncompteformation.png',
    provider: 'MonCompteFormation',
    bloom: ['Degree'],
    type: ['Training'],
    address: '155 Rue Paul Langevin 13290 AIX EN PROVENCE FRANCE',
    publisher: [
      {
        name: 'FABRE FORMATION AIX'
      }
    ],
    author: [
      {
        name: 'MOVE UP Accueil'
      }
    ],
    level: -0.5,
    lang: 'fr',
    learningTimeValue: 10,
    learningTimeUnit: 'h',
    PriceSpecification: {
      '@context': 'https://schema.org/',
      '@type': 'PriceSpecification',
      price: 700.0,
      priceCurrency: '€',
      'price-free': false
    }
  }
];

const styles = {
  card: {
    borderRadius: '15px',
    paddingBottom: 30
  },
  badge: {
    padding: '8px 10px',
    borderRadius: '10px',
    height: '100%',
    background: '#f3f4f6'
  }
};

const InokufuAPIHardcodedData = () => {
  const { mappingData } = useMappingData();
  const { t } = useI18n();

  const [data] = useState(DEMO_DATA);
  const [loading] = useState(false);
  const [error] = useState(false);

  const [extraDataToggled] = useState(false);

  const getOfferMappingData = publisherArr => {
    if (!publisherArr || !publisherArr.length || !mappingData) return null;

    const publisherName = publisherArr[0].name;
    const idx = mappingData?.of?.findIndex(
      o => o.OF.toLowerCase().trim() === publisherName.toLowerCase().trim()
    );
    if (idx === -1) return null;
    return mappingData.of[idx];
  };

  return (
    <Accordion
      icon={icon}
      title={t('formationOffers')}
      addStyles={styles.card}
      bgHeader={'#FFF'}
      // btnSeeMore={data.length > 2}
      btnSeeMore={false}
      seeMoreFC={() => {}}
      seeMoreToggled={extraDataToggled}
    >
      {error && (
        <div>Une erreur est survenue lors du chargement des données</div>
      )}
      {loading ? (
        <Loader
          text={'Veuillez patienter, nous récupérons les offres adaptées...'}
        />
      ) : (
        <Grid>
          {data.map((offer, index) => (
            <Grid key={index} xs={12} className='containerBadgeRow' item>
              <div>
                <Grid item>
                  <BadgeRow
                    offerAPI={offer}
                    icon={EyeIcon}
                    addStyles={styles.badge}
                    offerDataMapping={getOfferMappingData(offer?.publisher)}
                    isPublicPage={false}
                  />
                </Grid>
              </div>
              <p className='sourceData'>
                Source de données : <span>Inokufu</span>
              </p>
            </Grid>
          ))}
        </Grid>
      )}
    </Accordion>
  );
};

export default InokufuAPIHardcodedData;
