import { BookData, CamperID, CampersData, FilterData, formData, Review } from '@/types/types';
import axios from 'axios';

axios.defaults.baseURL = 'https://Campers-api.goit.study';

export const getCamper = async ({ dataFilter, page, perPage }: formData) => {
  const cleanFilter = Object.fromEntries(Object.entries(dataFilter ?? {}).filter(([, value]) => value !== ''));
  const { data } = await axios.get<CampersData>('/Campers', { params: { ...cleanFilter, page, perPage } });
  return data;
};

export const getCamperID = async (dataID: string) => {
  const { data } = await axios.get<CamperID>(`/Campers/${dataID}`);
  return data;
};

export const getReviews = async (dataID: string) => {
  const { data } = await axios.get<Review[]>(`/Campers/${dataID}/reviews`);
  return data;
};
interface PostBookRequest {
  dataID: string;
  bookData: BookData;
}
export const postBook = async ({ dataID, bookData }: PostBookRequest) => {
  const { data } = await axios.post<Review[]>(`/Campers/${dataID}/booking-requests`, bookData);
  return data;
};

export const getFilter = async () => {
  const { data } = await axios.get<FilterData>('/Campers/filters');
  return data;
};
