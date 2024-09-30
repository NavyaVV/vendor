export interface CommonState {
  loading: any;
  alert: alertState | null;
  assetsData: any;
  error: any;
}

export interface alertState {
  alert: boolean;
  success?: boolean;
  message?: string;
  title?: string;
  assetsData?: any;
}
export interface assetsState {
  assetsData: null;
}
