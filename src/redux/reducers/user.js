import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA:
    return {
      ...state,
      ...action.state,
    };
  default:
    return state;
  }
};

export default userReducer;
