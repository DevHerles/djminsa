import http from "../helpers/http-common";

const loginWithEmailAndPassword = (email, password) => {
    var data = {
        email,
        password
    };

    return http.post("/auth/signin", data);
};

const createUserWithEmailAndPassword = (email, password) => {
    var data = {
        email,
        password
    };

    return http.post("/auth/signup", data);
};

const signOut = () => {
    return http.post("/auth/signout", {});
};

export default {
    loginWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
};