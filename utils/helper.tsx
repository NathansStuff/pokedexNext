export const getData = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  return await response.json();
};

export const baseUrl = 'https://jherr-pokemon.s3.us-west-1.amazonaws.com';
