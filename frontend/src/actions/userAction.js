import axios from 'axios';
import { toast } from 'react-toastify';
import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from '../constants/userConstants';

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const { auth: { userInfo } } = getState(); // Get the token from the current state

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/profile', user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    toast.dismiss(); // Dismiss any existing toasts
    toast.success("Profile updated successfully!");

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    toast.dismiss(); // Dismiss any existing toasts
    toast.error("Failed to update profile."+ (error.response && error.response.data.message
      ? error.response.data.message
      : error.message));
  }
};
