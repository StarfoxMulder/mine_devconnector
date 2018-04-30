import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply token to every request if it's found
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete the auth header if token is not present
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
