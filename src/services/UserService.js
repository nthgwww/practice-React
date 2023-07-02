// import axios from "axios"
import axios from "./customize-axios";

const featchAllUser = (page) =>{
    return axios.get(`/api/users?page=${page}`);
}

export { featchAllUser }