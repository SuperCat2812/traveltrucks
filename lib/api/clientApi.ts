import { camperID, campers, campersData, filterData, formData } from '@/types/types';
import axios from 'axios';

axios.defaults.baseURL = 'https://campers-api.goit.study';

export const getCamper = async ({ dataFilter, page, perPage }: formData) => {
  const cleanFilter = Object.fromEntries(Object.entries(dataFilter ?? {}).filter(([, value]) => value !== ''));
  const { data } = await axios.get<campersData>('/campers', { params: { ...cleanFilter, page, perPage } });
  return data;
};
export const getCamperID = async (dataID: string) => {
  const { data } = await axios.get<camperID>(`/campers/${dataID}`);
  return data;
};

export const getFilter = async () => {
  const { data } = await axios.get<filterData>('/campers/filters');
  return data;
};
