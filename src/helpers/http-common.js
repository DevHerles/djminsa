import axios from "axios";
import localStorage from '../services/localStorageService';

const token = localStorage.getItem('jwt_token');
export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
    "x-access-token": token,
  }
});
