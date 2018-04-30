import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "./types";

// Get curretn profile
export const getCurrentProfile = () => dispatch => {
  // Loading is set to true at the begining of this function by invoking the profileReducer with case PROFILE_LOADING
  // Loading is set to false when either a profile or an error is returned and profileReducer is invoked again with case GET_PROFILE (the difference is in the payload, on if the profile data or an epty object is passed)
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
