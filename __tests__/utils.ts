export const showDataType = (data: any):string => {
  if (Array.isArray(data)) return 'array';
  return typeof data;
};
