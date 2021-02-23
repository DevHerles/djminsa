import http from "../helpers/http-common";

const getAll = () => {
    return http.get("/healths");
};

const get = id => {
    return http.get(`/healths/${id}`);
};

const create = data => {
    return http.post("/healths", data);
};

const update = (id, data) => {
    return http.put(`/healths/${id}`, data);
};

const remove = id => {
    return http.delete(`/healths/${id}`);
};

const removeAll = () => {
    return http.delete(`/healths`);
};

const findByTitle = title => {
    return http.get(`/healths?title=${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};