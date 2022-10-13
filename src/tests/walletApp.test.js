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
      tag: 'Lazer',
      description: 'mouse',
      exchangeRates: mockData,
    },
    ],
    editing: false,
    edit: {
      id: 0,
      value: '44',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'mousepad',
      exchangeRates: mockData,
    },
    api: mockData,
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

  it('adicionando um produto', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const btnAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '12');
    userEvent.type(inputDescription, 'camiseta');
    userEvent.click(btnAdd);

    const btnEdit = await screen.findByRole('button', { name: /editar/i });

    expect(btnEdit).toBeInTheDocument();
  });

  it('testando botões', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const btnDelete = screen.getAllByRole('button', { name: /excluir/i });

    userEvent.click(btnDelete[1]);
    const btnEdit = screen.getByRole('button', { name: /editar/i });
    userEvent.click(btnEdit);
    userEvent.type(inputValue, '44');
    userEvent.type(inputDescription, 'a');
    const btnCorfirmEdit = screen.getByRole('button', { name: /editar despesa/i });
    expect(btnCorfirmEdit).toBeInTheDocument();

    userEvent.click(btnCorfirmEdit);
  });
});
