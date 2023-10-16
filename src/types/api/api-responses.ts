// eslint-disable-next-line @typescript-eslint/no-explicit-any
type APIResponse<TData = any> =
  | {
      success: true;
      data: TData;
    }
  | APIError;

type APIError = {
  success: false;
  message: string;
  errors?: string;
};

export type { APIError, APIResponse };
