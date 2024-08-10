import instance from './apiInstance';

const getSearch = async (data: string) => {
  const res = await instance.get(data);
  return res;
};

export default getSearch;
