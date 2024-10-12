import axios from 'axios';
import {AllActions} from '../Store/actionIndex';

export const callApi = async (api = '', dispatch) => {
  if (!!api) {
    try {
      const resp = await axios.get(api);
      const {status, data} = resp;
      if (status === 200 && !!data) {
        return resp.data;
      }
    } catch (e) {
      return e;
    } finally {
    }
  }
};
