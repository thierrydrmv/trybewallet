import { COIN_DATA, IS_LOADING, WALLET_DATA } from '../actions';

const INITIAL_STATE = {
  value: '',
  currencies: [],
  loading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      ...state,
      loading: true,
    };
  case WALLET_DATA:
    return {
      ...state,
    };
  case COIN_DATA:
    return {
      ...state,
      loading: false,
      currencies: Object.values(action.state)
        .filter(({ codein }) => codein !== 'BRLT').map(({ code }) => code),
    };
  default:
    return state;
  }
};

export default wallet;
