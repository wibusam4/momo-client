export const API = "https://sieuthiapi.site/backend/";

export const config = (
  method: string,
  url: string,
  token?: string,
  data?: object
) => {
  return {
    method: method,
    url: `${API}${url}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: data,
  };
};
