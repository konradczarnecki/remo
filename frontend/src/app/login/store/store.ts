import {Tokens, User} from "../../model/index";
import {Action, createFeatureSelector, createSelector} from "@ngrx/store";

export const USER_LOGIN_SUBMIT = 'USER_LOGIN_SUBMIT';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface LoginAction extends Action {
  payload?: User | string | Tokens;
}

export const loginSubmit = (user: User): LoginAction => ({ type : USER_LOGIN_SUBMIT, payload : user });
export const loginSuccess = (tokens: Tokens): LoginAction => ({ type : USER_LOGIN_SUCCESS, payload : tokens });
export const loginFailure = (errorMessage): LoginAction => ({ type : USER_LOGIN_FAILURE, payload : errorMessage });

export function user(state: User, action: LoginAction): User {

  switch (action.type) {

    case USER_LOGIN_SUBMIT:
      return <User> action.payload;

    case USER_LOGIN_SUCCESS:
      const tokens = <Tokens> action.payload;
      if (!tokens.access_token || !tokens.refresh_token) return null;
      localStorage.setItem('token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      return state;

    case USER_LOGIN_FAILURE:
      return null;

    case LOGOUT:
      return null;

    default:
      return state;
  }
}

export const loginReducer = {
  user
};

const selectFeature = createFeatureSelector<LoginState>('login');
export const selectUser = createSelector(selectFeature, (state: LoginState) => state.user);

export default interface LoginState {
  user: User;
}
