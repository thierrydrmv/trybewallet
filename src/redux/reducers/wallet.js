import { COIN_DATA,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SEND_ID,
  WALLET_DATA } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  editing: false,
  edit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_DATA:
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  case COIN_DATA:
    return {
      ...state,
      api: action.state,
      currencies: Object.values(action.state)
        .filter(({ codein }) => codein !== 'BRLT').map(({ code }) => code),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editing: true,
      edit: action.state,
    };
  case SEND_ID:
    return {
      ...state,
      editing: false,
      expenses: state.expenses
        .map((item) => (item.id === action.id ? { ...item, ...state.edit } : item)),
    };

  default:
    return state;
  }
};

export default wallet;
