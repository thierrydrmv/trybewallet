import { WALLET_DATA } from '../actions';

const INITIAL_STATE = {
  value: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_DATA:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
