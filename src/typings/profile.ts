export interface ProfileState {
  loading: "idle" | "pending" | "succeeded" | "failstring";
  error: profileErrorState | null | undefined;
  profileView: profileState | null | undefined;
  categories: Array<profileCategoryState> | null | undefined;
}

export interface profileCategoryState {
  category_name: string;
  created_date: string;
  deleted_date: string | null;
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  updated_date: string;
}

export interface profilePocState {
  id: string;
  created_date: string;
  updated_date: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  designation: string;
  phone: string;
  email: string;
  gst: string;
  pan: string;
  business_profile: string;
}

export interface profileCompanyFiles {
  id: string;
  created_date: string;
  updated_date: string;
  is_active: boolean;
  company_file_ref: string;
  poc: string;
}

export interface businessProfileState {
  id: string;
  created_date: string;
  updated_date: string;
  is_active: boolean;
  business_name: string;
  profile_image_ref: string;
  website_url: string;
  company_phone: string;
  company_landline: string;
  company_email: string;
  address: string;
  country: string;
  state: string;
  zip_code: string;
  user: string;
  business_category: string;
}

export interface profileState {
  business_profile: businessProfileState;
  point_of_contact: Array<profilePocState>;
  company_files: Array<profileCompanyFiles>;
}

export interface profileErrorState {
  business_name: Array<string> | string;
  website_url: Array<string> | string;
  company_phone: Array<string> | string;
  company_landline: Array<string> | string;
  company_email: Array<string> | string;
  address: Array<string> | string;
  country: Array<string> | string;
  state: Array<string> | string;
  zip_code: Array<string> | string;
  first_name: Array<string> | string;
  last_name: Array<string> | string;
  designation: Array<string> | string;
  phone: Array<string> | string;
  email: Array<string> | string;
  gst: Array<string> | string;
  pan: Array<string> | string;
  company_file_ref: Array<string> | string;
  business_category: Array<string> | string;
}

export interface businessProfileParams {
  is_active?: boolean;
  business_name?: string;
  profile_image_ref?: string;
  website_url?: string;
  company_phone?: string;
  company_landline?: string;
  company_email?: string;
  address?: string;
  country?: string;
  state?: string;
  zip_code?: string;
  user?: string;
  business_category?: string;
  imageData?: any
}

export interface companyFilesParams {
  is_active?: boolean;
  company_file_ref?: string;
  poc?: string;
}

export interface pointOfContactParams {
  is_active?: boolean;
  first_name?: string;
  last_name?: string;
  designation?: string;
  phone?: string;
  email?: string;
  gst?: string;
  pan?: string;
  business_profile?: string;
}

export interface profileParams {
  point_of_contact?: Array<pointOfContactParams>;
  company_files?: Array<companyFilesParams>;
  business_profile?: businessProfileParams;
}
