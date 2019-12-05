export interface Response<PayloadType = object> {
  success: boolean;
  status?: string;
  message?: string;
  payload?: PayloadType;
}
