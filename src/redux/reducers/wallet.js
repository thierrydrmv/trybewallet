import { COIN_DATA,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  IS_LOADING,
  SEND_ID,
  WALLET_DATA } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  loading: false,
  editing: false,
  edit: {},
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
      expenses: [...state.expenses, action.payload],
    };
  case COIN_DATA:
    return {
      ...state,
      loading: false,
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
