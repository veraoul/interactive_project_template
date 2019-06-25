import qs from 'qs';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { show } from '@/component/Alert';
import { type TypeShareVoice, ListQuery, GetMarquee, TypeDetail, TypeLabelValue } from './types';

const axiosOption = {
  adapter: httpAdapter,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
};

const errorHandler = (error) => {
  // eslint-disable-next-line
  let message = '';
  if (error.response) {
    message = [`Status:${error.response.status}`, error.response.data.message];
  } else if (error.request) {
    message = `${JSON.stringify(error.request)}`;
  } else {
    message = error.message.toString();  // eslint-disable-line
  }
  show(message);
  return Promise.reject(error);
};

const get = (path, formData) => axios.get(`${path}`, formData, axiosOption)
  .then((res) => {
    const { status, statusText, data } = res;
    if (status === 200) return data;
    return new Error(`#${status} ${statusText}`);
  })
  .catch(errorHandler);

const post = (path, formData) => axios.post(`${path}`, formData, axiosOption)
  .then((res) => {
    const { status, statusText, data } = res;
    if (status === 200) return data;
    return new Error(`#${status} ${statusText}`);
  })
  .catch(errorHandler);

export const shareVoice = (postData:TypeShareVoice) =>
  axios.post('voices/api/Event/ShareVoice', postData).then(({ data }) => data)
    .catch(errorHandler);

// 首頁輪播標題
export const getMarquee = ():Promise<GetMarquee[]> =>
  get('voices/api/Event/GetMarquee').then(({ data }) => data);


/**
 * @return {Promise<TypeListResponse>}
 */
export const getListData = (params:ListQuery) =>
  get('voices/api/Event/List', { params }).then(({ data }) => data.data);

