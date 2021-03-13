import axios from "axios";
import localStorage from '../services/storage/local.storage.service';

const token = localStorage.getItem('jwt_token');
export default axios.create({
  baseURL: "http://192.168.0.17:4000/api",
  headers: {
    "Content-type": "application/json",
    "x-access-token": token,
  }
});
