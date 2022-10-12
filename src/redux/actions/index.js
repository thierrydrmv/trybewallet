const USER_DATA = 'USER_DATA';
const WALLET_DATA = 'WALLET_DATA';
const COIN_DATA = 'COIN_DATA';
const IS_LOADING = 'IS_LOADING';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const SEND_ID = 'SEND_ID';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

export {
  USER_DATA, WALLET_DATA, COIN_DATA, IS_LOADING, DELETE_EXPENSE, SEND_ID, EDIT_EXPENSE };

export const userAction = (state) => ({ type: USER_DATA, state });

export const walletAction = (state) => ({ type: WALLET_DATA, state });

export const getCoins = (state) => ({ type: COIN_DATA, state });

export const deleteAction = (id) => ({ type: DELETE_EXPENSE, id });

export const sendId = (id) => ({ type: SEND_ID, id });

export const editAction = (state) => ({ type: EDIT_EXPENSE, state });

export const requestApi = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(getCoins(data));
};

export const expenseAction = (state) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(walletAction({ ...state, exchangeRates: data }));
};
