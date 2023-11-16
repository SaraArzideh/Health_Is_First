import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { 
        ...state,
        success: true,
        userInfo:{
          ...state.userInfo,
          user: {...state.userInfo-user, ...action.payload}
        },
        loading: false,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
    return {};
default:
      return state;
  }
};
