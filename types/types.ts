export interface FormDataValue {
  location: string;
  form: string;
  engine: string;
  transmission: string;
}
export interface formData {
  dataFilter?: FormDataValue;
  perPage: number;
  page: number;
}

type Forms = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';

type transmissions = 'automatic' | 'manual';

type engines = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export interface FilterData {
  forms: Forms[];
  transmissions: transmissions[];
  engines: engines[];
}

export interface Campers {
  id: string;
  name: string;
  price: number;
  rating: 0;
  location: string;
  description: string;
  form: Forms;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: transmissions;
  engine: engines;
  amenities: string[];
  coverImage: string;
  totalReviews: 0;
}

interface Gallery {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperID {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: Forms;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: transmissions;
  engine: engines;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  gallery: Gallery[];
  totalReviews: number;
}

export interface CampersData {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Campers[];
}

export interface Review {
  id: string;
  camperId: CamperID['id'];
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookData {
  name: string;
  email: string;
}
