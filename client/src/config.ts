export const getAPI = () => {
  if (process.env.NODE_ENV === 'production') return 'https://solicitud-becas.herokuapp.com/';
  return 'http://localhost:8080/';
};
