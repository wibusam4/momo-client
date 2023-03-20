export const API = "https://api.sieuthiapi.site/api/";

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
