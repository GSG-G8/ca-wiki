import axios from 'axios';

const getSecrets = async () => {
  try {
    const result = await axios.get(`/api/v1/secrets`);
    const {
      data: { data },
    } = result;
    return data;
  } catch (err) {
    return err;
  }
};

export default getSecrets;
