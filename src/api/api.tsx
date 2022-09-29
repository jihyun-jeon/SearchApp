import axios from 'axios';

const BaseUrl = process.env.REACT_APP_BASE_URL;

export const getSickDataRequest = (searchValue: string) => {
  return axios(`${BaseUrl}/sick?q=${searchValue}`);
};
