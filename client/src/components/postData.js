const axios = require('axios');

const postData = async (url, obj) => {
  try {
    const request = await axios.post(url, obj);
    return request;
  } catch (err) {
    return err.response;
  }
};

export default postData;
