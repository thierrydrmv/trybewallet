// Coloque aqui suas actions
const USER_DATA = 'USER_DATA';
const WALLET_DATA = 'WALLET_DATA';

export { USER_DATA, WALLET_DATA };

export const userAction = (state) => ({ type: USER_DATA, state });

export const walletAction = (state) => ({ type: WALLET_DATA, state });
