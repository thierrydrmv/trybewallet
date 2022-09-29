import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { USER_DATA } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    valid: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validData();
    });
  };

  validData = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const emailValid = regex.test(email);
    const passwordSize = 6;
    if (emailValid && password.length >= passwordSize) {
      this.setState({ valid: false });
    } else {
      this.setState({ valid: true });
    }
  };

  wallet = () => {
    const { history, userDispatch } = this.props;
    const action = { type: USER_DATA, payload: { ...this.state } };
    userDispatch(action);
    history.push('/carteira');
  };

  render() {
    const { email, password, valid } = this.state;
    return (
      <form>
        <input
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          name="password"
          value={ password }
          type="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button type="button" onClick={ this.wallet } disabled={ valid }>Entrar</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (state) => dispatch(state),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
