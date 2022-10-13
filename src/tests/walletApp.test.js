import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const initialState = {
  user: {
    email: 'varelathierry@gmail.com',
  },
  wallet: {
    currencies: Object.values(mockData)
      .filter(({ codein }) => codein !== 'BRLT').map(({ code }) => code),
    expenses: [{
      id: 0,
      value: '33',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'mousepad',
      exchangeRates: mockData,
    },
    {
      id: 1,
      value: '12',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'mouse',
      exchangeRates: mockData,
    },
    ],

  },
};

describe('testes aplicação trybewallet', () => {
  it('testando tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();

    userEvent.type(inputEmail, 'varelathierry@gmail.com');
    userEvent.type(inputPassword, '@31aC2');
    userEvent.click(btnLogin);

    expect(history.location.pathname).toBe('/carteira');
  });
  it('testando componente wallet', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');
    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();

    const btnEdit = screen.getAllByRole('button', { name: /editar/i });
    const btnDelete = screen.getAllByRole('button', { name: /excluir/i });

    expect(btnEdit[0]).toBeInTheDocument();
    expect(btnDelete[0]).toBeInTheDocument();
  });
  it('testando botões', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const btnEdit = screen.getAllByRole('button', { name: /editar/i });
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');

    userEvent.click(btnEdit[0]);
    userEvent.type(inputValue, 44);
    userEvent.type(inputDescription, 'a');
    const btnCorfirmEdit = screen.getByRole('button', { name: /editar despesa/i });
    expect(btnCorfirmEdit).toBeInTheDocument();
  });
});
