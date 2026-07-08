import { campersData, formData } from '@/types/types';
import axios from 'axios';

axios.defaults.baseURL = 'https://campers-api.goit.study';

export const getCamper = async ({ dataFilter, page, perPage }: formData) => {
  const cleanFilter = Object.fromEntries(Object.entries(dataFilter ?? {}).filter(([, value]) => value !== ''));
  const { data } = await axios.get<campersData>('/campers', { params: { ...cleanFilter, page, perPage } });
  return data;
};
