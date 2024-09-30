export interface ServiceState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: addServiceErrorState | null | undefined;
  serviceList: servicesState | null | undefined;
  serviceType: Array<serviceTypesState> | undefined;
  serviceDetails?: serviceDetailsState | null;
}

export interface serviceListState {
  service: serviceDataState;
  service_loc: Array<serviceLocationState>;
}

export interface serviceDataState {
  created_date: string;
  description: string;
  is_active: boolean;
  service_name: string;
  service_type: string;
  updated_date: string;
  price: number;
  user: string;
  id: string;
}

export interface serviceLocationState {
  area?: string;
  city?: string;
  country?: string;
  created_date?: string;
  district?: string;
  is_active?: boolean;
  latitude?: string;
  longitude?: string;
  service?: string;
  state?: string;
  updated_date?: string;
  id?: string;
}

export interface servicesState {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<serviceListState>;
}

export interface serviceListParams {
  limit?: string | number;
  offset?: string | number;
  search?: string;
  ordering?: string;
}

export interface addServiceParams {
  service?: serviceParams;
  service_loc?: Array<locationParams>;
}

export interface serviceParams {
  service_name?: string;
  service_type?: string;
  description?: string;
  price?: number;
}

export interface locationParams {
  state?: string;
  district?: string;
  city?: string;
  area?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  service?: string;
}

export interface addServiceErrorState {
  service_name?: Array<string> | string | null;
  service_type?: Array<string> | string | null;
  price?: Array<string> | string | null;
  service_loc?: Array<string> | string | null;
}

export interface serviceTypesState {
  id: string;
  type_name: string;
  created_date: string;
  updated_date: string;
  deleted_date: string;
  is_deleted: boolean;
  is_active: boolean;
}

export interface serviceDetailsState {
  id: string;
  service_name: string;
  service_type: string;
  service_area: string;
  price: number;
  description: string;
  created_date: string;
  updated_date: string;
  deleted_date: string;
  is_deleted: boolean;
  is_active: boolean;
}

export interface filterParamsState {
  category_name?: string;
  limit?: number;
  max_price?: number;
  min_price?: number;
  offset?: number;
  ordering?: string;
  search?: string;
}
