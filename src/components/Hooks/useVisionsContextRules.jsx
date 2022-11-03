import { useVisionsAccount } from './useVisionsAccount';

export const knownContextCodes = {
  default: 'default',
  numerique: 'numerique'
};

const DEFAULT_RULES = {
  context: null,
  homePage: {
    bo: {
      text: {
        results: 'home.bo.results.default',
        proposals: 'home.bo.proposals.default'
      }
    },
    visible: {
      bo: true,
      reo: true,
      data: true
    }
  },
  boProposals: {
    ot: {
      visible: true,
      useAllCards: false,
      showJITCards: true,
      showNonJITCards: false,
      hideNonCorresponding: false
    },
    ik: {
      visible: true,
      useAllCards: false
    },
    palm: {
      visible: true
    },
    doceo: {
      visible: true
    }
  }
};

const contextCodeRules = {
  default: DEFAULT_RULES,
  numerique: {
    ...DEFAULT_RULES,
    context: 'numerique',
    homePage: {
      bo: {
        text: {
          results: 'home.bo.results.numerique',
          proposals: 'home.bo.proposals.numerique'
        }
      },
      visible: {
        bo: true,
        reo: false,
        data: false
      }
    },
    boProposals: {
      ot: {
        visible: false,
        useAllCards: false,
        showJITCards: true,
        showNonJITCards: false,
        hideNonCorresponding: false
      },
      ik: {
        visible: true,
        useAllCards: false
      },
      palm: {
        visible: false
      },
      doceo: {
        visible: false
      }
    }
  }
};

/**
 * @returns {{contextRules: DEFAULT_RULES, isLoading: true}} rules
 */
const useVisionsContextRules = () => {
  const { visionsAccount, dataStatus } = useVisionsAccount();
  if (dataStatus.isLoading) return { contextRules: null, isLoading: true };

  return {
    contextRules:
      contextCodeRules[(visionsAccount?.experiencesInfo?.context)] ||
      contextCodeRules['default'],
    isLoading: false
  };
};

export default useVisionsContextRules;
