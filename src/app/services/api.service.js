import http from "../helpers/http-common";

const getAll = (path) => {
  return http.get(path);
};

const getById = (path, id) => {
  return http.get(`/${path}/${id}`);
};

const create = (path, data) => {
  return http.post(path, data);
};

const updateById = (path, id, data) => {
  return http.put(`/${path}/${id}`, data);
};

const deleteById = (path, id) => {
  return http.delete(`/${path}/${id}`);
};

const deleteAll = (path) => {
  return http.delete(`/${path}`);
};

const findByTitle = (path, title) => {
  return http.get(`/${path}?title=${title}`);
};

const signInWithEmailAndPassword = (path, data) => {
  return http.post(path, data);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  deleteAll,
  findByTitle,
  signInWithEmailAndPassword,
};