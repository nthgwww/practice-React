// import axios from "axios"
import axios from "./customize-axios";

const featchAllUser = (page) =>{
    return axios.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name, job})
}

export { featchAllUser, postCreateUser }