import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    quantity: 0,
    description: '',
    coin: 'USD',
    payMethod: 'Dinheiro',
    category: 'Alimentação',
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { coinDispatch } = this.props;
    await coinDispatch(requestApi());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { quantity, description, coin, payMethod, category } = this.state;
    const { coins, loading } = this.props;
    return (
      <form>
        { loading ? <h1>LOADING</h1>
          : (
            <>
              <label htmlFor="value">
                Valor:
                <input
                  name="quantity"
                  value={ quantity }
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
                  name="coin"
                  value={ coin }
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
                  name="payMethod"
                  value={ payMethod }
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
                  name="category"
                  value={ category }
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
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinDispatch: (state) => dispatch(state),
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
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
