const axios = require('axios');

const getUserData = async (url, obj) => {
  try {
    const request = await axios.post(url, obj);
    return request;
  } catch (err) {
    return err.response;
  }
};

export default getUserData;
