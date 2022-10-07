import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApi, WALLET_DATA } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { coinDispatch } = this.props;
    coinDispatch();
  }

  sendData = async () => {
    const { id } = this.state;
    const { infoDispatch } = this.props;
    this.setState({ id: id + 1 });
    const exchangeRates = await this.fetchApi();
    const action = {
      type: WALLET_DATA, payload: { ...this.state, exchangeRates } };
    infoDispatch(action);
    this.setState({
      value: '',
      description: '' });
  };

  fetchApi = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { coins, loading } = this.props;
    return (
      <form>
        { loading ? <h1>LOADING</h1>
          : (
            <>
              <label htmlFor="value">
                Valor:
                <input
                  name="value"
                  value={ value }
                  id="value"
                  type="number"
                  data-testid="value-input"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <input
                  name="description"
                  value={ description }
                  id="description"
                  data-testid="description-input"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="currency">
                Moeda:
                <select
                  name="currency"
                  value={ currency }
                  id="currency"
                  data-testid="currency-input"
                  onChange={ this.handleChange }
                >
                  {
                    coins.map((code, index) => (
                      <option key={ index } value={ code }>{code}</option>
                    ))
                  }
                </select>
              </label>
              <label htmlFor="method">
                Método de pagamento:
                <select
                  name="method"
                  value={ method }
                  id="method"
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
              <label htmlFor="type">
                Categoria:
                <select
                  name="tag"
                  value={ tag }
                  id="type"
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>
            </>
          )}
        <button type="button" onClick={ this.sendData }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinDispatch: () => dispatch(requestApi()),
  infoDispatch: (state) => dispatch(state),
});

const mapStateToProps = ({ wallet: { currencies, loading } }) => ({
  coins: currencies,
  loading,
});

WalletForm.propTypes = {
  coinDispatch: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  exchangeRates: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  infoDispatch: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  exchangeRates: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
