import {callApi} from '../AxiosHelper';

export const getPostImagesLoremPicsum = api => {
  const resp = callApi(api);
  console.log('this is my lol resp', resp);
};
