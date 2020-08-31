import { LOGIN_USER, REGISTER_USER, AUTHENTICATE_USER, LOGOUT_USER } from '../_actions/user_types';

export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, registerInfo: action.payload }
    case LOGIN_USER:
      return { ...state, loginInfo: action.payload }
    case AUTHENTICATE_USER:
      return { ...state, userData: action.payload }
    case LOGOUT_USER:
      return { ...state, logoutInfo: action.payload }
    default:
      return state;
  }
}
