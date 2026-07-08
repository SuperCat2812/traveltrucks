export interface formDataValue {
  location: string;
  form: string;
  engine: string;
  transmission: string;
}
export interface formData {
  dataFilter?: formDataValue;
  perPage: number;
  page: number;
}

type forms = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';

type transmissions = 'automatic' | 'manual';

type engines = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export interface filterData {
  forms: forms[];
  transmissions: transmissions[];
  engines: engines[];
}

export interface campers {
  id: string;
  name: string;
  price: number;
  rating: 0;
  location: string;
  description: string;
  form: forms;
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

interface gallery {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface camperID {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: forms;
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
  gallery: gallery[];
  totalReviews: number;
}

export interface campersData {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: campers[];
}
