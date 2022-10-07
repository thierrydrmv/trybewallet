// Coloque aqui suas actions
const USER_DATA = 'USER_DATA';
const WALLET_DATA = 'WALLET_DATA';
const COIN_DATA = 'COIN_DATA';
const IS_LOADING = 'IS_LOADING';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

export { USER_DATA, WALLET_DATA, COIN_DATA, IS_LOADING, DELETE_EXPENSE };

export const userAction = (state) => ({ type: USER_DATA, state });

export const walletAction = (state) => ({ type: WALLET_DATA, state });

export const getCoins = (state) => ({ type: COIN_DATA, state });

export const deleteAction = (id) => ({ type: DELETE_EXPENSE, id });

const isLoading = () => ({
  type: IS_LOADING,
});

export const requestApi = () => async (dispatch) => {
  dispatch(isLoading());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(getCoins(data));
};
