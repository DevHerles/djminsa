import http from "../helpers/http-common";

const getAll = () => {
    return http.get("/partners");
};

const get = id => {
    return http.get(`/partners/${id}`);
};

const create = data => {
    return http.post("/partners", data);
};

const update = (id, data) => {
    return http.put(`/partners/${id}`, data);
};

const remove = id => {
    return http.delete(`/partners/${id}`);
};

const removeAll = () => {
    return http.delete(`/partners`);
};

const findByTitle = title => {
    return http.get(`/partners?title=${title}`);
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