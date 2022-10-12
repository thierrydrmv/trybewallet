import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApi, expenseAction, sendId, editAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    valid: true,
  };

  componentDidMount() {
    const { coinDispatch } = this.props;
    coinDispatch();
  }

  sendData = async () => {
    const { infoDispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    infoDispatch({
      id, value, description, currency, method, tag,
    });
    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
  };

  sendId = (state) => {
    const { idDispatch, editDispatch, edit, api } = this.props;
    editDispatch({ ...state, id: edit.id, exchangeRates: api });
    idDispatch(edit.id);
    this.setState({
      value: '',
      description: '' });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validData();
    });
  };

  validData = () => {
    const { value, description } = this.state;
    if (value && description) {
      this.setState({
        valid: false,
      });
    } else {
      this.setState({
        valid: true,
      });
    }
  };

  render() {
    const { value, description, currency, method, tag, valid } = this.state;
    const { coins, loading, editing } = this.props;
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
        {
          editing
            ? (
              <button
                type="button"
                onClick={ () => this
                  .sendId({ value, description, currency, method, tag }) }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ this.sendData }
                disabled={ valid }
              >
                Adicionar despesa

              </button>
            )
        }

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  coinDispatch: () => dispatch(requestApi()),
  infoDispatch: (state) => dispatch(expenseAction(state)),
  idDispatch: (id) => dispatch(sendId(id)),
  editDispatch: (state) => dispatch(editAction(state)),
});

const mapStateToProps = (
  { wallet: { currencies, loading, edit, editing, api } },
) => ({
  coins: currencies,
  loading,
  edit,
  editing,
  api,
});

WalletForm.propTypes = {
  coinDispatch: PropTypes.func.isRequired,
  idDispatch: PropTypes.func.isRequired,
  editDispatch: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  edit: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  api: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  infoDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
